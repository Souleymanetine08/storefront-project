import { CategoryPage } from "@/components/category-page"
import { getMenProducts } from "@/lib/products"

export const metadata = {
  title: "Collection Homme | Banana Sportswear",
  description: "Découvrez notre collection de vêtements, chaussures et accessoires pour homme.",
}

export default function MenPage() {
  const products = getMenProducts()

  return (
    <CategoryPage
      title="Collection Homme"
      description="Équipements de performance et vêtements décontractés pour tous les hommes."
      products={products}
    />
  )
}
