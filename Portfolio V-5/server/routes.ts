import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

// Define contact message interface
interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body as ContactMessage;
      
      // Simple validation
      if (!name || !email || !message) {
        return res.status(400).json({ message: "All fields are required" });
      }
      
      // Basic email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }
      
      // In a real application, you would store this in a database
      // or send an email notification
      console.log("Contact form submission:", { name, email, message });
      
      // Return success response
      return res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
      console.error("Error in contact form:", error);
      return res.status(500).json({ message: "Server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
