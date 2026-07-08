import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export interface TokenPayload {
  id: string;
  email: string;
  role: "ADMIN" | "MEMBER" | "VISITOR";
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export function getCurrentUser(): TokenPayload | null {
  const token = cookies().get("tunsa_token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

export function requireAdmin(): TokenPayload | null {
  const user = getCurrentUser();
  if (!user || user.role !== "ADMIN") return null;
  return user;
}