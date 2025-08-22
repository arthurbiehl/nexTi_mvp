"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { RouteGuard } from "@/components/route-guard"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { plans, getUserSubscription, createSubscription, type Plan } from "@/lib/plans-data"
import { Check, Crown, Star, Zap, Building2, Users, Phone, Mail } from "lucide-react"

export default function PlansPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    if (user.type === "normal") {
      router.push("/dashboard")
      return
    }

    // Get current subscription
    const subscription = getUserSubscription(user.id)
    if (subscription) {
      const plan = plans.find((p) => p.id === subscription.planId)
      setCurrentPlan(plan || null)
    } else {
      setCurrentPlan(plans[0]) // Free plan
    }
  }, [user, router])

  const handlePlanSelect = async (planId: string) => {
    if (!user || planId === currentPlan?.id) return

    setIsLoading(true)
    setSelectedPlan(planId)

    // Mock payment process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (planId === "free") {
      // Handle downgrade to free
      setCurrentPlan(plans[0])
    } else {
      // Create subscription
      const success = createSubscription(user.id, planId)
      if (success) {
        const newPlan = plans.find((p) => p.id === planId)
        setCurrentPlan(newPlan || null)

        // Update user context (mock)
        if (user) {
          user.hasActivePlan = true
        }
      }
    }

    setIsLoading(false)
    setSelectedPlan(null)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  return (
    <RouteGuard requireAuth={true} requireUserType="empresa">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navbar />

        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Escolha Seu Plano</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Encontre o plano ideal para sua empresa e tenha acesso aos melhores profissionais do mercado
            </p>
            {currentPlan && (
              <div className="mt-4">
                <Badge variant="secondary" className="text-sm">
                  Plano Atual: {currentPlan.name}
                </Badge>
              </div>
            )}
          </div>

          {/* Success Alert */}
          {selectedPlan && !isLoading && (
            <Alert className="mb-8 border-green-200 bg-green-50">
              <Check className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Plano ativado com sucesso! Agora você tem acesso a todos os recursos.
              </AlertDescription>
            </Alert>
          )}

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {plans.map((plan) => {
              const isCurrentPlan = currentPlan?.id === plan.id
              const isPopular = plan.popular
              const isLoading_ = isLoading && selectedPlan === plan.id

              return (
                <Card
                  key={plan.id}
                  className={`relative ${
                    isPopular ? "border-2 border-blue-500 shadow-lg scale-105" : ""
                  } ${isCurrentPlan ? "border-green-500 bg-green-50" : ""}`}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-500 text-white px-3 py-1">
                        <Star className="h-3 w-3 mr-1" />
                        Mais Popular
                      </Badge>
                    </div>
                  )}

                  {isCurrentPlan && (
                    <div className="absolute -top-3 right-4">
                      <Badge className="bg-green-500 text-white px-3 py-1">
                        <Check className="h-3 w-3 mr-1" />
                        Ativo
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center">
                    <div className="mb-4">
                      {plan.id === "free" && <Building2 className="h-8 w-8 mx-auto text-gray-500" />}
                      {plan.id === "starter" && <Zap className="h-8 w-8 mx-auto text-blue-500" />}
                      {plan.id === "professional" && <Crown className="h-8 w-8 mx-auto text-purple-500" />}
                      {plan.id === "enterprise" && <Users className="h-8 w-8 mx-auto text-orange-500" />}
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{formatPrice(plan.price)}</span>
                      <span className="text-muted-foreground">/{plan.period === "month" ? "mês" : "ano"}</span>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full ${
                        isPopular ? "bg-blue-600 hover:bg-blue-700" : ""
                      } ${isCurrentPlan ? "bg-green-600 hover:bg-green-700" : ""}`}
                      variant={isCurrentPlan ? "default" : isPopular ? "default" : "outline"}
                      onClick={() => handlePlanSelect(plan.id)}
                      disabled={isCurrentPlan || isLoading_}
                    >
                      {isLoading_
                        ? "Processando..."
                        : isCurrentPlan
                          ? "Plano Atual"
                          : plan.id === "enterprise"
                            ? "Contatar Vendas"
                            : `Escolher ${plan.name}`}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* FAQ Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Perguntas Frequentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Posso cancelar minha assinatura a qualquer momento?</h4>
                <p className="text-sm text-muted-foreground">
                  Sim, você pode cancelar sua assinatura a qualquer momento. O acesso aos recursos premium continuará
                  até o final do período pago.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">O que acontece se eu exceder os limites do meu plano?</h4>
                <p className="text-sm text-muted-foreground">
                  Você receberá uma notificação quando estiver próximo do limite. Após exceder, será necessário fazer
                  upgrade para continuar usando os recursos.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Posso fazer upgrade ou downgrade do meu plano?</h4>
                <p className="text-sm text-muted-foreground">
                  Sim, você pode alterar seu plano a qualquer momento. As mudanças entram em vigor imediatamente e o
                  valor é ajustado proporcionalmente.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Há desconto para pagamento anual?</h4>
                <p className="text-sm text-muted-foreground">
                  Sim, oferecemos 20% de desconto para assinaturas anuais. Entre em contato conosco para mais detalhes.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card>
            <CardHeader>
              <CardTitle>Precisa de Ajuda?</CardTitle>
              <CardDescription>Nossa equipe está pronta para ajudar você a escolher o melhor plano</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">vendas@curriculosys.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Telefone</p>
                    <p className="text-sm text-muted-foreground">(11) 9999-9999</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </RouteGuard>
  )
}
