"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getAllCurriculums } from "@/lib/curriculum-data"
import type { Curriculum } from "@/lib/curriculum-data"
import { Search, User, MapPin, Calendar, Eye, Crown } from "lucide-react"
import Link from "next/link"

export default function CurriculumsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [curriculums, setCurriculums] = useState<Curriculum[]>([])
  const [filteredCurriculums, setFilteredCurriculums] = useState<Curriculum[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    const allCurriculums = getAllCurriculums()
    setCurriculums(allCurriculums)
    setFilteredCurriculums(allCurriculums)
  }, [user, router])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCurriculums(curriculums)
    } else {
      const filtered = curriculums.filter(
        (curriculum) =>
          curriculum.personalInfo.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          curriculum.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
          curriculum.experiences.some(
            (exp) =>
              exp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
              exp.company.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      )
      setFilteredCurriculums(filtered)
    }
  }, [searchTerm, curriculums])

  if (!user) {
    return null
  }

  const canViewFull = user.type === "empresa" && user.hasActivePlan

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Currículos</h1>
          <p className="text-gray-600">
            {user.type === "empresa"
              ? canViewFull
                ? "Encontre os melhores profissionais para sua equipe"
                : "Visualize previews dos currículos - assine um plano para ver informações completas"
              : "Explore outros profissionais da plataforma"}
          </p>
        </div>

        {user.type === "empresa" && !user.hasActivePlan && (
          <Card className="mb-8 border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <Crown className="h-5 w-5" />
                Acesso Limitado
              </CardTitle>
              <CardDescription className="text-orange-700">
                Você está visualizando apenas previews. Assine um plano para acessar informações completas de contato e
                histórico profissional.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/planos">
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <Crown className="h-4 w-4 mr-2" />
                  Assinar Plano Empresarial
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Search */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Buscar Profissionais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Busque por nome, habilidades, cargo ou empresa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="bg-transparent">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {filteredCurriculums.length} profissional{filteredCurriculums.length !== 1 ? "is" : ""} encontrado
              {filteredCurriculums.length !== 1 ? "s" : ""}
            </h2>
          </div>

          <div className="grid gap-6">
            {filteredCurriculums.map((curriculum) => (
              <Card key={curriculum.id} className="hover:shadow-lg transition-shadow">
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
                            Atualizado em {new Date(curriculum.updatedAt).toLocaleDateString("pt-BR")}
                          </span>
                        </CardDescription>
                      </div>
                    </div>
                    <Link href={`/curriculos/${curriculum.id}`}>
                      <Button variant="outline" className="bg-transparent">
                        <Eye className="h-4 w-4 mr-2" />
                        {canViewFull ? "Ver Completo" : "Ver Preview"}
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground line-clamp-2">{curriculum.personalInfo.summary}</p>

                    <div>
                      <h4 className="font-medium mb-2">Principais Habilidades</h4>
                      <div className="flex flex-wrap gap-2">
                        {curriculum.skills.slice(0, 6).map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                        {curriculum.skills.length > 6 && (
                          <Badge variant="outline">+{curriculum.skills.length - 6} mais</Badge>
                        )}
                      </div>
                    </div>

                    {curriculum.experiences[0] && (
                      <div>
                        <h4 className="font-medium mb-1">Experiência Atual</h4>
                        <p className="text-sm text-muted-foreground">
                          {curriculum.experiences[0].position} na {curriculum.experiences[0].company}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCurriculums.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhum currículo encontrado</h3>
                <p className="text-muted-foreground">
                  Tente ajustar os termos de busca ou explore todos os profissionais disponíveis.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
