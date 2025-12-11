"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Check, ArrowRight } from "lucide-react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
    }
  }

  return (
    <section className="py-20 bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-background/10 mb-6">
            <Mail className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Restez Informé</h2>
          <p className="text-background/70 mb-8">
            Inscrivez-vous pour un accès exclusif aux nouvelles collections, offres spéciales et promotions en
            avant-première.
          </p>

          {isSubscribed ? (
            <div className="flex items-center justify-center gap-2 text-lg">
              <Check className="w-6 h-6" />
              <span>Merci pour votre inscription !</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Entrez votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-background/10 border-background/20 text-background placeholder:text-background/50 rounded-full"
              />
              <Button type="submit" className="rounded-full bg-background text-foreground hover:bg-background/90 gap-2">
                S'inscrire
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
