"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { addToFavorites, removeFromFavorites, isFavorite } from "@/lib/favorites-data"
import { Heart } from "lucide-react"

interface FavoritesButtonProps {
  curriculumId: string
  size?: "sm" | "default" | "lg"
}

export function FavoritesButton({ curriculumId, size = "default" }: FavoritesButtonProps) {
  const { user } = useAuth()
  const [isFav, setIsFav] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (user && user.type === "empresa") {
      setIsFav(isFavorite(user.id, curriculumId))
    }
  }, [user, curriculumId])

  const handleToggleFavorite = async () => {
    if (!user || user.type !== "empresa") return

    setIsLoading(true)

    // Mock API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (isFav) {
      const success = removeFromFavorites(user.id, curriculumId)
      if (success) setIsFav(false)
    } else {
      const success = addToFavorites(user.id, curriculumId)
      if (success) setIsFav(true)
    }

    setIsLoading(false)
  }

  if (!user || user.type !== "empresa") {
    return null
  }

  return (
    <Button
      variant={isFav ? "default" : "outline"}
      size={size}
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className={isFav ? "bg-red-600 hover:bg-red-700" : "bg-transparent"}
    >
      <Heart className={`h-4 w-4 mr-2 ${isFav ? "fill-current" : ""}`} />
      {isLoading ? "..." : isFav ? "Favoritado" : "Favoritar"}
    </Button>
  )
}
