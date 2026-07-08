import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/auth";

// POST /api/auth  -> body: { mode: "register" | "login", email, password, name? }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mode, email, password, name } = body;

    if (!mode || !email || !password) {
      return NextResponse.json(
        { error: "Champs requis manquants (mode, email, password)." },
        { status: 400 }
      );
    }

    if (mode === "register") {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return NextResponse.json(
          { error: "Un utilisateur avec cet email existe déjà." },
          { status: 409 }
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: name || null,
          role: "VISITOR",
        },
      });

      const token = signToken({ id: user.id, email: user.email, role: user.role });

      const response = NextResponse.json({
        message: "Inscription réussie.",
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
      });

      response.cookies.set("tunsa_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      return response;
    }

    if (mode === "login") {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return NextResponse.json(
          { error: "Identifiants invalides." },
          { status: 401 }
        );
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return NextResponse.json(
          { error: "Identifiants invalides." },
          { status: 401 }
        );
      }

      const token = signToken({ id: user.id, email: user.email, role: user.role });

      const response = NextResponse.json({
        message: "Connexion réussie.",
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
      });

      response.cookies.set("tunsa_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      return response;
    }

    return NextResponse.json({ error: "Mode invalide." }, { status: 400 });
  } catch (error) {
    console.error("[AUTH_ERROR]", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur." },
      { status: 500 }
    );
  }
}

// DELETE /api/auth -> déconnexion
export async function DELETE() {
  const response = NextResponse.json({ message: "Déconnexion réussie." });
  response.cookies.set("tunsa_token", "", { maxAge: 0, path: "/" });
  return response;
}