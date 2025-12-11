"use client"

import { useState } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

const reviews = [
  {
    id: 1,
    name: "Sophie M.",
    rating: 5,
    text: "Qualité exceptionnelle ! Les vêtements sont confortables et le style est parfait. Je recommande vivement cette boutique.",
    product: "Nike Air Max 270",
    avatar: "/woman-portrait.png",
  },
  {
    id: 2,
    name: "Thomas L.",
    rating: 5,
    text: "Service client au top et livraison ultra rapide. Les produits correspondent parfaitement aux photos. J'ai déjà recommandé 3 fois !",
    product: "Jordan Fleece Hoodie",
    avatar: "/thoughtful-man-portrait.png",
  },
  {
    id: 3,
    name: "Emma K.",
    rating: 5,
    text: "J'adore la qualité des matériaux. Très confortable pour le sport comme pour le quotidien. Je suis devenue une cliente fidèle.",
    product: "Nike Pro Leggings",
    avatar: "/smiling-woman-portrait.png",
  },
]

export function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => setCurrentIndex((i) => (i + 1) % reviews.length)
  const prev = () => setCurrentIndex((i) => (i - 1 + reviews.length) % reviews.length)

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm text-muted-foreground mb-2">Avis Clients</p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Ce Que Disent Nos Clients</h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="bg-card border border-border rounded-3xl p-8 md:p-12">
            <Quote className="w-12 h-12 text-muted-foreground/20 mb-6" />

            <div className="flex items-center gap-1 mb-4">
              {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-foreground text-foreground" />
              ))}
            </div>

            <p className="text-xl md:text-2xl text-foreground mb-8 text-balance">"{reviews[currentIndex].text}"</p>

            <div className="flex items-center gap-4">
              <img
                src={reviews[currentIndex].avatar || "/placeholder.svg"}
                alt={reviews[currentIndex].name}
                className="w-12 h-12 rounded-full bg-muted"
              />
              <div>
                <p className="font-semibold text-foreground">{reviews[currentIndex].name}</p>
                <p className="text-sm text-muted-foreground">A acheté {reviews[currentIndex].product}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === currentIndex ? "bg-foreground" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
