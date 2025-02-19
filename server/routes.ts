import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { mockProducts } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  app.get("/api/products", (_req, res) => {
    res.json(mockProducts);
  });

  const httpServer = createServer(app);
  return httpServer;
}
