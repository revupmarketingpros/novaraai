import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  html: text("html"),
  css: text("css"),
  javascript: text("javascript"),
  framework: text("framework").default("html"),
  isPublished: boolean("is_published").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  settings: jsonb("settings"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertProjectSchema = createInsertSchema(projects).pick({
  userId: true,
  name: true,
  description: true,
  html: true,
  css: true,
  javascript: true,
  framework: true,
  isPublished: true,
  settings: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export const websiteGeneratorSchema = z.object({
  description: z.string().min(10, "Please provide a more detailed description"),
  framework: z.enum(["React", "Vue", "HTML/CSS/JS", "Next.js"]).default("React"),
  websiteType: z.enum(["E-commerce", "Portfolio", "Blog", "Business", "Landing Page"]).default("Business"),
  includeDatabase: z.boolean().default(false),
  seoOptimization: z.boolean().default(true),
});

export type WebsiteGeneratorInput = z.infer<typeof websiteGeneratorSchema>;

export const codeAssistanceSchema = z.object({
  code: z.string().min(1),
  question: z.string().min(1),
});

export type CodeAssistanceInput = z.infer<typeof codeAssistanceSchema>;
