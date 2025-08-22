"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { RouteGuard } from "@/components/route-guard"
import { AccessControl } from "@/components/access-control"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { getFavoritesByCompany, type FavoriteCandidate } from "@/lib/favorites-data"
import { getAllCurriculums, type Curriculum } from "@/lib/curriculum-data"
import { Heart, Search, User, MapPin, Calendar, Eye, Trash2 } from "lucide-react"
import Link from "next/link"

export default function FavoritesPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [favorites, setFavorites] = useState<FavoriteCandidate[]>([])
  const [curriculums, setCurriculums] = useState<Curriculum[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredFavorites, setFilteredFavorites] = useState<FavoriteCandidate[]>([])

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    if (user.type !== "empresa") {
      router.push("/dashboard")
      return
    }

    const userFavorites = getFavoritesByCompany(user.id)
    const allCurriculums = getAllCurriculums()

    setFavorites(userFavorites)
    setCurriculums(allCurriculums)
    setFilteredFavorites(userFavorites)
  }, [user, router])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredFavorites(favorites)
    } else {
      const filtered = favorites.filter((favorite) => {
        const curriculum = curriculums.find((c) => c.id === favorite.curriculumId)
        if (!curriculum) return false

        return (
          curriculum.personalInfo.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          curriculum.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
          favorite.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (favorite.notes && favorite.notes.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      })
      setFilteredFavorites(filtered)
    }
  }, [searchTerm, favorites, curriculums])

  const getCurriculumById = (id: string) => {
    return curriculums.find((c) => c.id === id)
  }

  return (
    <RouteGuard requireAuth={true} requireUserType="empresa">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navbar />

        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Heart className="h-8 w-8 text-red-500" />
              Candidatos Favoritos
            </h1>
            <p className="text-gray-600">Gerencie sua lista de candidatos favoritos</p>
          </div>

          <AccessControl feature="save_favorites">
            {/* Search */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Buscar nos Favoritos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Busque por nome, habilidades, tags ou notas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {filteredFavorites.length} candidato{filteredFavorites.length !== 1 ? "s" : ""} favorito
                  {filteredFavorites.length !== 1 ? "s" : ""}
                </h2>
              </div>

              {filteredFavorites.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      {favorites.length === 0 ? "Nenhum candidato favorito" : "Nenhum resultado encontrado"}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {favorites.length === 0
                        ? "Comece a favoritar candidatos para criar sua lista personalizada."
                        : "Tente ajustar os termos de busca."}
                    </p>
                    {favorites.length === 0 && (
                      <Link href="/curriculos">
                        <Button>Explorar Currículos</Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6">
                  {filteredFavorites.map((favorite) => {
                    const curriculum = getCurriculumById(favorite.curriculumId)
                    if (!curriculum) return null

                    return (
                      <Card key={favorite.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                <User className="h-6 w-6 text-primary" />
                              </div>
                              <div>
                                <CardTitle className="text-lg">{curriculum.personalInfo.fullName}</CardTitle>
                                <CardDescription className="flex items-center gap-4 mt-1">
                                  {curriculum.experiences[0] && <span>{curriculum.experiences[0].position}</span>}
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {curriculum.personalInfo.location}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    Favoritado em {new Date(favorite.addedAt).toLocaleDateString("pt-BR")}
                                  </span>
                                </CardDescription>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Link href={`/curriculos/${curriculum.id}`}>
                                <Button variant="outline" size="sm" className="bg-transparent">
                                  <Eye className="h-4 w-4 mr-2" />
                                  Ver Currículo
                                </Button>
                              </Link>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {favorite.notes && (
                              <div>
                                <h4 className="font-medium mb-1">Notas</h4>
                                <p className="text-sm text-muted-foreground">{favorite.notes}</p>
                              </div>
                            )}

                            <div>
                              <h4 className="font-medium mb-2">Tags</h4>
                              <div className="flex flex-wrap gap-2">
                                {favorite.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">Principais Habilidades</h4>
                              <div className="flex flex-wrap gap-2">
                                {curriculum.skills.slice(0, 6).map((skill) => (
                                  <Badge key={skill} variant="outline">
                                    {skill}
                                  </Badge>
                                ))}
                                {curriculum.skills.length > 6 && (
                                  <Badge variant="outline">+{curriculum.skills.length - 6} mais</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </div>
          </AccessControl>
        </div>
      </div>
    </RouteGuard>
  )
}
