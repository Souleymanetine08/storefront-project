"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { ShoppingBag, Heart, Search, Sparkles, Camera, Zap, ArrowRight, Menu, X } from "lucide-react"
import { ImageWithLoading } from "@/components/image-with-loading"

interface Product {
  id: string
  name: string
  price: string
  category: string
  image: string
  description: string
  badge?: string
}

const products: Product[] = [
  {
    id: "1",
    name: "Nike ZoomX Vomero Plus",
    price: "$180",
    category: "RUNNING SHOES",
    image: "/products/nike-vomero.jpeg",
    description: "Premium running shoes with ZoomX foam technology",
    badge: "NEW",
  },
  {
    id: "2",
    name: "Nike Club Cap",
    price: "$25",
    category: "ACCESSORIES",
    image: "/products/nike-cap.jpeg",
    description: "Classic baseball cap with Nike logo",
  },
  {
    id: "3",
    name: "Nike Tech Woven Pants",
    price: "$120",
    category: "MEN'S PANTS",
    image: "/products/nike-tech-set.jpeg",
    description: "Camo tracksuit with modern tech fabric",
    badge: "TRENDING",
  },
  {
    id: "4",
    name: "Jordan Fleece Hoodie",
    price: "$85",
    category: "MEN'S HOODIE",
    image: "/products/jordan-hoodie.jpeg",
    description: "Premium hoodie with signature graphics",
  },
]

const techInfoMessages = [
  {
    text: "Generating image for Nike ZoomX Vomero Plus",
    link: "https://www.bananasportswear.com/us/en/t/banana-zoomx-vomero-plus-react-running-shoe-8K5v6Z",
  },
  {
    text: "Generating image for Nike Club Cap",
    link: "https://www.bananasportswear.com/us/en/t/banana-club-cap-8K5v6Z",
  },
  {
    text: "Generating image for Nike Tech Woven Pants",
    link: "https://www.bananasportswear.com/us/en/t/banana-tech-woven-pants-8K5v6Z",
  },
  {
    text: "Generating image for Jordan Fleece Hoodie",
    link: "https://www.bananasportswear.com/us/en/t/banana-sportswear-fleece-hoodie-8K5v6Z",
  },
]

