"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { getUserSubscription, cancelSubscription, type Plan, plans } from "@/lib/plans-data"
import { Calendar, CreditCard, AlertTriangle, Crown } from "lucide-react"
import Link from "next/link"

export function SubscriptionStatus() {
  const { user } = useAuth()
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null)
  const [usage, setUsage] = useState({
    curriculumViews: 23,
    contacts: 7,
  })

  useEffect(() => {
    if (!user || user.type !== "empresa") return

    const subscription = getUserSubscription(user.id)
    if (subscription) {
      const plan = plans.find((p) => p.id === subscription.planId)
      setCurrentPlan(plan || null)
    } else {
      setCurrentPlan(plans[0]) // Free plan
    }
  }, [user])

  const handleCancelSubscription = () => {
    if (!user) return

    const success = cancelSubscription(user.id)
    if (success) {
      setCurrentPlan(plans[0]) // Downgrade to free
      if (user) {
        user.hasActivePlan = false
      }
    }
  }

  if (!user || user.type !== "empresa" || !currentPlan) {
    return null
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const getUsagePercentage = (used: number, limit: number) => {
    if (limit === -1) return 0 // unlimited
    return Math.min((used / limit) * 100, 100)
  }

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5" />
            Plano Atual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold">{currentPlan.name}</h3>
              <p className="text-muted-foreground">{currentPlan.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{formatPrice(currentPlan.price)}</div>
              <div className="text-sm text-muted-foreground">/mês</div>
            </div>
          </div>

          {currentPlan.id !== "free" && (
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Próxima cobrança: 15/02/2024
              </div>
              <div className="flex items-center gap-1">
                <CreditCard className="h-4 w-4" />
                Cartão final 4532
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Link href="/planos">
              <Button variant="outline" className="bg-transparent">
                {currentPlan.id === "free" ? "Fazer Upgrade" : "Alterar Plano"}
              </Button>
            </Link>
            {currentPlan.id !== "free" && (
              <Button variant="destructive" onClick={handleCancelSubscription}>
                Cancelar Assinatura
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Usage Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Uso do Plano</CardTitle>
          <CardDescription>Acompanhe seu uso mensal dos recursos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Curriculum Views */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Visualizações de Currículos</span>
              <span className="text-sm text-muted-foreground">
                {usage.curriculumViews}
                {currentPlan.maxCurriculumViews === -1 ? " / Ilimitado" : ` / ${currentPlan.maxCurriculumViews}`}
              </span>
            </div>
            {currentPlan.maxCurriculumViews !== -1 && (
              <Progress
                value={getUsagePercentage(usage.curriculumViews, currentPlan.maxCurriculumViews || 0)}
                className="h-2"
              />
            )}
          </div>

          {/* Contacts */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Contatos Realizados</span>
              <span className="text-sm text-muted-foreground">
                {usage.contacts}
                {currentPlan.maxContacts === -1 ? " / Ilimitado" : ` / ${currentPlan.maxContacts || 0}`}
              </span>
            </div>
            {currentPlan.maxContacts !== -1 && (
              <Progress value={getUsagePercentage(usage.contacts, currentPlan.maxContacts || 0)} className="h-2" />
            )}
          </div>

          {/* Usage Warnings */}
          {currentPlan.maxCurriculumViews !== -1 &&
            getUsagePercentage(usage.curriculumViews, currentPlan.maxCurriculumViews || 0) > 80 && (
              <div className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <div className="text-sm">
                  <p className="font-medium text-orange-800">Limite próximo</p>
                  <p className="text-orange-700">
                    Você está próximo do limite de visualizações. Considere fazer upgrade do seu plano.
                  </p>
                </div>
              </div>
            )}
        </CardContent>
      </Card>

      {/* Plan Features */}
      <Card>
        <CardHeader>
          <CardTitle>Recursos do Seu Plano</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {currentPlan.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
