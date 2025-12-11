import { 
  type User, type InsertUser,
  type Post, type InsertPost,
  type Media, type InsertMedia,
  type Option, type InsertOption,
  users, posts, media, options
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getPosts(type?: string): Promise<Post[]>;
  getPost(id: number): Promise<Post | undefined>;
  getPostBySlug(slug: string): Promise<Post | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: number, post: Partial<InsertPost>): Promise<Post | undefined>;
  deletePost(id: number): Promise<boolean>;
  
  getMedia(): Promise<Media[]>;
  getMediaItem(id: number): Promise<Media | undefined>;
  createMedia(item: InsertMedia): Promise<Media>;
  deleteMedia(id: number): Promise<boolean>;
  
  getOptions(): Promise<Option[]>;
  getOption(name: string): Promise<Option | undefined>;
  setOption(name: string, value: string): Promise<Option>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getPosts(type?: string): Promise<Post[]> {
    if (type) {
      return db.select().from(posts).where(eq(posts.type, type)).orderBy(desc(posts.createdAt));
    }
    return db.select().from(posts).orderBy(desc(posts.createdAt));
  }

  async getPost(id: number): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    return post;
  }

  async getPostBySlug(slug: string): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.slug, slug));
    return post;
  }

  async createPost(post: InsertPost): Promise<Post> {
    const [newPost] = await db.insert(posts).values(post).returning();
    return newPost;
  }

  async updatePost(id: number, post: Partial<InsertPost>): Promise<Post | undefined> {
    const [updated] = await db.update(posts)
      .set({ ...post, updatedAt: new Date() })
      .where(eq(posts.id, id))
      .returning();
    return updated;
  }

  async deletePost(id: number): Promise<boolean> {
    const result = await db.delete(posts).where(eq(posts.id, id));
    return true;
  }

  async getMedia(): Promise<Media[]> {
    return db.select().from(media).orderBy(desc(media.createdAt));
  }

  async getMediaItem(id: number): Promise<Media | undefined> {
    const [item] = await db.select().from(media).where(eq(media.id, id));
    return item;
  }

  async createMedia(item: InsertMedia): Promise<Media> {
    const [newItem] = await db.insert(media).values(item).returning();
    return newItem;
  }

  async deleteMedia(id: number): Promise<boolean> {
    await db.delete(media).where(eq(media.id, id));
    return true;
  }

  async getOptions(): Promise<Option[]> {
    return db.select().from(options);
  }

  async getOption(name: string): Promise<Option | undefined> {
    const [option] = await db.select().from(options).where(eq(options.name, name));
    return option;
  }

  async setOption(name: string, value: string): Promise<Option> {
    const existing = await this.getOption(name);
    if (existing) {
      const [updated] = await db.update(options)
        .set({ value })
        .where(eq(options.name, name))
        .returning();
      return updated;
    }
    const [newOption] = await db.insert(options).values({ name, value }).returning();
    return newOption;
  }
}

export const storage = new DatabaseStorage();