const SmoothProgressBar = ({ progress, isActive }: { progress: number; isActive: boolean }) => {
  const [displayProgress, setDisplayProgress] = useState(0)
  const animationRef = useRef<number>()
  const startTimeRef = useRef<number>()
  const startProgressRef = useRef<number>(0)

  useEffect(() => {
    if (!isActive) {
      setDisplayProgress(0)
      return
    }

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime
        startProgressRef.current = displayProgress
      }

      const elapsed = currentTime - startTimeRef.current
      const duration = 100

      if (elapsed < duration) {
        const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)
        const t = easeOutQuart(elapsed / duration)
        const newProgress = startProgressRef.current + (progress - startProgressRef.current) * t

        setDisplayProgress(newProgress)
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setDisplayProgress(progress)
        startTimeRef.current = undefined
      }
    }

    if (Math.abs(progress - displayProgress) > 0.01) {
      startTimeRef.current = undefined
      animationRef.current = requestAnimationFrame(animate)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [progress, displayProgress, isActive])

  return (
    <div className="w-full mb-3">
      <div className="relative">
        <Progress value={displayProgress} className="h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner" />
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-black via-gray-700 to-black rounded-full transition-all duration-75 ease-out shadow-lg"
          style={{
            width: `${displayProgress}%`,
            boxShadow: "0 0 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        />
      </div>
    </div>
  )
}

export default function BananaSportswearStorefront() {
  const [userPhoto, setUserPhoto] = useState<File | null>(null)
  const [isPersonalized, setIsPersonalized] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [personalizedImages, setPersonalizedImages] = useState<{ [key: string]: string }>({})
  const [generationProgress, setGenerationProgress] = useState(0)
  const [isDragOver, setIsDragOver] = useState(false)
  const [viewMode, setViewMode] = useState<"products" | "generated">("products")
  const [currentProductIndex, setCurrentProductIndex] = useState(0)
  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [showGallery, setShowGallery] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const handleImageLoad = (productId: string) => {
    setLoadedImages((prev) => new Set([...prev, productId]))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)

    const files = e.dataTransfer.files
    if (files.length > 0 && files[0].type.startsWith("image/")) {
      handlePhotoUpload(files[0])
    }
  }

  const handlePhotoUpload = (file: File) => {
    setUserPhoto(file)
    setIsPersonalized(false)
    setPersonalizedImages({})
    setViewMode("products")
    setTimeout(() => {
      generatePersonalizedImagesWithFile(file)
    }, 100)
  }

  const generatePersonalizedImagesWithFile = async (file: File) => {
    setIsGenerating(true)
    setGenerationProgress(0)
    setCurrentProductIndex(0)
    setShowGallery(false)
    setIsTransitioning(false)
    const newPersonalizedImages: { [key: string]: string } = {}

    try {
      for (let i = 0; i < products.length; i++) {
        const product = products[i]
        setCurrentProductIndex(i)

        console.log(`[v0] Starting generation for product: ${product.name} (ID: ${product.id})`)

        const baseProgress = (i / products.length) * 100
        const targetProgress = ((i + 1) / products.length) * 100

        const animateProgress = (startProgress: number, endProgress: number, duration: number) => {
          return new Promise<void>((resolve) => {
            const startTime = Date.now()
            const updateInterval = 8

            const updateProgress = () => {
              const elapsed = Date.now() - startTime
              const progress = Math.min(elapsed / duration, 1)

              const easeInOutCubic = (t: number) => {
                if (t < 0.5) {
                  return 4 * t * t * t
                } else {
                  return 1 - Math.pow(-2 * t + 2, 3) / 2
                }
              }

              const easedProgress = easeInOutCubic(progress)
              const currentProgress = startProgress + (endProgress - startProgress) * easedProgress
              setGenerationProgress(currentProgress)

              if (progress < 1) {
                setTimeout(() => requestAnimationFrame(updateProgress), updateInterval)
              } else {
                resolve()
              }
            }

            requestAnimationFrame(updateProgress)
          })
        }

        const progressPromise = animateProgress(baseProgress, targetProgress, 4000)

        try {
          const productImageResponse = await fetch(product.image)
          if (!productImageResponse.ok) {
            throw new Error(`Failed to fetch product image for ${product.name}`)
          }

          const productImageBlob = await productImageResponse.blob()
          const productImageFile = new File([productImageBlob], `${product.id}.jpg`, {
            type: productImageBlob.type,
          })

          const formData = new FormData()
          formData.append("userPhoto", file)
          formData.append("productImage", productImageFile)
          formData.append("productName", product.name)
          formData.append("productCategory", product.category)

          console.log(`[v0] Sending request for ${product.name}...`)

          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 60000)

          const response = await fetch("/api/generate-model-image", {
            method: "POST",
            body: formData,
            signal: controller.signal,
          })

          clearTimeout(timeoutId)

          if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Failed to generate image for ${product.name}: ${response.status} - ${errorText}`)
          }

          const data = await response.json()

          if (!data.imageUrl) {
            throw new Error(`No image URL returned for ${product.name}`)
          }

          newPersonalizedImages[product.id] = data.imageUrl
          console.log(`[v0] Successfully generated image for ${product.name}: ${data.imageUrl.substring(0, 50)}...`)
        } catch (productError) {
          console.error(`[v0] Error generating image for ${product.name}:`, productError)
          newPersonalizedImages[product.id] = product.image
        }

        await progressPromise
      }

      console.log("[v0] Final personalized images:", Object.keys(newPersonalizedImages))

      const generatedCount = Object.values(newPersonalizedImages).filter((url) => url.startsWith("data:")).length
      console.log(`[v0] Successfully generated ${generatedCount} out of ${products.length} images`)

      setPersonalizedImages(newPersonalizedImages)
      setIsPersonalized(generatedCount > 0)

      setTimeout(() => {
        setIsTransitioning(true)
        setTimeout(() => {
          setViewMode("generated")
          setTimeout(() => {
            setIsTransitioning(false)
            setTimeout(() => {
              setShowGallery(true)
            }, 300)
          }, 200)
        }, 200)
      }, 300)
    } catch (error) {
      console.error("[v0] Error in generatePersonalizedImagesWithFile:", error)
      alert(
        `Failed to generate personalized images: ${error instanceof Error ? error.message : "Unknown error"}. Please try again.`,
      )
    } finally {
      setIsGenerating(false)
      setGenerationProgress(0)
    }
  }

  const scrollToProducts = () => {
    document.getElementById("products-section")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div
      className={`min-h-screen bg-background text-foreground transition-all duration-1000 ${
        isPageLoaded ? "opacity-100" : "opacity-0"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div
        className={`fixed bottom-6 right-6 z-40 transition-all duration-700 ${
          isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
        style={{ transitionDelay: "800ms" }}
      >
        <div
          className={`border transition-all duration-300 rounded-2xl shadow-2xl ${
            isDragOver
              ? "border-foreground bg-background scale-105 shadow-xl"
              : "border-border bg-background/95 backdrop-blur-sm"
          } p-6 w-72`}
          onClick={() => !userPhoto && document.getElementById("user-photo")?.click()}
        >
          {!userPhoto ? (
            <div className="cursor-pointer">
              <Input
                type="file"
                accept="image/*"
                className="hidden"
                id="user-photo"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handlePhotoUpload(file)
                }}
              />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-foreground flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-background" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-tight">AI Try-On</h3>
                  <p className="text-xs text-muted-foreground">Virtual fitting room</p>
                </div>
              </div>
              <div className="border-2 border-dashed border-border rounded-xl p-4 text-center hover:border-foreground hover:bg-muted/50 transition-all">
                <Camera className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Drop your photo here</p>
              </div>
            </div>
          ) : isGenerating ? (
            <>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center animate-pulse">
                  <Zap className="w-5 h-5 text-background" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Generating...</h3>
                  <p className="text-xs text-muted-foreground">{Math.round(generationProgress)}% complete</p>
                </div>
              </div>
              <SmoothProgressBar progress={generationProgress} isActive={isGenerating} />
              <p className="text-xs text-muted-foreground text-center mt-2">
                {techInfoMessages[currentProductIndex]?.text || "Processing..."}
              </p>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Ready!</h3>
                  <p className="text-xs text-muted-foreground">4 looks generated</p>
                </div>
              </div>
              <Button
                onClick={() => {
                  const newMode = viewMode === "products" ? "generated" : "products"
                  setViewMode(newMode)
                  if (newMode === "generated") {
                    setTimeout(() => setShowGallery(true), 300)
                  } else {
                    setShowGallery(false)
                  }
                }}
                className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-xl h-10 text-sm font-medium"
              >
                {viewMode === "products" ? "View Your Looks" : "View Products"}
              </Button>
              <button
                onClick={() => document.getElementById("user-photo")?.click()}
                className="w-full text-xs text-muted-foreground mt-3 hover:text-foreground transition-colors"
              >
                Upload new photo
              </button>
            </>
          )}
        </div>
      </div>

      {isDragOver && (
        <div className="fixed inset-0 z-20 bg-foreground/5 border-4 border-dashed border-foreground/20 pointer-events-none" />
      )}

      <header
        className={`sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-700 ${
          isPageLoaded ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <img src="/acme-logo.png" alt="BANANA SPORTSWEAR" className="h-8 w-auto" />
              <nav className="hidden lg:flex items-center gap-8">
                {["New", "Men", "Women", "Kids"].map((item, index) => (
                  <a
                    key={item}
                    href="#"
                    className={`text-sm font-medium text-muted-foreground hover:text-foreground transition-colors ${
                      isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                    }`}
                    style={{ transitionDelay: `${200 + index * 50}ms`, transitionDuration: "500ms" }}
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center bg-muted rounded-full px-4 py-2">
                <Search className="w-4 h-4 text-muted-foreground mr-2" />
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-transparent text-sm outline-none placeholder-muted-foreground w-32"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex gap-2 rounded-full bg-transparent"
                onClick={() => document.getElementById("user-photo")?.click()}
              >
                <Sparkles className="w-4 h-4" />
                AI Try-On
              </Button>
              <button className="p-2 hover:bg-muted rounded-full transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-muted rounded-full transition-colors relative">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-foreground text-background text-[10px] rounded-full flex items-center justify-center">
                  0
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

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-border">
              <nav className="flex flex-col gap-2">
                {["New", "Men", "Women", "Kids"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-muted via-background to-muted">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className={`transition-all duration-1000 ${
                isPageLoaded ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <span className="inline-flex items-center gap-2 bg-foreground/10 text-foreground text-xs font-medium px-3 py-1 rounded-full mb-6">
                <Sparkles className="w-3 h-3" />
                AI-Powered Virtual Try-On
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 text-balance">
                See It On You Before You Buy
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg text-pretty">
                Upload your photo and instantly see how our products look on you. No guesswork, just confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="rounded-full px-8 gap-2"
                  onClick={() => document.getElementById("user-photo")?.click()}
                >
                  <Camera className="w-5 h-5" />
                  Try It Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 gap-2 bg-transparent"
                  onClick={scrollToProducts}
                >
                  Browse Collection
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div
              className={`relative transition-all duration-1000 ${
                isPageLoaded ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-muted">
                <img src="/products/jordan-hoodie.jpeg" alt="Featured product" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-xs text-muted-foreground mb-1">FEATURED</p>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Jordan Fleece Hoodie</h3>
                  <p className="text-2xl font-bold text-foreground">$85</p>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-background rounded-2xl shadow-xl p-4 border border-border">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">AI Generated</p>
                    <p className="text-sm font-semibold">4 Looks Ready</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Camera, title: "Upload Your Photo", desc: "Simply drop or upload any photo of yourself" },
              { icon: Zap, title: "Instant Generation", desc: "AI creates realistic try-on images in seconds" },
              { icon: Heart, title: "Shop with Confidence", desc: "See exactly how products look on you" },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className={`flex items-start gap-4 transition-all duration-700 ${
                  isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-foreground flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-background" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="products-section" className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div
            className={`flex items-end justify-between mb-12 transition-all duration-700 ${
              isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <div>
              <p className="text-sm text-muted-foreground mb-2">Curated for you</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Featured Products</h2>
            </div>
            <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`group cursor-pointer transition-all duration-700 ${
                  isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                } ${
                  isTransitioning
                    ? "opacity-80"
                    : viewMode === "generated" && showGallery
                      ? "animate-fade-in-up opacity-100"
                      : viewMode === "generated"
                        ? "opacity-0"
                        : "opacity-100"
                }`}
                style={{
                  transitionDelay:
                    viewMode === "generated" && showGallery ? `${index * 100}ms` : `${500 + index * 100}ms`,
                }}
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
                    src={
                      viewMode === "generated" && personalizedImages[product.id]
                        ? personalizedImages[product.id]
                        : product.image || "/placeholder.svg"
                    }
                    alt={
                      viewMode === "generated" && personalizedImages[product.id]
                        ? `You modeling ${product.name}`
                        : product.name
                    }
                    className={`w-full h-full object-cover transition-transform duration-500 ${
                      hoveredProduct === product.id ? "scale-110" : "scale-100"
                    } ${isTransitioning ? "opacity-90" : "opacity-100"}`}
                    onLoad={() => handleImageLoad(product.id)}
                  />
                  {/* Hover overlay */}
                  <div
                    className={`absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300`}
                  />
                  {/* Quick actions on hover */}
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
        </div>
      </section>

      <section className="bg-foreground text-background py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-balance">Ready to Try Before You Buy?</h2>
            <p className="text-background/70 mb-8 text-pretty">
              Join thousands of shoppers who use our AI try-on feature to find their perfect fit. It's free, fast, and
              fun.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 border-background text-background hover:bg-background hover:text-foreground bg-transparent"
              onClick={() => document.getElementById("user-photo")?.click()}
            >
              <Camera className="w-5 h-5 mr-2" />
              Upload Your Photo
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-muted border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <img src="/acme-logo.png" alt="BANANA SPORTSWEAR" className="h-8 w-auto mb-4" />
              <p className="text-sm text-muted-foreground max-w-xs">
                Premium sportswear with AI-powered virtual try-on technology.
              </p>
            </div>
            {[
              { title: "Shop", links: ["New Arrivals", "Men", "Women", "Kids", "Sale"] },
              { title: "Help", links: ["FAQ", "Shipping", "Returns", "Size Guide", "Contact"] },
              { title: "Company", links: ["About Us", "Careers", "Press", "Sustainability"] },
            ].map((section) => (
              <div key={section.title}>
                <h4 className="font-semibold text-foreground mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© 2025 Banana Sportswear, Inc. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
