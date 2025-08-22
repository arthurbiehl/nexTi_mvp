import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Users, Building2, Shield, Search } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Conecte Talentos com
            <span className="text-blue-600"> Oportunidades</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A plataforma completa para profissionais cadastrarem seus currículos e empresas encontrarem os melhores
            talentos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/registro">
              <Button size="lg" className="w-full sm:w-auto">
                Cadastrar Currículo
              </Button>
            </Link>
            <Link href="/planos">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                Sou Empresa
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>Para Profissionais</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Cadastre seu currículo e seja encontrado por empresas que buscam seu perfil.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Building2 className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>Para Empresas</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Acesse currículos completos e encontre os melhores candidatos para sua equipe.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Search className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>Explore Empresas</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Veja empresas cadastradas e descubra oportunidades que combinam com seu perfil.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 text-orange-600 mb-2" />
              <CardTitle>Acesso Controlado</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Sistema seguro com diferentes níveis de acesso para proteger informações.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Descubra Oportunidades</h2>
            <p className="text-gray-600">
              Explore empresas cadastradas e veja que tipo de profissionais elas estão buscando
            </p>
          </div>
          <div className="flex justify-center">
            <Link href="/empresas">
              <Button size="lg" variant="outline">
                <Building2 className="mr-2 h-5 w-5" />
                Ver Empresas
              </Button>
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Pronto para começar?</h2>
          <p className="text-gray-600 mb-6">
            Junte-se a milhares de profissionais e empresas que já usam nossa plataforma.
          </p>
          <Link href="/registro">
            <Button size="lg">Criar Conta Gratuita</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
