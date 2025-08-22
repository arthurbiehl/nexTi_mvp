export interface Plan {
  id: string
  name: string
  price: number
  period: "month" | "year"
  description: string
  features: string[]
  popular?: boolean
  buttonText: string
  maxCurriculumViews?: number
  maxContacts?: number
}

export const plans: Plan[] = [
  {
    id: "free",
    name: "Gratuito",
    price: 0,
    period: "month",
    description: "Para empresas que querem conhecer a plataforma",
    features: [
      "Visualizar previews de currículos",
      "Busca básica por profissionais",
      "Até 5 visualizações por mês",
      "Suporte por email",
    ],
    buttonText: "Plano Atual",
    maxCurriculumViews: 5,
    maxContacts: 0,
  },
  {
    id: "professional",
    name: "Professional",
    price: 50,
    period: "month",
    description: "Para empresas em crescimento",
    features: [
      "Tudo do plano Starter",
      "Visualizações ilimitadas",
      "Até 50 contatos por mês",
      "Relatórios de atividade",
      "Salvar candidatos favoritos",
      "Histórico de buscas",
      "Suporte por telefone",
    ],
    popular: true,
    buttonText: "Mais Popular",
    maxCurriculumViews: -1, // unlimited
    maxContacts: 50,
  },
    {
    id: "VIP",
    name: "VIP",
    price: 100,
    period: "month",
    description: "Para empresas Desenvolvidas",
    features: [
      "Tudo do plano Profissional",
      "Contatos Limitados",
      "Assistencia pessoal profissionalizada",
      "Prioridade de contato"

    ],
    popular: false,
    buttonText: "Mais Popular",
    maxCurriculumViews: -1, // unlimited
    maxContacts: 50,
  },
]

export function getPlanById(planId: string): Plan | undefined {
  return plans.find((plan) => plan.id === planId)
}

// Mock subscription management
export interface Subscription {
  userId: string
  planId: string
  status: "active" | "cancelled" | "expired"
  startDate: string
  endDate: string
  autoRenew: boolean
}

const mockSubscriptions: Subscription[] = [
  {
    userId: "2", // empresa@tech.com
    planId: "professional",
    status: "active",
    startDate: "2024-01-01",
    endDate: "2024-02-01",
    autoRenew: true,
  },
]

export function getUserSubscription(userId: string): Subscription | undefined {
  return mockSubscriptions.find((sub) => sub.userId === userId && sub.status === "active")
}

export function createSubscription(userId: string, planId: string): boolean {
  // Remove existing subscription
  const existingIndex = mockSubscriptions.findIndex((sub) => sub.userId === userId)
  if (existingIndex >= 0) {
    mockSubscriptions.splice(existingIndex, 1)
  }

  // Add new subscription
  const startDate = new Date()
  const endDate = new Date()
  endDate.setMonth(endDate.getMonth() + 1)

  mockSubscriptions.push({
    userId,
    planId,
    status: "active",
    startDate: startDate.toISOString().split("T")[0],
    endDate: endDate.toISOString().split("T")[0],
    autoRenew: true,
  })

  return true
}

export function cancelSubscription(userId: string): boolean {
  const subscription = mockSubscriptions.find((sub) => sub.userId === userId)
  if (subscription) {
    subscription.status = "cancelled"
    subscription.autoRenew = false
    return true
  }
  return false
}
