"use client";

import { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";

interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  capacity: number;
  _count: { registrations: number };
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [registeringId, setRegisteringId] = useState<string | null>(null);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur inconnue");
      setEvents(data.events);
    } catch (err: any) {
      setError(err.message || "Impossible de charger les événements.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleRegister = async (eventId: string) => {
    setRegisteringId(eventId);
    setMessage("");
    setError("");
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "register", eventId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur inconnue");
      setMessage("Inscription confirmée avec succès !");
      fetchEvents();
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'inscription.");
    } finally {
      setRegisteringId(null);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-10 text-center">
        <h1 className="mb-3 text-4xl font-extrabold">
          Calendrier des <span className="text-space-cyan">Événements</span>
        </h1>
        <p className="mx-auto max-w-2xl text-gray-400">
          Ateliers, conférences et lancements — inscrivez-vous en un clic.
        </p>
      </div>

      {message && (
        <p className="mb-6 rounded-lg bg-green-500/10 p-4 text-center text-green-400">
          {message}
        </p>
      )}
      {error && (
        <p className="mb-6 rounded-lg bg-red-500/10 p-4 text-center text-red-400">
          {error}
        </p>
      )}

      {loading && (
        <p className="text-center text-gray-400">Chargement des événements...</p>
      )}

      {!loading && events.length === 0 && (
        <p className="text-center text-gray-400">
          Aucun événement programmé pour le moment.
        </p>
      )}

      <div className="flex flex-col gap-6">
        {events.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            title={event.title}
            date={event.date}
            location={event.location}
            description={event.description}
            capacity={event.capacity}
            registeredCount={event._count.registrations}
            onRegister={handleRegister}
            registering={registeringId === event.id}
          />
        ))}
      </div>
    </div>
  );
}