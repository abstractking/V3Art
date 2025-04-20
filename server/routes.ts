import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertArtworkSubmissionSchema, insertNftSubmissionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  const apiRouter = app.route("/api");

  app.get("/api/users", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const users = await storage.getUsers(limit); // Assuming `getUsers` is implemented in `storage`
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });
  
  // Get all artists
  app.get("/api/artists", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const artists = await storage.getArtists(limit);
      res.json(artists);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch artists" });
    }
  });
  
  // Get artist by ID
  app.get("/api/artists/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const artist = await storage.getArtist(id);
      
      if (!artist) {
        return res.status(404).json({ message: "Artist not found" });
      }
      
      res.json(artist);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch artist" });
    }
  });
  
  // Get artworks by artist ID
  app.get("/api/artists/:id/artworks", async (req, res) => {
    try {
      const artistId = parseInt(req.params.id);
      const artworks = await storage.getArtworksByArtistId(artistId);
      res.json(artworks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch artist's artworks" });
    }
  });
  
  // Get all artworks
  app.get("/api/artworks", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const artworks = await storage.getArtworks(limit);
      res.json(artworks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch artworks" });
    }
  });
  
  // Get artwork by ID
  app.get("/api/artworks/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const artwork = await storage.getArtwork(id);
      
      if (!artwork) {
        return res.status(404).json({ message: "Artwork not found" });
      }
      
      res.json(artwork);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch artwork" });
    }
  });
  
  // Submit artwork (legacy endpoint for artists submissions)
  app.post("/api/submit", async (req, res) => {
    try {
      // Check if this is an NFT verification submission
      if (req.body.worldOfVLink !== undefined) {
        // This is an NFT submission
        const nftSubmissionData = insertNftSubmissionSchema.parse(req.body);
        
        // Store the NFT submission
        const submission = await storage.submitNft(nftSubmissionData);
        
        return res.status(201).json({
          message: "NFT verification request received successfully",
          submissionId: submission.id
        });
      }
      
      // Otherwise treat as a regular artwork submission
      const submissionData = insertArtworkSubmissionSchema.parse(req.body);
      
      // Store the submission
      const submission = await storage.submitArtwork(submissionData);
      
      res.status(201).json({
        message: "Artwork submission received successfully",
        submissionId: submission.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid submission data", 
          errors: error.errors 
        });
      }
      
      res.status(500).json({ message: "Failed to process submission" });
    }
  });
  
  // Admin routes for managing submissions
  app.get("/api/admin/submissions", async (req, res) => {
    try {
      const submissions = await storage.getAllSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch submissions" });
    }
  });
  
  app.put("/api/admin/submissions/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (!status || !["approved", "rejected", "pending"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      
      const updatedSubmission = await storage.updateSubmissionStatus(id, status);
      res.json(updatedSubmission);
    } catch (error) {
      res.status(500).json({ message: "Failed to update submission status" });
    }
  });
  
  // Admin routes for managing NFT verification submissions
  app.get("/api/admin/nft-submissions", async (req, res) => {
    try {
      const submissions = await storage.getAllNftSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch NFT submissions" });
    }
  });
  
  app.put("/api/admin/nft-submissions/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (!status || !["approved", "rejected", "pending"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      
      const updatedSubmission = await storage.updateNftSubmissionStatus(id, status);
      res.json(updatedSubmission);
    } catch (error) {
      res.status(500).json({ message: "Failed to update NFT submission status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
