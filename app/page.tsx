"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, ArrowRight, ShoppingBag, Truck, RotateCcw, Shield, Clock } from "lucide-react"
import { ImageWithLoading } from "@/components/image-with-loading"
import { SiteFooter } from "@/components/site-footer"
import { products as allProducts } from "@/lib/products"
import { NewsletterSection } from "@/components/newsletter-section"
import { ReviewsSection } from "@/components/reviews-section"
import { CartDrawer } from "@/components/cart-drawer"
import { useCart } from "@/lib/cart-context"
import { useFavorites } from "@/lib/favorites-context"
import { SiteHeader } from "@/components/site-header"

export default function HomePage() {
  const products = allProducts.slice(0, 8)
  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const { addItem } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()

  useEffect(() => {
    setIsPageLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <CartDrawer />

      {/* Promo Banner */}
      <div className="bg-foreground text-background py-2.5 text-center">
        <p className="text-sm font-medium">Livraison gratuite dès 100€ d'achat | Retours gratuits sous 30 jours</p>
      </div>

      {/* Hero Section */}
      <section className="relative bg-[#f5f5f5] dark:bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-120px)]">
            {/* Left Content */}
            <div
              className={`py-16 lg:py-0 transition-all duration-1000 ${
                isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              <div className="inline-flex items-center gap-2 bg-background border border-border rounded-full px-4 py-2 mb-8">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium">Nouvelle Collection 2025</span>
              </div>

              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground mb-6 text-balance leading-[1.1]">
                Le Sport, Votre Style
              </h1>

              <p className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-lg text-pretty">
                Découvrez notre collection de vêtements et accessoires sportswear. Qualité premium, design moderne.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/new">
                  <Button size="lg" className="gap-2 rounded-full px-8 h-14 text-base">
                    Découvrir la Collection
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/men">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 rounded-full px-8 h-14 text-base bg-transparent border-foreground/20 hover:bg-foreground/5"
                  >
                    Voir Homme
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right - Featured Product Image */}
            <div
              className={`relative transition-all duration-1000 delay-300 ${
                isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              {/* Best Seller Badge */}
              <div className="absolute top-4 right-4 z-20 bg-background rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">#1</span>
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-muted-foreground">Best Seller</p>
                  <p className="text-xs font-semibold">Cette Semaine</p>
                </div>
              </div>

              {/* Main Product Image */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#e5e5e5]">
                <img
                  src="/products/jordan-hoodie.jpeg"
                  alt="Jordan Fleece Hoodie"
                  className="w-full h-full object-cover object-top"
                />

                {/* Product Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-[10px] text-white/70 uppercase tracking-wider mb-1">En vedette</p>
                  <h3 className="text-xl font-semibold text-white mb-1">Jordan Fleece Hoodie</h3>
                  <p className="text-lg font-bold text-white">85 €</p>
                </div>
              </div>

              {/* Quick Add Widget */}
              <div className="absolute -left-4 lg:left-0 bottom-24 bg-background rounded-2xl shadow-xl p-4 border border-border">
                <div className="flex items-center gap-3">
                  <img
                    src="/products/jordan-hoodie.jpeg"
                    alt="Jordan Hoodie"
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div>
                    <p className="text-xs font-semibold">Ajout Rapide</p>
                    <p className="text-[10px] text-muted-foreground">Taille M en stock</p>
                    <Button
                      size="sm"
                      className="mt-2 h-7 text-xs rounded-full"
                      onClick={() => addItem(allProducts[3], "M")}
                    >
                      Ajouter au Panier
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Homme", href: "/men", image: "/products/nike-tech-set.jpeg" },
              { name: "Femme", href: "/women", image: "/nike-air-max-270-white-pink-women-shoes.jpg" },
              { name: "Enfants", href: "/kids", image: "/nike-air-force-1-kids-white-shoes.jpg" },
              { name: "Nouveautés", href: "/new", image: "/products/nike-vomero.jpeg" },
            ].map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden"
              >
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                  <span className="inline-flex items-center gap-1 text-sm text-white/80 group-hover:text-white transition-colors">
                    Découvrir <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="py-8 border-y border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: "Livraison Gratuite", desc: "Dès 100€ d'achat" },
              { icon: RotateCcw, title: "Retours Gratuits", desc: "Sous 30 jours" },
              { icon: Shield, title: "Paiement Sécurisé", desc: "100% sécurisé" },
              { icon: Clock, title: "Support 24/7", desc: "À votre écoute" },
            ].map((feature) => (
              <div key={feature.title} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center shrink-0">
                  <feature.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{feature.title}</h4>
                  <p className="text-xs text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Notre Collection</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Produits Populaires</h2>
            </div>
            <Link href="/new" className="text-sm font-medium text-foreground hover:underline flex items-center gap-1">
              Tout Voir <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="group">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-muted">
                  {product.badge && (
                    <span className="absolute top-3 left-3 z-10 bg-foreground text-background text-[10px] font-semibold px-2 py-1 rounded-full">
                      {product.badge === "NEW" ? "NOUVEAU" : product.badge === "TRENDING" ? "TENDANCE" : product.badge}
                    </span>
                  )}
                  <button
                    onClick={() => toggleFavorite(product)}
                    className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      isFavorite(product.id) ? "bg-red-500 text-white" : "bg-background/80 hover:bg-background"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite(product.id) ? "fill-current" : ""}`} />
                  </button>
                  <Link href={`/product/${product.id}`}>
                    <ImageWithLoading
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button className="w-full rounded-full gap-2" onClick={() => addItem(product, "M")}>
                      <ShoppingBag className="w-4 h-4" />
                      Ajouter au Panier
                    </Button>
                  </div>
                </div>
                <Link href={`/product/${product.id}`}>
                  <h3 className="font-medium text-foreground group-hover:text-foreground/80 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">{product.category}</p>
                </Link>
                <div className="flex items-center justify-between mt-1">
                  <p className="font-semibold text-foreground">{product.price.replace("$", "")} €</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="rounded-full h-8 w-8 p-0"
                    onClick={() => addItem(product, "M")}
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Showcase */}
      <section className="py-16 bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground mb-8">Nos Marques Partenaires</p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-60">
            {["NIKE", "JORDAN", "CONVERSE", "HURLEY"].map((brand) => (
              <span key={brand} className="text-2xl font-bold tracking-wider text-foreground">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <ReviewsSection />

      {/* Newsletter */}
      <NewsletterSection />

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}
