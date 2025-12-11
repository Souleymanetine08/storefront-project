"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import Link from "next/link"
import { products, type Product } from "@/lib/products"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])

  useEffect(() => {
    if (query.length > 1) {
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()),
      )
      setResults(filtered)
    } else {
      setResults([])
    }
  }, [query])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      <div className="fixed top-0 left-0 right-0 bg-background z-50 shadow-xl">
        <div className="max-w-3xl mx-auto p-6">
          <div className="flex items-center gap-4 mb-6">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher des produits..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-lg outline-none placeholder-muted-foreground"
              autoFocus
            />
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {results.length > 0 && (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  onClick={onClose}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted transition-colors"
                >
                  <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  <span className="font-semibold">{product.price.replace("$", "")} €</span>
                </Link>
              ))}
            </div>
          )}

          {query.length > 1 && results.length === 0 && (
            <p className="text-center text-muted-foreground py-8">Aucun produit trouvé pour "{query}"</p>
          )}

          {query.length <= 1 && (
            <div className="py-4">
              <p className="text-sm text-muted-foreground mb-4">Recherches Populaires</p>
              <div className="flex flex-wrap gap-2">
                {["Chaussures", "Hoodie", "Air Max", "Leggings", "Enfants"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-4 py-2 bg-muted rounded-full text-sm hover:bg-muted/80 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
