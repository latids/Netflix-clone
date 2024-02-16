import * as z from "zod";

export const loginSchema = z.object({
    email: z.string().email().min(1).max(128),
    password: z.string().min(8).max(128),
  });

export const registerSchema = z.object({
    email: z.string().email().min(1).max(128),
    name: z.string().min(3).max(32),
    password: z.string().min(8).max(128),
  });