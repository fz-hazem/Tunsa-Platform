interface ProjectCardProps {
  title: string;
  description: string;
  status: string;
  team: string[];
}

const statusColors: Record<string, string> = {
  IDEE: "bg-gray-500/20 text-gray-300",
  EN_COURS: "bg-space-cyan/20 text-space-cyan",
  TERMINE: "bg-green-500/20 text-green-400",
  SUSPENDU: "bg-red-500/20 text-red-400",
};

const statusLabels: Record<string, string> = {
  IDEE: "Idée",
  EN_COURS: "En cours",
  TERMINE: "Terminé",
  SUSPENDU: "Suspendu",
};

export default function ProjectCard({ title, description, status, team }: ProjectCardProps) {
  return (
    <div className="group rounded-2xl border border-space-cyan/20 bg-space-navy-light p-6 transition-all hover:-translate-y-1 hover:border-space-cyan/60 hover:shadow-lg hover:shadow-space-cyan/10">
      <div className="mb-3 flex items-center justify-between">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            statusColors[status] || statusColors.IDEE
          }`}
        >
          {statusLabels[status] || status}
        </span>
        <span className="text-xl">🛰️</span>
      </div>
      <h3 className="mb-2 text-lg font-bold text-white group-hover:text-space-cyan">
        {title}
      </h3>
      <p className="mb-4 text-sm text-gray-400 line-clamp-3">{description}</p>
      {team.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {team.map((member, i) => (
            <span
              key={i}
              className="rounded-md bg-space-navy px-2 py-1 text-xs text-gray-300"
            >
              {member}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}