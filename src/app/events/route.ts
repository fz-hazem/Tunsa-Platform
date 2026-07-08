import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

// GET /api/events -> liste des événements avec nombre d'inscrits
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: "asc" },
      include: {
        _count: { select: { registrations: true } },
      },
    });

    return NextResponse.json({ events });
  } catch (error) {
    console.error("[EVENTS_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Impossible de récupérer les événements." },
      { status: 500 }
    );
  }
}

// POST /api/events
// body: { action: "create", title, date, location, description, capacity } -> ADMIN uniquement
// body: { action: "register", eventId } -> utilisateur connecté
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === "create") {
      const user = getCurrentUser();
      if (!user || user.role !== "ADMIN") {
        return NextResponse.json(
          { error: "Accès refusé. Réservé aux administrateurs." },
          { status: 403 }
        );
      }

      const { title, date, location, description, capacity } = body;
      if (!title || !date || !location || !description) {
        return NextResponse.json(
          { error: "Tous les champs de l'événement sont requis." },
          { status: 400 }
        );
      }

      const event = await prisma.event.create({
        data: {
          title,
          date: new Date(date),
          location,
          description,
          capacity: capacity ? Number(capacity) : 50,
        },
      });

      return NextResponse.json({ message: "Événement créé.", event }, { status: 201 });
    }

    if (action === "register") {
      const user = getCurrentUser();
      if (!user) {
        return NextResponse.json(
          { error: "Vous devez être connecté pour vous inscrire." },
          { status: 401 }
        );
      }

      const { eventId } = body;
      if (!eventId) {
        return NextResponse.json({ error: "eventId requis." }, { status: 400 });
      }

      const event = await prisma.event.findUnique({
        where: { id: eventId },
        include: { _count: { select: { registrations: true } } },
      });

      if (!event) {
        return NextResponse.json({ error: "Événement introuvable." }, { status: 404 });
      }

      if (event._count.registrations >= event.capacity) {
        return NextResponse.json(
          { error: "Cet événement a atteint sa capacité maximale." },
          { status: 409 }
        );
      }

      const existing = await prisma.registration.findUnique({
        where: { userId_eventId: { userId: user.id, eventId } },
      });

      if (existing) {
        return NextResponse.json(
          { error: "Vous êtes déjà inscrit à cet événement." },
          { status: 409 }
        );
      }

      const registration = await prisma.registration.create({
        data: { userId: user.id, eventId },
      });

      return NextResponse.json(
        { message: "Inscription confirmée.", registration },
        { status: 201 }
      );
    }

    return NextResponse.json({ error: "Action invalide." }, { status: 400 });
  } catch (error) {
    console.error("[EVENTS_POST_ERROR]", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur." },
      { status: 500 }
    );
  }
}