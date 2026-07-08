import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

// GET /api/projects?status=EN_COURS
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const projects = await prisma.project.findMany({
      where: status ? { status: status as any } : undefined,
      orderBy: { createdAt: "desc" },
      include: {
        createdBy: { select: { id: true, name: true, email: true } },
      },
    });

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("[PROJECTS_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Impossible de récupérer les projets." },
      { status: 500 }
    );
  }
}

// POST /api/projects  (réservé ADMIN / MEMBER)
export async function POST(req: NextRequest) {
  try {
    const user = getCurrentUser();
    if (!user || (user.role !== "ADMIN" && user.role !== "MEMBER")) {
      return NextResponse.json(
        { error: "Accès refusé. Réservé aux membres et administrateurs." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { title, description, status, team, imageUrl } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Le titre et la description sont requis." },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        status: status || "IDEE",
        team: Array.isArray(team) ? team : [],
        imageUrl: imageUrl || null,
        createdById: user.id,
      },
    });

    return NextResponse.json({ message: "Projet créé avec succès.", project }, { status: 201 });
  } catch (error) {
    console.error("[PROJECTS_POST_ERROR]", error);
    return NextResponse.json(
      { error: "Impossible de créer le projet." },
      { status: 500 }
    );
  }
}