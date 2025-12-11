import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull().default(""),
  excerpt: text("excerpt").default(""),
  status: text("status").notNull().default("draft"),
  type: text("type").notNull().default("post"),
  author: text("author").default("admin"),
  featuredImage: text("featured_image"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  filename: text("filename").notNull(),
  url: text("url").notNull(),
  mimeType: text("mime_type").notNull(),
  altText: text("alt_text").default(""),
  createdAt: timestamp("created_at").defaultNow(),
});

export const options = pgTable("options", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  value: text("value").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPostSchema = createInsertSchema(posts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updatePostSchema = insertPostSchema.partial();

export const insertMediaSchema = createInsertSchema(media).omit({
  id: true,
  createdAt: true,
});

export const insertOptionSchema = createInsertSchema(options).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertPost = z.infer<typeof insertPostSchema>;
export type Post = typeof posts.$inferSelect;
export type InsertMedia = z.infer<typeof insertMediaSchema>;
export type Media = typeof media.$inferSelect;
export type InsertOption = z.infer<typeof insertOptionSchema>;
export type Option = typeof options.$inferSelect;
