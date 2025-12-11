"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { products } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { useFavorites } from "@/lib/favorites-context"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CartDrawer } from "@/components/cart-drawer"
import { Heart, ShoppingBag, ArrowLeft, Check, Truck, RotateCcw, Shield } from "lucide-react"
import Link from "next/link"

const sizes = ["XS", "S", "M", "L", "XL", "XXL"]
const shoeSizes = ["38", "39", "40", "41", "42", "43", "44", "45"]

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const product = products.find((p) => p.id === params.id)
  const { addItem } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()
  const [selectedSize, setSelectedSize] = useState("")
  const [isAdded, setIsAdded] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
          <Link href="/">
            <Button>Retour à l'accueil</Button>
          </Link>
        </div>
      </div>
    )
  }

  const isShoe = product.category.toLowerCase().includes("shoe") || product.category.toLowerCase().includes("chaussure")
  const availableSizes = isShoe ? shoeSizes : sizes

  const handleAddToCart = () => {
    if (!selectedSize) return
    addItem(product, selectedSize)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <CartDrawer />

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative aspect-square bg-muted rounded-3xl overflow-hidden">
            {product.badge && (
              <span className="absolute top-6 left-6 z-10 bg-foreground text-background text-sm font-semibold px-3 py-1 rounded-full">
                {product.badge === "NEW" ? "NOUVEAU" : product.badge === "TRENDING" ? "TENDANCE" : product.badge}
              </span>
            )}
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{product.name}</h1>
            <p className="text-2xl font-semibold text-foreground mb-6">{product.price.replace("$", "")} €</p>
            <p className="text-muted-foreground mb-8">{product.description}</p>

            {/* Size Selector */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium text-foreground">Sélectionner la Taille</span>
                <button className="text-sm text-muted-foreground hover:text-foreground underline">
                  Guide des Tailles
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-xl border text-sm font-medium transition-all ${
                      selectedSize === size
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <Button
                size="lg"
                className="flex-1 rounded-full gap-2"
                onClick={handleAddToCart}
                disabled={!selectedSize}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5" />
                    Ajouté au Panier
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    Ajouter au Panier
                  </>
                )}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={`rounded-full bg-transparent ${isFavorite(product.id) ? "text-red-500 border-red-500" : ""}`}
                onClick={() => toggleFavorite(product)}
              >
                <Heart className={`w-5 h-5 ${isFavorite(product.id) ? "fill-current" : ""}`} />
              </Button>
            </div>

            {/* Features */}
            <div className="space-y-4 pt-8 border-t border-border">
              {[
                { icon: Truck, text: "Livraison gratuite à partir de 100 €" },
                { icon: RotateCcw, text: "Retours gratuits sous 30 jours" },
                { icon: Shield, text: "Garantie 2 ans incluse" },
              ].map((feature) => (
                <div key={feature.text} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <feature.icon className="w-5 h-5" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
