export interface Product {
  id: string
  name: string
  price: string
  category: string
  image: string
  description: string
  badge?: string
  gender?: "men" | "women" | "kids" | "unisex"
  isNew?: boolean
}

export const products: Product[] = [
  {
    id: "1",
    name: "Nike ZoomX Vomero Plus",
    price: "$180",
    category: "RUNNING SHOES",
    image: "/products/nike-vomero.jpeg",
    description: "Premium running shoes with ZoomX foam technology",
    badge: "NEW",
    gender: "unisex",
    isNew: true,
  },
  {
    id: "2",
    name: "Nike Club Cap",
    price: "$25",
    category: "ACCESSORIES",
    image: "/products/nike-cap.jpeg",
    description: "Classic baseball cap with Nike logo",
    gender: "unisex",
    isNew: false,
  },
  {
    id: "3",
    name: "Nike Tech Woven Pants",
    price: "$120",
    category: "MEN'S PANTS",
    image: "/products/nike-tech-set.jpeg",
    description: "Camo tracksuit with modern tech fabric",
    badge: "TRENDING",
    gender: "men",
    isNew: true,
  },
  {
    id: "4",
    name: "Jordan Fleece Hoodie",
    price: "$85",
    category: "MEN'S HOODIE",
    image: "/products/jordan-hoodie.jpeg",
    description: "Premium hoodie with signature graphics",
    gender: "men",
    isNew: false,
  },
  {
    id: "5",
    name: "Nike Dri-FIT Sports Bra",
    price: "$55",
    category: "WOMEN'S TRAINING",
    image: "/pink-nike-sports-bra-women-training.jpg",
    description: "High-support sports bra for intense workouts",
    badge: "NEW",
    gender: "women",
    isNew: true,
  },
  {
    id: "6",
    name: "Nike Air Max 270 Women",
    price: "$150",
    category: "WOMEN'S LIFESTYLE",
    image: "/nike-air-max-270-white-pink-women-shoes.jpg",
    description: "Iconic Air Max with visible Air unit",
    gender: "women",
    isNew: false,
  },
  {
    id: "7",
    name: "Nike Pro Leggings",
    price: "$65",
    category: "WOMEN'S TRAINING",
    image: "/nike-pro-leggings-black-women-training.jpg",
    description: "Form-fitting leggings with Dri-FIT technology",
    badge: "TRENDING",
    gender: "women",
    isNew: true,
  },
  {
    id: "8",
    name: "Nike Kids Air Force 1",
    price: "$90",
    category: "KIDS' SHOES",
    image: "/nike-air-force-1-kids-white-shoes.jpg",
    description: "Classic AF1 style for young sneakerheads",
    badge: "NEW",
    gender: "kids",
    isNew: true,
  },
  {
    id: "9",
    name: "Nike Kids Hoodie",
    price: "$45",
    category: "KIDS' CLOTHING",
    image: "/nike-kids-hoodie-blue-casual.jpg",
    description: "Comfortable fleece hoodie for everyday wear",
    gender: "kids",
    isNew: false,
  },
  {
    id: "10",
    name: "Nike Kids Joggers",
    price: "$40",
    category: "KIDS' CLOTHING",
    image: "/nike-kids-joggers-grey-sporty.jpg",
    description: "Soft fleece joggers with elastic waistband",
    badge: "TRENDING",
    gender: "kids",
    isNew: true,
  },
  {
    id: "11",
    name: "Nike Running Tank",
    price: "$35",
    category: "MEN'S RUNNING",
    image: "/nike-running-tank-men-blue-athletic.jpg",
    description: "Lightweight breathable tank for runners",
    badge: "NEW",
    gender: "men",
    isNew: true,
  },
  {
    id: "12",
    name: "Nike Windrunner Jacket",
    price: "$110",
    category: "WOMEN'S OUTERWEAR",
    image: "/nike-windrunner-jacket-women-colorblock.jpg",
    description: "Classic windbreaker with modern styling",
    badge: "NEW",
    gender: "women",
    isNew: true,
  },
]

export const getNewProducts = () => products.filter((p) => p.isNew)
export const getMenProducts = () => products.filter((p) => p.gender === "men" || p.gender === "unisex")
export const getWomenProducts = () => products.filter((p) => p.gender === "women" || p.gender === "unisex")
export const getKidsProducts = () => products.filter((p) => p.gender === "kids")
