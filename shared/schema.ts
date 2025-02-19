import { pgTable, text, serial, integer, decimal, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price").notNull(),
  type: text("type").notNull(), // 'dns' or 'wireguard'
  features: text("features").array().notNull(),
});

export const insertUserSchema = createInsertSchema(users, {
  email: z.string().email("ایمیل نامعتبر است"),
  username: z.string().min(3, "نام کاربری باید حداقل 3 کاراکتر باشد"),
  password: z.string().min(6, "رمز عبور باید حداقل 6 کاراکتر باشد"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Product = typeof products.$inferSelect;

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Basic DNS",
    description: "Fast and reliable DNS service for personal use",
    price: "5.99",
    type: "dns",
    features: ["1 million queries/month", "Basic DDoS protection", "24/7 support"],
  },
  {
    id: 2,
    name: "Pro DNS",
    description: "Enterprise-grade DNS solution with advanced features",
    price: "19.99",
    type: "dns",
    features: [
      "10 million queries/month",
      "Advanced DDoS protection",
      "Premium support",
      "Custom DNS records",
    ],
  },
  {
    id: 3,
    name: "Basic WireGuard",
    description: "Secure VPN configuration for individuals",
    price: "9.99",
    type: "wireguard",
    features: ["1 device", "Basic encryption", "500GB bandwidth/month"],
  },
  {
    id: 4,
    name: "Pro WireGuard",
    description: "Advanced VPN setup for teams",
    price: "29.99",
    type: "wireguard",
    features: [
      "5 devices",
      "Military-grade encryption",
      "Unlimited bandwidth",
      "Custom DNS routing",
    ],
  },
];