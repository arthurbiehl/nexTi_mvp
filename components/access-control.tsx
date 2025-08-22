"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import { getUserSubscription, getPlanById } from "@/lib/plans-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Crown, Zap } from "lucide-react"
import Link from "next/link"

interface AccessControlProps {
  children: React.ReactNode
  feature: "view_full_curriculum" | "contact_candidate" | "save_favorites" | "advanced_search"
  fallbackMessage?: string
}

export function AccessControl({ children, feature, fallbackMessage }: AccessControlProps) {
  const { user } = useAuth()

  if (!user || user.type !== "empresa") {
    return null
  }

  const subscription = getUserSubscription(user.id)
  const currentPlan = subscription ? getPlanById(subscription.planId) : getPlanById("free")

  const hasAccess = () => {
    if (!currentPlan) return false

    switch (feature) {
      case "view_full_curriculum":
        return currentPlan.id !== "free"
      case "contact_candidate":
        return currentPlan.id !== "free"
      case "save_favorites":
        return currentPlan.id !== "free"
      case "advanced_search":
        return ["professional", "enterprise"].includes(currentPlan.id)
      default:
        return false
    }
  }

  const getFeatureName = () => {
    switch (feature) {
      case "view_full_curriculum":
        return "visualizar currículos completos"
      case "contact_candidate":
        return "contatar candidatos"
      case "save_favorites":
        return "salvar favoritos"
      case "advanced_search":
        return "busca avançada"
      default:
        return "esta funcionalidade"
    }
  }

  const getRequiredPlan = () => {
    switch (feature) {
      case "view_full_curriculum":
      case "contact_candidate":
      case "save_favorites":
        return "Starter"
      case "advanced_search":
        return "Professional"
      default:
        return "Premium"
    }
  }

  if (hasAccess()) {
    return <>{children}</>
  }

  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-800">
          <Crown className="h-5 w-5" />
          Funcionalidade Premium
        </CardTitle>
        <CardDescription className="text-orange-700">
          {fallbackMessage || `Você precisa do plano ${getRequiredPlan()} ou superior para ${getFeatureName()}.`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="border-orange-300 bg-orange-100 mb-4">
          <Zap className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Plano atual:</strong> {currentPlan?.name || "Gratuito"}
            <br />
            <strong>Necessário:</strong> {getRequiredPlan()} ou superior
          </AlertDescription>
        </Alert>
        <Link href="/planos">
          <Button className="bg-orange-600 hover:bg-orange-700">
            <Crown className="h-4 w-4 mr-2" />
            Fazer Upgrade
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
