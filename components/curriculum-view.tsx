"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { FavoritesButton } from "@/components/favorites-button"
import { User, Briefcase, GraduationCap, Globe, MapPin, Phone, Mail, ExternalLink, Calendar } from "lucide-react"
import type { Curriculum } from "@/lib/curriculum-data"
import { useAuth } from "@/lib/auth-context"

interface CurriculumViewProps {
  curriculum: Curriculum
  isPreview?: boolean
}

export function CurriculumView({ curriculum, isPreview = false }: CurriculumViewProps) {
  const { user } = useAuth()
  const canViewFull = user?.type === "empresa" && user?.hasActivePlan

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const [year, month] = dateString.split("-")
    return `${month}/${year}`
  }

  const formatDateRange = (startDate: string, endDate?: string, current?: boolean) => {
    const start = formatDate(startDate)
    if (current) return `${start} - Atual`
    if (endDate) return `${start} - ${formatDate(endDate)}`
    return start
  }

  if (isPreview && !canViewFull) {
    return (
      <Card className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white z-10 pointer-events-none" />
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {curriculum.personalInfo.fullName}
              </CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {curriculum.personalInfo.location}
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {curriculum.personalInfo.email}
                </div>
              </div>
            </div>
            {user?.type === "empresa" && <FavoritesButton curriculumId={curriculum.id} />}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Resumo Profissional</h3>
            <p className="text-muted-foreground line-clamp-3">{curriculum.personalInfo.summary}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Experiência Profissional
            </h3>
            {curriculum.experiences.slice(0, 1).map((experience) => (
              <div key={experience.id} className="border-l-2 border-primary pl-4 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{experience.position}</h4>
                    <p className="text-sm text-muted-foreground">{experience.company}</p>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDateRange(experience.startDate, experience.endDate, experience.current)}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{experience.description}</p>
              </div>
            ))}
            {curriculum.experiences.length > 1 && (
              <p className="text-sm text-muted-foreground">
                +{curriculum.experiences.length - 1} experiências adicionais
              </p>
            )}
          </div>

          <div>
            <h3 className="font-semibold mb-2">Principais Habilidades</h3>
            <div className="flex flex-wrap gap-2">
              {curriculum.skills.slice(0, 5).map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
              {curriculum.skills.length > 5 && <Badge variant="outline">+{curriculum.skills.length - 5} mais</Badge>}
            </div>
          </div>

          <div className="text-center pt-8 pb-4">
            <div className="bg-gradient-to-t from-white to-transparent p-6">
              <h3 className="font-semibold mb-2">Ver Currículo Completo</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Assine um plano empresarial para acessar informações completas de contato, histórico profissional
                detalhado e muito mais.
              </p>
              <Button>Assinar Plano Empresarial</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {curriculum.personalInfo.fullName}
            </CardTitle>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {curriculum.personalInfo.location}
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                {curriculum.personalInfo.phone}
              </div>
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                {curriculum.personalInfo.email}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {curriculum.personalInfo.linkedIn && (
                <Button variant="outline" size="sm" asChild>
                  <a href={curriculum.personalInfo.linkedIn} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    LinkedIn
                  </a>
                </Button>
              )}
              {curriculum.personalInfo.github && (
                <Button variant="outline" size="sm" asChild>
                  <a href={curriculum.personalInfo.github} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    GitHub
                  </a>
                </Button>
              )}
              {curriculum.personalInfo.portfolio && (
                <Button variant="outline" size="sm" asChild>
                  <a href={curriculum.personalInfo.portfolio} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Portfolio
                  </a>
                </Button>
              )}
            </div>
          </div>
          {user?.type === "empresa" && <FavoritesButton curriculumId={curriculum.id} />}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Resumo Profissional</h3>
          <p className="text-muted-foreground">{curriculum.personalInfo.summary}</p>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Experiência Profissional
          </h3>
          <div className="space-y-6">
            {curriculum.experiences.map((experience) => (
              <div key={experience.id} className="border-l-2 border-primary pl-4 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{experience.position}</h4>
                    <p className="text-sm text-muted-foreground">{experience.company}</p>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDateRange(experience.startDate, experience.endDate, experience.current)}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{experience.description}</p>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Formação Acadêmica
          </h3>
          <div className="space-y-4">
            {curriculum.education.map((education) => (
              <div key={education.id} className="border-l-2 border-secondary pl-4 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">
                      {education.degree} em {education.field}
                    </h4>
                    <p className="text-sm text-muted-foreground">{education.institution}</p>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDateRange(education.startDate, education.endDate, education.current)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold mb-2">Habilidades</h3>
          <div className="flex flex-wrap gap-2">
            {curriculum.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Idiomas
          </h3>
          <div className="flex flex-wrap gap-2">
            {curriculum.languages.map((language) => (
              <Badge key={language} variant="outline">
                {language}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
