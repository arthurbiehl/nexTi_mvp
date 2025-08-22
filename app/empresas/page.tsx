import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { getActiveCompanies } from "@/lib/companies-data"
import { Building2, MapPin, Users, Globe, Briefcase } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function EmpresasPage() {
  const companies = getActiveCompanies()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Empresas Cadastradas</h1>
          <p className="text-gray-600">Conheça as empresas que estão buscando talentos e veja suas oportunidades</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <Card key={company.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Image
                    src={company.logo || "/placeholder.svg"}
                    alt={`Logo ${company.name}`}
                    width={60}
                    height={60}
                    className="rounded-lg"
                  />
                  <div className="flex-1">
                    <CardTitle className="text-lg">{company.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="h-4 w-4" />
                      {company.location}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 line-clamp-3">{company.description}</p>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Building2 className="h-3 w-3" />
                    {company.industry}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {company.size}
                  </Badge>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Briefcase className="h-4 w-4" />
                    <span>{company.requirements.length} vagas</span>
                  </div>

                  <div className="flex gap-2">
                    {company.website && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={company.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    <Button size="sm" asChild>
                      <Link href={`/empresas/${company.id}`}>Ver empresa</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {companies.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma empresa encontrada</h3>
            <p className="text-gray-600">Não há empresas ativas no momento.</p>
          </div>
        )}
      </main>
    </div>
  )
}
