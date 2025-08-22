"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { RouteGuard } from "@/components/route-guard"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { getCurriculumByUserId, getAllCurriculums } from "@/lib/curriculum-data"
import type { Curriculum } from "@/lib/curriculum-data"
import { User, FileText, Eye, TrendingUp, Users, Building2, Award, Target, Plus, Search, Crown } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [curriculum, setCurriculum] = useState<Curriculum | null>(null)
  const [allCurriculums, setAllCurriculums] = useState<Curriculum[]>([])

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    if (user.type === "normal") {
      const userCurriculum = getCurriculumByUserId(user.id)
      setCurriculum(userCurriculum || null)
    } else {
      const curriculums = getAllCurriculums()
      setAllCurriculums(curriculums)
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const calculateProfileCompleteness = (curriculum: Curriculum | null): number => {
    if (!curriculum) return 0

    let completeness = 0
    const maxScore = 100

    // Personal info (30 points)
    if (curriculum.personalInfo.fullName) completeness += 5
    if (curriculum.personalInfo.email) completeness += 5
    if (curriculum.personalInfo.phone) completeness += 5
    if (curriculum.personalInfo.location) completeness += 5
    if (curriculum.personalInfo.summary) completeness += 10

    // Experience (30 points)
    if (curriculum.experiences.length > 0) completeness += 15
    if (curriculum.experiences.length > 1) completeness += 10
    if (curriculum.experiences.some((exp) => exp.description.length > 50)) completeness += 5

    // Education (20 points)
    if (curriculum.education.length > 0) completeness += 20

    // Skills (10 points)
    if (curriculum.skills.length >= 3) completeness += 5
    if (curriculum.skills.length >= 6) completeness += 5

    // Languages (5 points)
    if (curriculum.languages.length > 0) completeness += 5

    // Links (5 points)
    if (curriculum.personalInfo.linkedIn || curriculum.personalInfo.github || curriculum.personalInfo.portfolio)
      completeness += 5

    return Math.min(completeness, maxScore)
  }

  // Mock data for demonstration
  const mockStats = {
    profileViews: 47,
    searchAppearances: 23,
    contactRequests: 5,
    profileRanking: "Top 15%",
  }

  return (
    <RouteGuard requireAuth={true}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navbar />

        <div className="container mx-auto px-4 py-8">
          {user.type === "normal" ? (
            <>
              {!curriculum ? (
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Crie Seu Currículo
                    </CardTitle>
                    <CardDescription>
                      Você ainda não possui um currículo. Crie agora para ser encontrado por empresas!
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/perfil">
                      <Button size="lg">
                        <Plus className="h-4 w-4 mr-2" />
                        Criar Currículo
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Profile Completeness */}
                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Completude do Perfil
                      </CardTitle>
                      <CardDescription>
                        Perfis mais completos têm {calculateProfileCompleteness(curriculum) < 80 ? "3x" : ""} mais
                        chances de serem encontrados
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Progresso</span>
                          <span className="text-sm text-muted-foreground">
                            {calculateProfileCompleteness(curriculum)}%
                          </span>
                        </div>
                        <Progress value={calculateProfileCompleteness(curriculum)} className="h-2" />
                        {calculateProfileCompleteness(curriculum) < 100 && (
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Para melhorar seu perfil:</p>
                            <ul className="text-sm space-y-1">
                              {!curriculum.personalInfo.summary && <li>• Adicione um resumo profissional</li>}
                              {curriculum.experiences.length === 0 && <li>• Adicione pelo menos uma experiência</li>}
                              {curriculum.education.length === 0 && <li>• Adicione sua formação acadêmica</li>}
                              {curriculum.skills.length < 6 && <li>• Adicione mais habilidades (mínimo 6)</li>}
                              {curriculum.languages.length === 0 && <li>• Adicione idiomas que você fala</li>}
                            </ul>
                            <Link href="/perfil">
                              <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                                Editar Perfil
                              </Button>
                            </Link>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{mockStats.profileViews}</div>
                        <p className="text-xs text-muted-foreground">+12% desde o mês passado</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Aparições em Busca</CardTitle>
                        <Search className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{mockStats.searchAppearances}</div>
                        <p className="text-xs text-muted-foreground">+5% desde o mês passado</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Contatos</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{mockStats.contactRequests}</div>
                        <p className="text-xs text-muted-foreground">Empresas interessadas</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ranking</CardTitle>
                        <Award className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{mockStats.profileRanking}</div>
                        <p className="text-xs text-muted-foreground">Na sua área</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Activity */}
                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Atividade Recente
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <div className="flex-1">
                            <p className="text-sm">
                              Seu perfil foi visualizado por <strong>Tech Solutions</strong>
                            </p>
                            <p className="text-xs text-muted-foreground">2 horas atrás</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          <div className="flex-1">
                            <p className="text-sm">
                              Apareceu em 3 buscas por <strong>React Developer</strong>
                            </p>
                            <p className="text-xs text-muted-foreground">1 dia atrás</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full" />
                          <div className="flex-1">
                            <p className="text-sm">Perfil atualizado com sucesso</p>
                            <p className="text-xs text-muted-foreground">3 dias atrás</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Ações Rápidas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link href="/perfil">
                          <Button variant="outline" className="w-full justify-start bg-transparent">
                            <FileText className="h-4 w-4 mr-2" />
                            Editar Currículo
                          </Button>
                        </Link>
                        <Link href="/curriculos">
                          <Button variant="outline" className="w-full justify-start bg-transparent">
                            <Search className="h-4 w-4 mr-2" />
                            Ver Outros Currículos
                          </Button>
                        </Link>
                        <Link href="/perfil">
                          <Button variant="outline" className="w-full justify-start bg-transparent">
                            <TrendingUp className="h-4 w-4 mr-2" />
                            Melhorar Perfil
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Empresarial</h1>
                <p className="text-gray-600">Bem-vindo, {user.name}!</p>
                {!user.hasActivePlan && (
                  <div className="mt-4">
                    <Badge variant="destructive" className="mr-2">
                      Plano Inativo
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Assine um plano para acessar currículos completos
                    </span>
                  </div>
                )}
              </div>

              {!user.hasActivePlan && (
                <Card className="mb-8 border-orange-200 bg-orange-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-800">
                      <Crown className="h-5 w-5" />
                      Ative Seu Plano Empresarial
                    </CardTitle>
                    <CardDescription className="text-orange-700">
                      Acesse currículos completos, informações de contato e muito mais!
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/planos">
                      <Button className="bg-orange-600 hover:bg-orange-700">
                        <Crown className="h-4 w-4 mr-2" />
                        Ver Planos
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}

              {/* Company Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Currículos Disponíveis</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{getAllCurriculums().length}</div>
                    <p className="text-xs text-muted-foreground">Profissionais cadastrados</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{user.hasActivePlan ? "127" : "0"}</div>
                    <p className="text-xs text-muted-foreground">
                      {user.hasActivePlan ? "Este mês" : "Assine para ver"}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Contatos Realizados</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{user.hasActivePlan ? "15" : "0"}</div>
                    <p className="text-xs text-muted-foreground">
                      {user.hasActivePlan ? "Candidatos contatados" : "Assine para contatar"}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Status do Plano</CardTitle>
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{user.hasActivePlan ? "Ativo" : "Inativo"}</div>
                    <p className="text-xs text-muted-foreground">{user.hasActivePlan ? "Premium" : "Gratuito"}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Curriculums */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Currículos Recentes
                  </CardTitle>
                  <CardDescription>
                    {user.hasActivePlan
                      ? "Profissionais que atualizaram seus currículos recentemente"
                      : "Assine um plano para ver currículos completos"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {getAllCurriculums()
                      .slice(0, 3)
                      .map((curriculum) => (
                        <div key={curriculum.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium">{curriculum.personalInfo.fullName}</h4>
                              <p className="text-sm text-muted-foreground">
                                {curriculum.experiences[0]?.position || "Profissional"}
                              </p>
                              <div className="flex gap-2 mt-1">
                                {curriculum.skills.slice(0, 3).map((skill) => (
                                  <Badge key={skill} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">
                              Atualizado em {new Date(curriculum.updatedAt).toLocaleDateString("pt-BR")}
                            </p>
                            <Link href={`/curriculos/${curriculum.id}`}>
                              <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                                {user.hasActivePlan ? "Ver Completo" : "Ver Preview"}
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Ações Rápidas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link href="/curriculos">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Search className="h-4 w-4 mr-2" />
                        Buscar Currículos
                      </Button>
                    </Link>
                    {!user.hasActivePlan && (
                      <Link href="/planos">
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                          <Crown className="h-4 w-4 mr-2" />
                          Assinar Plano
                        </Button>
                      </Link>
                    )}
                    <Link href="/perfil">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Building2 className="h-4 w-4 mr-2" />
                        Perfil da Empresa
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </RouteGuard>
  )
}
