"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { RouteGuard } from "@/components/route-guard"
import { UsageLimitWarning } from "@/components/usage-limit-warning"
import { Navbar } from "@/components/navbar"
import { CurriculumView } from "@/components/curriculum-view"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getAllCurriculums } from "@/lib/curriculum-data"
import type { Curriculum } from "@/lib/curriculum-data"
import { ArrowLeft, Crown } from "lucide-react"
import Link from "next/link"

export default function CurriculumDetailPage() {
  const { user } = useAuth()
  const router = useRouter()
  const params = useParams()
  const [curriculum, setCurriculum] = useState<Curriculum | null>(null)

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    const curriculumId = params.id as string
    const allCurriculums = getAllCurriculums()
    const foundCurriculum = allCurriculums.find((c) => c.id === curriculumId)

    if (!foundCurriculum) {
      router.push("/curriculos")
      return
    }

    setCurriculum(foundCurriculum)
  }, [user, router, params.id])

  if (!user || !curriculum) {
    return null
  }

  const canViewFull = user.type === "empresa" && user.hasActivePlan
  const isPreview = !canViewFull

  return (
    <RouteGuard requireAuth={true}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navbar />

        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Link href="/curriculos">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar aos Currículos
              </Button>
            </Link>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {isPreview ? "Preview do Currículo" : "Currículo Completo"}
                </h1>
                <p className="text-gray-600">
                  {isPreview
                    ? "Visualização limitada - assine um plano para ver informações completas"
                    : "Informações completas do profissional"}
                </p>
              </div>

              {isPreview && (
                <Link href="/planos">
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <Crown className="h-4 w-4 mr-2" />
                    Assinar Plano
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Usage Warning for Companies */}
          {user.type === "empresa" && canViewFull && (
            <UsageLimitWarning feature="curriculumViews" action="visualizar mais currículos" />
          )}

          {isPreview && (
            <Card className="mb-6 border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <Crown className="h-5 w-5" />
                  Acesso Limitado
                </CardTitle>
                <CardDescription className="text-orange-700">
                  Você está visualizando apenas um preview deste currículo. Assine um plano empresarial para acessar:
                </CardDescription>
              </CardHeader>
              <CardContent className="text-orange-700">
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Informações completas de contato (telefone, email)</li>
                  <li>Histórico profissional detalhado</li>
                  <li>Formação acadêmica completa</li>
                  <li>Todas as habilidades e idiomas</li>
                  <li>Links para LinkedIn, GitHub e portfolio</li>
                </ul>
              </CardContent>
            </Card>
          )}

          <CurriculumView curriculum={curriculum} isPreview={isPreview} />
        </div>
      </div>
    </RouteGuard>
  )
}
