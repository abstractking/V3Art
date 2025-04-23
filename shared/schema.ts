import { pgTable, text, serial, integer, doublePrecision, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  walletAddress: text("wallet_address"),
});

export const artists = pgTable("artists", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  biography: text("biography"),
  profileImage: text("profile_image"),
  coverImage: text("cover_image"),
  walletAddress: text("wallet_address").notNull(),
  userId: integer("user_id").references(() => users.id),
  artworkCount: integer("artwork_count").default(0),
  likesCount: integer("likes_count").default(0),
});

export const artworks = pgTable("artworks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
  price: doublePrecision("price"),
  tokenId: text("token_id"),
  artistId: integer("artist_id").notNull().references(() => artists.id),
  createdAt: timestamp("created_at").defaultNow(),
  isApproved: boolean("is_approved").default(false),
});

export const artworkSubmissions = pgTable("artwork_submissions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  price: doublePrecision("price"),
  artistName: text("artist_name").notNull(),
  artistEmail: text("artist_email").notNull(),
  walletAddress: text("wallet_address"),
  imageFileName: text("image_file_name"),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const nftSubmissions = pgTable("nft_submissions", {
  id: serial("id").primaryKey(),
  worldOfVLink: text("worldofv_link").notNull(),
  walletAddress: text("wallet_address").notNull(),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  walletAddress: true,
});

export const insertArtistSchema = createInsertSchema(artists).pick({
  name: true,
  biography: true,
  profileImage: true,
  coverImage: true,
  walletAddress: true,
  userId: true,
  artworkCount: true, // Added
  likesCount: true, // Added
});

export const insertArtworkSchema = createInsertSchema(artworks).pick({
  title: true,
  description: true, 
  imageUrl: true,
  category: true,
  price: true,
  tokenId: true,
  artistId: true,
  createdAt: true, // Added
  isApproved: true, // Added
});

export const insertArtworkSubmissionSchema = createInsertSchema(artworkSubmissions).pick({
  title: true,
  description: true,
  category: true,
  price: true,
  artistName: true,
  artistEmail: true,
  walletAddress: true,
  imageFileName: true,
});

export const insertNftSubmissionSchema = createInsertSchema(nftSubmissions).pick({
  worldOfVLink: true,
  walletAddress: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Artist = typeof artists.$inferSelect;
export type InsertArtist = z.infer<typeof insertArtistSchema>;

export type Artwork = typeof artworks.$inferSelect;
export type InsertArtwork = z.infer<typeof insertArtworkSchema>;

export type ArtworkSubmission = typeof artworkSubmissions.$inferSelect;
export type InsertArtworkSubmission = z.infer<typeof insertArtworkSubmissionSchema>;

export type NftSubmission = typeof nftSubmissions.$inferSelect;

export interface InsertNftSubmission {
  walletAddress: string;
  worldOfVLink: string;
  tokenId?: string;
}

// Extended validation schemas
export const artworkSubmissionFormSchema = insertArtworkSubmissionSchema.extend({
  email: z.string().email("Please enter a valid email address"),
  terms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

export const nftSubmissionFormSchema = insertNftSubmissionSchema.extend({
  terms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

export type ArtworkSubmissionForm = z.infer<typeof artworkSubmissionFormSchema>;
export type NftSubmissionForm = z.infer<typeof nftSubmissionFormSchema>;
