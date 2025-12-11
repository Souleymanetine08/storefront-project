import { CategoryPage } from "@/components/category-page"
import { getWomenProducts } from "@/lib/products"

export const metadata = {
  title: "Collection Femme | Banana Sportswear",
  description: "Découvrez notre collection de vêtements, activewear et accessoires pour femme.",
}

export default function WomenPage() {
  const products = getWomenProducts()

  return (
    <CategoryPage
      title="Collection Femme"
      description="Vêtements de sport et pièces lifestyle conçus pour les femmes."
      products={products}
    />
  )
}
