"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { Navbar } from "@/components/navbar"
import { CurriculumForm } from "@/components/curriculum-form"
import { CurriculumView } from "@/components/curriculum-view"
import { SubscriptionStatus } from "@/components/subscription-status"
import { CompanyProfile } from "@/components/company-profile"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCurriculumByUserId } from "@/lib/curriculum-data"
import type { Curriculum } from "@/lib/curriculum-data"
import { Edit, Eye, FileText, Building2, CreditCard } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [curriculum, setCurriculum] = useState<Curriculum | null>(null)
  const [activeTab, setActiveTab] = useState("view")

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    if (user.type === "normal") {
      const userCurriculum = getCurriculumByUserId(user.id)
      setCurriculum(userCurriculum || null)
    } else {
      setActiveTab("company")
    }
  }, [user, router])

  const handleCurriculumSave = () => {
    if (user) {
      const updatedCurriculum = getCurriculumByUserId(user.id)
      setCurriculum(updatedCurriculum || null)
      setActiveTab("view")
    }
  }

  if (!user) {
    return null
  }

  // Company Profile
  if (user.type === "empresa") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navbar />

        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Perfil da Empresa</h1>
            <p className="text-gray-600">Gerencie as informações da sua empresa e assinatura</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="company" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Empresa
              </TabsTrigger>
              <TabsTrigger value="subscription" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Assinatura
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Relatórios
              </TabsTrigger>
            </TabsList>

            <TabsContent value="company" className="mt-6">
              <CompanyProfile />
            </TabsContent>

            <TabsContent value="subscription" className="mt-6">
              <SubscriptionStatus />
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Relatórios e Análises</CardTitle>
                  <CardDescription>Acompanhe o desempenho da sua empresa na plataforma</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Relatórios detalhados estarão disponíveis em breve.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  }

  // User Profile
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Meu Perfil</h1>
          <p className="text-gray-600">Gerencie seu currículo e informações profissionais</p>
        </div>

        {!curriculum ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Criar Seu Currículo
              </CardTitle>
              <CardDescription>
                Você ainda não possui um currículo cadastrado. Crie agora para ser encontrado por empresas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CurriculumForm onSave={handleCurriculumSave} />
            </CardContent>
          </Card>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="view" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Visualizar
              </TabsTrigger>
              <TabsTrigger value="edit" className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Editar
              </TabsTrigger>
            </TabsList>

            <TabsContent value="view" className="mt-6">
              <CurriculumView curriculum={curriculum} />
            </TabsContent>

            <TabsContent value="edit" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Editar Currículo</CardTitle>
                  <CardDescription>
                    Mantenha suas informações sempre atualizadas para aumentar suas chances
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CurriculumForm onSave={handleCurriculumSave} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}
