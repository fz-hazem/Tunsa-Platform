export default function Footer() {
  return (
    <footer className="border-t border-space-cyan/20 bg-space-navy-light py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 md:grid-cols-3">
        <div>
          <h3 className="mb-2 text-lg font-bold text-white">TUNSA</h3>
          <p className="text-sm text-gray-400">
            Association Tunisienne de l&apos;Espace — Inspirer, former et
            propulser la prochaine génération d&apos;ingénieurs spatiaux
            tunisiens.
          </p>
        </div>
        <div>
          <h4 className="mb-2 font-semibold text-space-cyan">Liens rapides</h4>
          <ul className="space-y-1 text-sm text-gray-400">
            <li>Projets</li>
            <li>Événements</li>
            <li>Rejoindre l&apos;association</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2 font-semibold text-space-cyan">Contact</h4>
          <p className="text-sm text-gray-400">contact@tunsa.org.tn</p>
          <p className="text-sm text-gray-400">Tunis, Tunisie</p>
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} TUNSA — Tous droits réservés.
      </p>
    </footer>
  );
}