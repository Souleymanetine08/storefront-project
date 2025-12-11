"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Heart, Search, Menu, X, User } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useFavorites } from "@/lib/favorites-context"
import { SearchModal } from "@/components/search-modal"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()
  const { totalItems, setIsCartOpen } = useCart()
  const { favorites } = useFavorites()

  const navItems = [
    { label: "Nouveautés", href: "/new" },
    { label: "Homme", href: "/men" },
    { label: "Femme", href: "/women" },
    { label: "Enfants", href: "/kids" },
  ]

  return (
    <>
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/">
                <img src="/acme-logo.png" alt="BANANA SPORTSWEAR" className="h-8 w-auto" />
              </Link>
              <nav className="hidden lg:flex items-center gap-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-colors ${
                      pathname === item.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden md:flex items-center bg-muted rounded-full px-4 py-2 hover:bg-muted/80 transition-colors"
              >
                <Search className="w-4 h-4 text-muted-foreground mr-2" />
                <span className="text-sm text-muted-foreground">Rechercher</span>
              </button>
              <Button variant="ghost" size="icon" className="rounded-full hidden sm:flex">
                <User className="w-5 h-5" />
              </Button>
              <Link href="/favorites" className="p-2 hover:bg-muted rounded-full transition-colors relative">
                <Heart className="w-5 h-5" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 hover:bg-muted rounded-full transition-colors relative"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-foreground text-background text-[10px] rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              </button>
              <button
                className="lg:hidden p-2 hover:bg-muted rounded-full transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-border">
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      pathname === item.href
                        ? "text-foreground bg-muted"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
