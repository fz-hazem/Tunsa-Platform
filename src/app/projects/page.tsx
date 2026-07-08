"use client";

import { useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  team: string[];
}

const filters = [
  { value: "", label: "Tous" },
  { value: "IDEE", label: "Idée" },
  { value: "EN_COURS", label: "En cours" },
  { value: "TERMINE", label: "Terminé" },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError("");
      try {
        const url = activeFilter
          ? `/api/projects?status=${activeFilter}`
          : "/api/projects";
        const res = await fetch(url);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Erreur inconnue");
        setProjects(data.projects);
      } catch (err: any) {
        setError(err.message || "Impossible de charger les projets.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [activeFilter]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 text-center">
        <h1 className="mb-3 text-4xl font-extrabold">
          Nos Projets <span className="text-space-cyan">Spatiaux</span>
        </h1>
        <p className="mx-auto max-w-2xl text-gray-400">
          CubeSats, ballons stratosphériques et systèmes embarqués développés
          par les équipes TUNSA.
        </p>
      </div>

      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              activeFilter === f.value
                ? "bg-space-cyan text-space-navy"
                : "border border-space-cyan/30 text-gray-300 hover:bg-space-cyan/10"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading && (
        <p className="text-center text-gray-400">Chargement des projets...</p>
      )}

      {error && (
        <p className="rounded-lg bg-red-500/10 p-4 text-center text-red-400">
          {error}
        </p>
      )}

      {!loading && !error && projects.length === 0 && (
        <p className="text-center text-gray-400">
          Aucun projet trouvé pour ce filtre.
        </p>
      )}

      {!loading && !error && projects.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              status={project.status}
              team={project.team}
            />
          ))}
        </div>
      )}
    </div>
  );
}