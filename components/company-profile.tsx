"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Building2, Globe, Mail, Users, Calendar, Save } from "lucide-react"

interface CompanyData {
  name: string
  email: string
  description: string
  website: string
  phone: string
  address: string
  industry: string
  size: string
  founded: string
  logo?: string
}

export function CompanyProfile() {
  const { user } = useAuth()
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: user?.name || "",
    email: user?.email || "",
    description: user?.companyInfo?.description || "",
    website: user?.companyInfo?.website || "",
    phone: "",
    address: "",
    industry: "",
    size: "",
    founded: "",
    logo: user?.companyInfo?.logo,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleInputChange = (field: keyof CompanyData, value: string) => {
    setCompanyData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = async () => {
    setIsLoading(true)

    // Mock save operation
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Update user context (mock)
    if (user && user.companyInfo) {
      user.companyInfo.description = companyData.description
      user.companyInfo.website = companyData.website
      user.companyInfo.logo = companyData.logo
    }

    setIsLoading(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  if (!user || user.type !== "empresa") {
    return null
  }

  return (
    <div className="space-y-6">
      {showSuccess && (
        <Alert className="border-green-200 bg-green-50">
          <Save className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">Informações da empresa salvas com sucesso!</AlertDescription>
        </Alert>
      )}

      {/* Company Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Informações da Empresa
          </CardTitle>
          <CardDescription>
            Mantenha as informações da sua empresa atualizadas para atrair os melhores candidatos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Logo and Basic Info */}
          <div className="flex items-start gap-6">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={companyData.logo || "/placeholder.svg"} alt={companyData.name} />
                <AvatarFallback className="text-2xl">{companyData.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" className="bg-transparent">
                Alterar Logo
              </Button>
            </div>

            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome da Empresa</Label>
                  <Input
                    id="name"
                    value={companyData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Corporativo</Label>
                  <Input
                    id="email"
                    type="email"
                    value={companyData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={companyData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    placeholder="https://suaempresa.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={companyData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="(11) 9999-9999"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descrição da Empresa</Label>
                <Textarea
                  id="description"
                  rows={4}
                  value={companyData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Descreva sua empresa, cultura, missão e valores..."
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Adicionais</CardTitle>
          <CardDescription>Essas informações ajudam candidatos a conhecer melhor sua empresa</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="industry">Setor/Indústria</Label>
              <Input
                id="industry"
                value={companyData.industry}
                onChange={(e) => handleInputChange("industry", e.target.value)}
                placeholder="Ex: Tecnologia, Saúde, Educação"
              />
            </div>
            <div>
              <Label htmlFor="size">Tamanho da Empresa</Label>
              <Input
                id="size"
                value={companyData.size}
                onChange={(e) => handleInputChange("size", e.target.value)}
                placeholder="Ex: 1-10, 11-50, 51-200, 200+"
              />
            </div>
            <div>
              <Label htmlFor="founded">Ano de Fundação</Label>
              <Input
                id="founded"
                value={companyData.founded}
                onChange={(e) => handleInputChange("founded", e.target.value)}
                placeholder="Ex: 2020"
              />
            </div>
            <div>
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                value={companyData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Cidade, Estado"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Estatísticas da Empresa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-2">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold">127</div>
              <div className="text-sm text-muted-foreground">Currículos Visualizados</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-2">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold">23</div>
              <div className="text-sm text-muted-foreground">Candidatos Contatados</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-2">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold">15</div>
              <div className="text-sm text-muted-foreground">Dias na Plataforma</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-2">
                <Globe className="h-6 w-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold">8</div>
              <div className="text-sm text-muted-foreground">Candidatos Favoritos</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading} size="lg">
          {isLoading ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </div>
    </div>
  )
}
