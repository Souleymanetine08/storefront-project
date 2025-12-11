import { CategoryPage } from "@/components/category-page"
import { getNewProducts } from "@/lib/products"

export const metadata = {
  title: "Nouveautés | Banana Sportswear",
  description: "Découvrez les dernières nouveautés en vêtements et équipements sportifs.",
}

export default function NewPage() {
  const products = getNewProducts()

  return (
    <CategoryPage
      title="Nouveautés"
      description="Découvrez les dernières tendances en vêtements et accessoires sportifs."
      products={products}
    />
  )
}
