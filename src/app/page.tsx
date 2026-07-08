import Link from "next/link";

const news = [
  {
    title: "Lancement réussi du ballon stratosphérique TUNSA-B2",
    date: "Juin 2026",
    excerpt:
      "Notre équipe a atteint une altitude de 32 km, collectant des données atmosphériques précieuses pour la recherche universitaire.",
  },
  {
    title: "Sélection au programme international de CubeSats",
    date: "Mai 2026",
    excerpt:
      "Le projet TUNSAT-1 a été retenu parmi les finalistes d'un concours régional dédié aux nanosatellites universitaires.",
  },
  {
    title: "Atelier de formation en systèmes embarqués",
    date: "Avril 2026",
    excerpt:
      "Plus de 60 étudiants ont participé à notre bootcamp intensif sur l'électronique embarquée et les communications satellites.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden px-6 pb-24 pt-20 md:pt-32">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute left-1/4 top-10 h-2 w-2 rounded-full bg-white" />
          <div className="absolute left-2/3 top-32 h-1 w-1 rounded-full bg-white" />
          <div className="absolute left-1/2 top-64 h-1.5 w-1.5 rounded-full bg-space-cyan" />
          <div className="absolute left-10 top-96 h-1 w-1 rounded-full bg-white" />
          <div className="absolute right-20 top-52 h-2 w-2 rounded-full bg-space-cyan" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="mb-6 inline-block rounded-full border border-space-cyan/40 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-space-cyan">
            Association Tunisienne de l&apos;Espace
          </span>
          <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-6xl">
            Propulsons la Tunisie
            <br />
            vers <span className="text-space-cyan">l&apos;espace</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-300">
            TUNSA rassemble étudiants, ingénieurs et passionnés autour de
            projets spatiaux concrets : CubeSats, ballons stratosphériques et
            programmes de formation en ingénierie aérospatiale.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/projects"
              className="rounded-full bg-space-cyan px-8 py-3 font-semibold text-space-navy transition-transform hover:scale-105"
            >
              Découvrir nos projets
            </Link>
            <Link
              href="/events"
              className="rounded-full border border-space-cyan/40 px-8 py-3 font-semibold text-white transition-colors hover:bg-space-cyan/10"
            >
              Voir les événements
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { value: "12+", label: "Projets actifs" },
            { value: "300+", label: "Membres" },
            { value: "8", label: "Universités partenaires" },
            { value: "5", label: "Lancements réussis" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-space-cyan/20 bg-space-navy-light p-6 text-center"
            >
              <p className="text-3xl font-extrabold text-space-cyan">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ACTUALITÉS */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="text-3xl font-bold">Actualités</h2>
          <span className="text-sm text-space-cyan">Dernières nouvelles</span>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {news.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-space-cyan/20 bg-space-navy-light p-6"
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-space-gold">
                {item.date}
              </p>
              <h3 className="mb-3 text-lg font-bold text-white">
                {item.title}
              </h3>
              <p className="text-sm text-gray-400">{item.excerpt}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section
        id="join"
        className="mx-auto mb-20 max-w-5xl rounded-3xl border border-space-cyan/30 bg-gradient-to-br from-space-navy-light to-space-navy px-8 py-16 text-center"
      >
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Envie de rejoindre l&apos;aventure spatiale ?
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-gray-300">
          Que vous soyez étudiant, ingénieur ou simplement passionné, il y a
          une place pour vous dans nos équipes de projets.
        </p>
        <Link
          href="/projects"
          className="inline-block rounded-full bg-space-cyan px-8 py-3 font-semibold text-space-navy transition-transform hover:scale-105"
        >
          Rejoindre TUNSA
        </Link>
      </section>
    </div>
  );
}