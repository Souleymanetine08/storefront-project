"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductGrid } from "@/components/product-grid"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal, ChevronDown } from "lucide-react"
import type { Product } from "@/lib/products"
import { CartDrawer } from "@/components/cart-drawer"

interface CategoryPageProps {
  title: string
  description: string
  products: Product[]
}

export function CategoryPage({ title, description, products }: CategoryPageProps) {
  const [sortBy, setSortBy] = useState("featured")

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-low") {
      return Number.parseInt(a.price.replace("$", "")) - Number.parseInt(b.price.replace("$", ""))
    }
    if (sortBy === "price-high") {
      return Number.parseInt(b.price.replace("$", "")) - Number.parseInt(a.price.replace("$", ""))
    }
    if (sortBy === "newest") {
      return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
    }
    return 0
  })

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <CartDrawer />

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-border">
          <p className="text-sm text-muted-foreground">
            {products.length} {products.length === 1 ? "produit" : "produits"}
          </p>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="gap-2 rounded-full bg-transparent">
              <SlidersHorizontal className="w-4 h-4" />
              Filtres
            </Button>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-transparent border border-border rounded-full px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
              >
                <option value="featured">En vedette</option>
                <option value="newest">Plus récents</option>
                <option value="price-low">Prix : croissant</option>
                <option value="price-high">Prix : décroissant</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
            </div>
          </div>
        </div>

        <ProductGrid products={sortedProducts} />

        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Aucun produit trouvé dans cette catégorie.</p>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
