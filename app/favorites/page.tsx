"use client"

import { useFavorites } from "@/lib/favorites-context"
import { useCart } from "@/lib/cart-context"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CartDrawer } from "@/components/cart-drawer"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingBag, X } from "lucide-react"
import Link from "next/link"

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites()
  const { addItem } = useCart()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <CartDrawer />

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Vos Favoris</h1>
          <p className="text-muted-foreground">
            {favorites.length} {favorites.length === 1 ? "article sauvegardé" : "articles sauvegardés"}
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Pas encore de favoris</h2>
            <p className="text-muted-foreground mb-8">
              Commencez à ajouter des articles que vous aimez à votre liste de favoris
            </p>
            <Link href="/new">
              <Button className="rounded-full">Parcourir les Produits</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <div key={product.id} className="group">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-muted">
                  {product.badge && (
                    <span className="absolute top-3 left-3 z-10 bg-foreground text-background text-[10px] font-semibold px-2 py-1 rounded-full">
                      {product.badge === "NEW" ? "NOUVEAU" : product.badge === "TRENDING" ? "TENDANCE" : product.badge}
                    </span>
                  )}
                  <button
                    onClick={() => removeFavorite(product.id)}
                    className="absolute top-3 right-3 z-10 w-8 h-8 bg-background rounded-full flex items-center justify-center shadow-md hover:bg-muted transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <Link href={`/product/${product.id}`}>
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                </div>
                <Link href={`/product/${product.id}`}>
                  <h3 className="font-medium text-foreground group-hover:text-foreground/80 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">{product.category}</p>
                </Link>
                <div className="flex items-center justify-between mt-2">
                  <p className="font-semibold text-foreground">{product.price.replace("$", "")} €</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full bg-transparent gap-1"
                    onClick={() => addItem(product, "M")}
                  >
                    <ShoppingBag className="w-3 h-3" />
                    Ajouter
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
