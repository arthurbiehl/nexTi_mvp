"use client"

import { useAccessControl } from "@/hooks/use-access-control"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, Crown } from "lucide-react"
import Link from "next/link"

interface UsageLimitWarningProps {
  feature: "curriculumViews" | "contacts"
  action?: string
}

export function UsageLimitWarning({ feature, action }: UsageLimitWarningProps) {
  const { getRemainingUsage, hasReachedLimit, getCurrentPlan } = useAccessControl()

  const usage = getRemainingUsage()
  const currentPlan = getCurrentPlan()
  const reachedLimit = hasReachedLimit(feature)

  if (!usage || !currentPlan || usage[feature].unlimited) {
    return null
  }

  const featureUsage = usage[feature]
  const percentage = (featureUsage.used / featureUsage.limit) * 100
  const isNearLimit = percentage >= 80

  if (!isNearLimit && !reachedLimit) {
    return null
  }

  const getFeatureName = () => {
    switch (feature) {
      case "curriculumViews":
        return "visualizações de currículos"
      case "contacts":
        return "contatos com candidatos"
      default:
        return "esta funcionalidade"
    }
  }

  const getActionText = () => {
    return action || `usar ${getFeatureName()}`
  }

  if (reachedLimit) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <div className="space-y-2">
            <p>
              <strong>Limite atingido!</strong> Você não pode mais {getActionText()} este mês.
            </p>
            <p>
              Usado: {featureUsage.used} / {featureUsage.limit} {getFeatureName()}
            </p>
            <Link href="/planos">
              <Button size="sm" className="mt-2">
                <Crown className="h-3 w-3 mr-1" />
                Fazer Upgrade
              </Button>
            </Link>
          </div>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert className="mb-4 border-orange-200 bg-orange-50">
      <AlertTriangle className="h-4 w-4 text-orange-600" />
      <AlertDescription className="text-orange-800">
        <div className="space-y-2">
          <p>
            <strong>Próximo do limite!</strong> Você está usando {featureUsage.used} de {featureUsage.limit}{" "}
            {getFeatureName()} disponíveis.
          </p>
          <Progress value={percentage} className="h-2" />
          <Link href="/planos">
            <Button size="sm" variant="outline" className="mt-2 bg-transparent border-orange-300">
              <Crown className="h-3 w-3 mr-1" />
              Ver Planos
            </Button>
          </Link>
        </div>
      </AlertDescription>
    </Alert>
  )
}
