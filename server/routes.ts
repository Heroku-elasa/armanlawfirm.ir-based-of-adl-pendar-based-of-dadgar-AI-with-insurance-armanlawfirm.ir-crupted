import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPostSchema, insertMediaSchema, updatePostSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Posts API
  app.get("/api/posts", async (req, res) => {
    const type = req.query.type as string | undefined;
    const posts = await storage.getPosts(type);
    res.json(posts);
  });

  app.get("/api/posts/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const post = await storage.getPost(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  });

  app.post("/api/posts", async (req, res) => {
    const result = insertPostSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors });
    }
    const post = await storage.createPost(result.data);
    res.status(201).json(post);
  });

  app.patch("/api/posts/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const existingPost = await storage.getPost(id);
    if (!existingPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    const validationResult = updatePostSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ error: validationResult.error.errors });
    }
    const updateData = { ...existingPost, ...validationResult.data };
    const post = await storage.updatePost(id, updateData);
    res.json(post);
  });

  app.delete("/api/posts/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await storage.deletePost(id);
    res.status(204).send();
  });

  // Media API
  app.get("/api/media", async (req, res) => {
    const mediaItems = await storage.getMedia();
    res.json(mediaItems);
  });

  app.post("/api/media", async (req, res) => {
    const result = insertMediaSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors });
    }
    const item = await storage.createMedia(result.data);
    res.status(201).json(item);
  });

  app.delete("/api/media/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await storage.deleteMedia(id);
    res.status(204).send();
  });

  // Options API
  app.get("/api/options", async (req, res) => {
    const opts = await storage.getOptions();
    res.json(opts);
  });

  app.post("/api/options", async (req, res) => {
    const { name, value } = req.body;
    if (!name || value === undefined) {
      return res.status(400).json({ error: "Name and value are required" });
    }
    const option = await storage.setOption(name, value);
    res.json(option);
  });

  // Export endpoint for migration
  app.get("/api/export", async (req, res) => {
    const [allPosts, allMedia, allOptions] = await Promise.all([
      storage.getPosts(),
      storage.getMedia(),
      storage.getOptions()
    ]);
    res.json({
      posts: allPosts,
      media: allMedia,
      options: allOptions,
      exportedAt: new Date().toISOString()
    });
  });

  // Import endpoint for migration
  app.post("/api/import", async (req, res) => {
    const { posts: importPosts, options: importOptions } = req.body;
    let postsImported = 0;
    let optionsImported = 0;

    const errors: string[] = [];
    const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    let slugCounter = 0;
    
    if (importPosts && Array.isArray(importPosts)) {
      for (const post of importPosts) {
        slugCounter++;
        const baseSlug = post.slug || (post.title ? slugify(post.title) : `imported-post-${slugCounter}`);
        const uniqueSlug = `${baseSlug}-${Date.now()}-${slugCounter}`;
        
        const postWithDefaults = {
          title: post.title || "Untitled",
          slug: uniqueSlug,
          content: post.content || "",
          excerpt: post.excerpt || null,
          status: post.status || "draft",
          type: post.type || "post",
          author: post.author || null,
          featuredImage: post.featuredImage || null,
        };
        const result = insertPostSchema.safeParse(postWithDefaults);
        if (result.success) {
          try {
            await storage.createPost(result.data);
            postsImported++;
          } catch (err) {
            errors.push(`Failed to import post "${post.title || 'unknown'}": Database error`);
          }
        } else {
          errors.push(`Failed to import post "${post.title || 'unknown'}": ${result.error.message}`);
        }
      }
    }

    if (importOptions && Array.isArray(importOptions)) {
      for (const opt of importOptions) {
        if (opt.name && opt.value !== undefined) {
          await storage.setOption(opt.name, opt.value);
          optionsImported++;
        }
      }
    }

    res.json({ postsImported, optionsImported, errors: errors.length > 0 ? errors : undefined });
  });

  // Dashboard stats
  app.get("/api/stats", async (req, res) => {
    const [allPosts, allMedia] = await Promise.all([
      storage.getPosts(),
      storage.getMedia()
    ]);
    
    const postsCount = allPosts.filter(p => p.type === "post").length;
    const pagesCount = allPosts.filter(p => p.type === "page").length;
    const publishedCount = allPosts.filter(p => p.status === "publish").length;
    const draftCount = allPosts.filter(p => p.status === "draft").length;

    res.json({
      posts: postsCount,
      pages: pagesCount,
      media: allMedia.length,
      published: publishedCount,
      drafts: draftCount
    });
  });

  return httpServer;
}
