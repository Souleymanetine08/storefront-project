import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <img src="/acme-logo.png" alt="BANANA SPORTSWEAR" className="h-8 w-auto mb-4" />
            <p className="text-sm text-muted-foreground">
              Votre destination pour le sportswear premium. Qualité, style et confort au quotidien.
            </p>
          </div>
          {[
            {
              title: "Boutique",
              links: [
                { label: "Nouveautés", href: "/new" },
                { label: "Homme", href: "/men" },
                { label: "Femme", href: "/women" },
                { label: "Enfants", href: "/kids" },
                { label: "Soldes", href: "#" },
              ],
            },
            {
              title: "Aide",
              links: [
                { label: "FAQ", href: "#" },
                { label: "Livraison", href: "#" },
                { label: "Retours", href: "#" },
                { label: "Guide des Tailles", href: "#" },
                { label: "Contact", href: "#" },
              ],
            },
            {
              title: "Entreprise",
              links: [
                { label: "À Propos", href: "#" },
                { label: "Carrières", href: "#" },
                { label: "Presse", href: "#" },
                { label: "Développement Durable", href: "#" },
              ],
            },
          ].map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-foreground mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2025 Banana Sportswear. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Politique de Confidentialité
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Conditions Générales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
