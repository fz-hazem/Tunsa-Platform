"use client";

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  capacity: number;
  registeredCount: number;
  onRegister: (id: string) => void;
  registering: boolean;
}

export default function EventCard({
  id,
  title,
  date,
  location,
  description,
  capacity,
  registeredCount,
  onRegister,
  registering,
}: EventCardProps) {
  const isFull = registeredCount >= capacity;
  const formattedDate = new Date(date).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-space-cyan/20 bg-space-navy-light p-6 md:flex-row md:items-center">
      <div className="flex-1">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-space-cyan">
          {formattedDate}
        </p>
        <h3 className="mb-1 text-lg font-bold text-white">{title}</h3>
        <p className="mb-2 text-sm text-gray-400">📍 {location}</p>
        <p className="text-sm text-gray-400">{description}</p>
        <p className="mt-2 text-xs text-gray-500">
          {registeredCount} / {capacity} places réservées
        </p>
      </div>
      <button
        disabled={isFull || registering}
        onClick={() => onRegister(id)}
        className="mt-4 shrink-0 rounded-full bg-space-cyan px-6 py-2 text-sm font-semibold text-space-navy transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-300 md:ml-6 md:mt-0"
      >
        {isFull ? "Complet" : registering ? "Inscription..." : "S'inscrire"}
      </button>
    </div>
  );
}