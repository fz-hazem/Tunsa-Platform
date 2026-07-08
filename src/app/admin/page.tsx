"use client";

import { useState } from "react";

type Tab = "project" | "event";

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("project");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    status: "IDEE",
    team: "",
  });

  const [eventForm, setEventForm] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    capacity: "50",
  });

  const resetMessages = () => {
    setMessage("");
    setError("");
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    setSubmitting(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: projectForm.title,
          description: projectForm.description,
          status: projectForm.status,
          team: projectForm.team
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur inconnue");
      setMessage("Projet ajouté avec succès.");
      setProjectForm({ title: "", description: "", status: "IDEE", team: "" });
    } catch (err: any) {
      setError(err.message || "Erreur lors de la création du projet.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    setSubmitting(true);
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          title: eventForm.title,
          date: eventForm.date,
          location: eventForm.location,
          description: eventForm.description,
          capacity: eventForm.capacity,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur inconnue");
      setMessage("Événement ajouté avec succès.");
      setEventForm({
        title: "",
        date: "",
        location: "",
        description: "",
        capacity: "50",
      });
    } catch (err: any) {
      setError(err.message || "Erreur lors de la création de l'événement.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-2 text-3xl font-extrabold">
        Dashboard <span className="text-space-cyan">Admin</span>
      </h1>
      <p className="mb-8 text-gray-400">
        Gérer les projets spatiaux et les événements de TUNSA.
      </p>

      <div className="mb-8 flex gap-3">
        <button
          onClick={() => setTab("project")}
          className={`rounded-full px-5 py-2 text-sm font-semibold ${
            tab === "project"
              ? "bg-space-cyan text-space-navy"
              : "border border-space-cyan/30 text-gray-300"
          }`}
        >
          Nouveau Projet
        </button>
        <button
          onClick={() => setTab("event")}
          className={`rounded-full px-5 py-2 text-sm font-semibold ${
            tab === "event"
              ? "bg-space-cyan text-space-navy"
              : "border border-space-cyan/30 text-gray-300"
          }`}
        >
          Nouvel Événement
        </button>
      </div>

      {message && (
        <p className="mb-6 rounded-lg bg-green-500/10 p-4 text-green-400">
          {message}
        </p>
      )}
      {error && (
        <p className="mb-6 rounded-lg bg-red-500/10 p-4 text-red-400">
          {error}
        </p>
      )}

      {tab === "project" && (
        <form
          onSubmit={handleProjectSubmit}
          className="flex flex-col gap-4 rounded-2xl border border-space-cyan/20 bg-space-navy-light p-6"
        >
          <div>
            <label className="mb-1 block text-sm text-gray-300">Titre</label>
            <input
              required
              value={projectForm.title}
              onChange={(e) =>
                setProjectForm({ ...projectForm, title: e.target.value })
              }
              className="w-full rounded-lg border border-space-cyan/20 bg-space-navy px-4 py-2 text-white outline-none focus:border-space-cyan"
              placeholder="Ex: CubeSat TUNSAT-2"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-300">
              Description
            </label>
            <textarea
              required
              rows={4}
              value={projectForm.description}
              onChange={(e) =>
                setProjectForm({ ...projectForm, description: e.target.value })
              }
              className="w-full rounded-lg border border-space-cyan/20 bg-space-navy px-4 py-2 text-white outline-none focus:border-space-cyan"
              placeholder="Description du projet..."
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-300">Statut</label>
            <select
              value={projectForm.status}
              onChange={(e) =>
                setProjectForm({ ...projectForm, status: e.target.value })
              }
              className="w-full rounded-lg border border-space-cyan/20 bg-space-navy px-4 py-2 text-white outline-none focus:border-space-cyan"
            >
              <option value="IDEE">Idée</option>
              <option value="EN_COURS">En cours</option>
              <option value="TERMINE">Terminé</option>
              <option value="SUSPENDU">Suspendu</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-300">
              Équipe (séparée par des virgules)
            </label>
            <input
              value={projectForm.team}
              onChange={(e) =>
                setProjectForm({ ...projectForm, team: e.target.value })
              }
              className="w-full rounded-lg border border-space-cyan/20 bg-space-navy px-4 py-2 text-white outline-none focus:border-space-cyan"
              placeholder="Ex: Ahmed, Sarra, Yassine"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="mt-2 rounded-full bg-space-cyan px-6 py-2 font-semibold text-space-navy hover:scale-105 disabled:opacity-50"
          >
            {submitting ? "Ajout en cours..." : "Ajouter le projet"}
          </button>
        </form>
      )}

      {tab === "event" && (
        <form
          onSubmit={handleEventSubmit}
          className="flex flex-col gap-4 rounded-2xl border border-space-cyan/20 bg-space-navy-light p-6"
        >
          <div>
            <label className="mb-1 block text-sm text-gray-300">Titre</label>
            <input
              required
              value={eventForm.title}
              onChange={(e) =>
                setEventForm({ ...eventForm, title: e.target.value })
              }
              className="w-full rounded-lg border border-space-cyan/20 bg-space-navy px-4 py-2 text-white outline-none focus:border-space-cyan"
              placeholder="Ex: Atelier CubeSat"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-300">
              Date et heure
            </label>
            <input
              required
              type="datetime-local"
              value={eventForm.date}
              onChange={(e) =>
                setEventForm({ ...eventForm, date: e.target.value })
              }
              className="w-full rounded-lg border border-space-cyan/20 bg-space-navy px-4 py-2 text-white outline-none focus:border-space-cyan"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-300">Lieu</label>
            <input
              required
              value={eventForm.location}
              onChange={(e) =>
                setEventForm({ ...eventForm, location: e.target.value })
              }
              className="w-full rounded-lg border border-space-cyan/20 bg-space-navy px-4 py-2 text-white outline-none focus:border-space-cyan"
              placeholder="Ex: ENIT, Tunis"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-300">
              Description
            </label>
            <textarea
              required
              rows={3}
              value={eventForm.description}
              onChange={(e) =>
                setEventForm({ ...eventForm, description: e.target.value })
              }
              className="w-full rounded-lg border border-space-cyan/20 bg-space-navy px-4 py-2 text-white outline-none focus:border-space-cyan"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-300">
              Capacité
            </label>
            <input
              type="number"
              min={1}
              value={eventForm.capacity}
              onChange={(e) =>
                setEventForm({ ...eventForm, capacity: e.target.value })
              }
              className="w-full rounded-lg border border-space-cyan/20 bg-space-navy px-4 py-2 text-white outline-none focus:border-space-cyan"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="mt-2 rounded-full bg-space-cyan px-6 py-2 font-semibold text-space-navy hover:scale-105 disabled:opacity-50"
          >
            {submitting ? "Ajout en cours..." : "Ajouter l'événement"}
          </button>
        </form>
      )}
    </div>
  );
}