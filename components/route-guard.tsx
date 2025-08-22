"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Crown, User, Building2, AlertTriangle } from "lucide-react"
import Link from "next/link"

interface RouteGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  requireUserType?: "normal" | "empresa"
  requireActivePlan?: boolean
  fallbackPath?: string
  showFallback?: boolean
}

export function RouteGuard({
  children,
  requireAuth = true,
  requireUserType,
  requireActivePlan = false,
  fallbackPath,
  showFallback = true,
}: RouteGuardProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return

    // Check authentication
    if (requireAuth && !user) {
      router.push(fallbackPath || "/login")
      return
    }

    // Check user type
    if (requireUserType && user?.type !== requireUserType) {
      if (user?.type === "empresa") {
        router.push("/dashboard")
      } else {
        router.push("/dashboard")
      }
      return
    }

    // Check active plan for companies
    if (requireActivePlan && user?.type === "empresa" && !user?.hasActivePlan) {
      if (!showFallback) {
        router.push("/planos")
      }
      return
    }
  }, [user, isLoading, requireAuth, requireUserType, requireActivePlan, router, fallbackPath, showFallback])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    )
  }

  // Not authenticated
  if (requireAuth && !user) {
    if (!showFallback) return null

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <CardTitle>Acesso Restrito</CardTitle>
            <CardDescription>Você precisa estar logado para acessar esta página</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-2">
              <Link href="/login">
                <Button className="w-full">Fazer Login</Button>
              </Link>
              <Link href="/registro">
                <Button variant="outline" className="w-full bg-transparent">
                  Criar Conta
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Wrong user type
  if (requireUserType && user?.type !== requireUserType) {
    if (!showFallback) return null

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            {requireUserType === "empresa" ? (
              <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            ) : (
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            )}
            <CardTitle>Acesso Restrito</CardTitle>
            <CardDescription>
              Esta página é exclusiva para {requireUserType === "empresa" ? "empresas" : "usuários individuais"}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/dashboard">
              <Button>Ir para Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Company without active plan
  if (requireActivePlan && user?.type === "empresa" && !user?.hasActivePlan) {
    if (!showFallback) return null

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Crown className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <CardTitle>Plano Premium Necessário</CardTitle>
            <CardDescription>Você precisa de um plano ativo para acessar esta funcionalidade</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <Alert className="border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                Assine um plano empresarial para ter acesso completo aos currículos e funcionalidades avançadas.
              </AlertDescription>
            </Alert>
            <div className="space-y-2">
              <Link href="/planos">
                <Button className="w-full">Ver Planos</Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" className="w-full bg-transparent">
                  Voltar ao Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
