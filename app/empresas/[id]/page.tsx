import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { getCompanyById } from "@/lib/companies-data"
import { Building2, MapPin, Users, Globe, Briefcase, Calendar, DollarSign, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

interface CompanyPageProps {
  params: {
    id: string
  }
}

export default function CompanyPage({ params }: CompanyPageProps) {
  const company = getCompanyById(params.id)

  if (!company) {
    notFound()
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }

  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "há 1 dia"
    if (diffDays < 7) return `há ${diffDays} dias`
    if (diffDays < 30) return `há ${Math.floor(diffDays / 7)} semanas`
    return `há ${Math.floor(diffDays / 30)} meses`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Company Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start gap-6">
              <Image
                src={company.logo || "/placeholder.svg"}
                alt={`Logo ${company.name}`}
                width={100}
                height={100}
                className="rounded-lg"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{company.name}</h1>
                    <div className="flex items-center gap-4 text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {company.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {company.size}
                      </div>
                      <div className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        {company.industry}
                      </div>
                    </div>
                  </div>
                  {company.website && (
                    <Button variant="outline" asChild>
                      <a href={company.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4 mr-2" />
                        Website
                      </a>
                    </Button>
                  )}
                </div>
                <p className="text-gray-700 leading-relaxed">{company.description}</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Job Requirements */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Briefcase className="h-6 w-6" />
            Oportunidades Disponíveis ({company.requirements.length})
          </h2>
        </div>

        <div className="grid gap-6">
          {company.requirements.map((requirement) => (
            <Card key={requirement.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{requirement.title}</CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        {requirement.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {requirement.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {getTimeAgo(requirement.postedAt)}
                      </span>
                    </CardDescription>
                  </div>
                  <Badge
                    variant={
                      requirement.level === "Senior"
                        ? "default"
                        : requirement.level === "Pleno"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {requirement.level}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-700">{requirement.description}</p>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Habilidades Necessárias:</h4>
                    <div className="flex flex-wrap gap-2">
                      {requirement.skills.map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {requirement.type}
                      </span>
                      {requirement.salary && (
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {requirement.salary}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Publicado em {formatDate(requirement.postedAt)}
                      </span>
                    </div>

                    <Button size="sm">Demonstrar Interesse</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {company.requirements.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma vaga disponível</h3>
            <p className="text-gray-600">Esta empresa não possui vagas abertas no momento.</p>
          </div>
        )}

        <div className="mt-8 text-center">
          <Button variant="outline" asChild>
            <Link href="/empresas">← Voltar para Empresas</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
