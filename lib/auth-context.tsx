"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { getUserSubscription } from "./plans-data"

export type UserType = "normal" | "empresa"

export interface User {
  id: string
  email: string
  name: string
  type: UserType
  hasActivePlan?: boolean
  companyInfo?: {
    logo?: string
    description?: string
    website?: string
  }
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string, type: UserType) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users data
const mockUsers: User[] = [
  {
    id: "1",
    email: "joao@email.com",
    name: "João Silva",
    type: "normal",
  },
  {
    id: "2",
    email: "empresa@tech.com",
    name: "Tech Solutions",
    type: "empresa",
    hasActivePlan: true,
    companyInfo: {
      description: "Empresa de tecnologia focada em soluções inovadoras",
      website: "https://techsolutions.com",
    },
  },
  {
    id: "3",
    email: "maria@email.com",
    name: "Maria Santos",
    type: "normal",
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)

      if (parsedUser.type === "empresa") {
        const subscription = getUserSubscription(parsedUser.id)
        parsedUser.hasActivePlan = !!subscription
      }

      setUser(parsedUser)
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Mock authentication - in real app, this would be an API call
    const foundUser = mockUsers.find((u) => u.email === email)

    if (foundUser && password === "123456") {
      if (foundUser.type === "empresa") {
        const subscription = getUserSubscription(foundUser.id)
        foundUser.hasActivePlan = !!subscription
      }

      setUser(foundUser)
      localStorage.setItem("user", JSON.stringify(foundUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const register = async (email: string, password: string, name: string, type: UserType): Promise<boolean> => {
    setIsLoading(true)

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === email)
    if (existingUser) {
      setIsLoading(false)
      return false
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      type,
      hasActivePlan: type === "empresa" ? false : undefined,
    }

    mockUsers.push(newUser)
    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
