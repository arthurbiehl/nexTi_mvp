"use client"

import { useAuth } from "@/lib/auth-context"
import { getUserSubscription, getPlanById } from "@/lib/plans-data"

export function useAccessControl() {
  const { user } = useAuth()

  const canViewFullCurriculum = () => {
    if (!user || user.type !== "empresa") return false
    return user.hasActivePlan || false
  }

  const canContactCandidate = () => {
    if (!user || user.type !== "empresa") return false
    return user.hasActivePlan || false
  }

  const canSaveFavorites = () => {
    if (!user || user.type !== "empresa") return false
    return user.hasActivePlan || false
  }

  const canUseAdvancedSearch = () => {
    if (!user || user.type !== "empresa") return false
    const subscription = getUserSubscription(user.id)
    const currentPlan = subscription ? getPlanById(subscription.planId) : null
    return currentPlan ? ["professional", "enterprise"].includes(currentPlan.id) : false
  }

  const getCurrentPlan = () => {
    if (!user || user.type !== "empresa") return null
    const subscription = getUserSubscription(user.id)
    return subscription ? getPlanById(subscription.planId) : getPlanById("free")
  }

  const getRemainingUsage = () => {
    const currentPlan = getCurrentPlan()
    if (!currentPlan) return null

    // Mock usage data - in real app, this would come from API
    const mockUsage = {
      curriculumViews: 23,
      contacts: 7,
    }

    return {
      curriculumViews: {
        used: mockUsage.curriculumViews,
        limit: currentPlan.maxCurriculumViews || 0,
        unlimited: currentPlan.maxCurriculumViews === -1,
      },
      contacts: {
        used: mockUsage.contacts,
        limit: currentPlan.maxContacts || 0,
        unlimited: currentPlan.maxContacts === -1,
      },
    }
  }

  const hasReachedLimit = (feature: "curriculumViews" | "contacts") => {
    const usage = getRemainingUsage()
    if (!usage) return false

    const featureUsage = usage[feature]
    if (featureUsage.unlimited) return false

    return featureUsage.used >= featureUsage.limit
  }

  return {
    canViewFullCurriculum,
    canContactCandidate,
    canSaveFavorites,
    canUseAdvancedSearch,
    getCurrentPlan,
    getRemainingUsage,
    hasReachedLimit,
    user,
  }
}
