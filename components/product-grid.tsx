"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { ImageWithLoading } from "@/components/image-with-loading"
import type { Product } from "@/lib/products"

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="group cursor-pointer"
          onMouseEnter={() => setHoveredProduct(product.id)}
          onMouseLeave={() => setHoveredProduct(null)}
        >
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-muted">
            {product.badge && (
              <span className="absolute top-3 left-3 z-10 bg-foreground text-background text-[10px] font-semibold px-2 py-1 rounded-full">
                {product.badge}
              </span>
            )}
            <ImageWithLoading
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-500 ${
                hoveredProduct === product.id ? "scale-110" : "scale-100"
              }`}
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
            <div
              className={`absolute bottom-3 left-3 right-3 flex gap-2 transition-all duration-300 ${
                hoveredProduct === product.id ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <Button
                size="sm"
                className="flex-1 rounded-full bg-background text-foreground hover:bg-background/90 shadow-lg"
              >
                Add to Cart
              </Button>
              <button className="w-9 h-9 rounded-full bg-background shadow-lg flex items-center justify-center hover:bg-muted transition-colors">
                <Heart className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <h3 className="font-medium text-foreground group-hover:text-foreground/80 transition-colors">
                {product.name}
              </h3>
              <p className="text-xs text-muted-foreground">{product.category}</p>
            </div>
            <p className="font-semibold text-foreground">{product.price}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
