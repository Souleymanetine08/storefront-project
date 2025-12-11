import { CategoryPage } from "@/components/category-page"
import { getKidsProducts } from "@/lib/products"

export const metadata = {
  title: "Collection Enfants | Banana Sportswear",
  description: "Découvrez notre collection de vêtements, chaussures et accessoires pour enfants.",
}

export default function KidsPage() {
  const products = getKidsProducts()

  return (
    <CategoryPage
      title="Collection Enfants"
      description="Vêtements de sport confortables et durables pour les enfants actifs."
      products={products}
    />
  )
}
