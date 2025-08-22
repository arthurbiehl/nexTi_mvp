"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Briefcase, GraduationCap, User, Globe } from "lucide-react"
import type { Curriculum, Experience, Education } from "@/lib/curriculum-data"
import { getCurriculumByUserId, saveCurriculum } from "@/lib/curriculum-data"
import { useAuth } from "@/lib/auth-context"

interface CurriculumFormProps {
  onSave?: () => void
}

export function CurriculumForm({ onSave }: CurriculumFormProps) {
  const { user } = useAuth()
  const [curriculum, setCurriculum] = useState<Curriculum>({
    id: "",
    userId: user?.id || "",
    personalInfo: {
      fullName: user?.name || "",
      email: user?.email || "",
      phone: "",
      location: "",
      summary: "",
      linkedIn: "",
      github: "",
      portfolio: "",
    },
    experiences: [],
    education: [],
    skills: [],
    languages: [],
    createdAt: "",
    updatedAt: "",
  })

  const [newSkill, setNewSkill] = useState("")
  const [newLanguage, setNewLanguage] = useState("")

  useEffect(() => {
    if (user) {
      const existingCurriculum = getCurriculumByUserId(user.id)
      if (existingCurriculum) {
        setCurriculum(existingCurriculum)
      } else {
        setCurriculum((prev) => ({
          ...prev,
          id: Date.now().toString(),
          userId: user.id,
        }))
      }
    }
  }, [user])

  const handlePersonalInfoChange = (field: string, value: string) => {
    setCurriculum((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }))
  }

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    }
    setCurriculum((prev) => ({
      ...prev,
      experiences: [...prev.experiences, newExperience],
    }))
  }

  const updateExperience = (id: string, field: string, value: string | boolean) => {
    setCurriculum((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }))
  }

  const removeExperience = (id: string) => {
    setCurriculum((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }))
  }

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false,
    }
    setCurriculum((prev) => ({
      ...prev,
      education: [...prev.education, newEducation],
    }))
  }

  const updateEducation = (id: string, field: string, value: string | boolean) => {
    setCurriculum((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    }))
  }

  const removeEducation = (id: string) => {
    setCurriculum((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }))
  }

  const addSkill = () => {
    if (newSkill.trim() && !curriculum.skills.includes(newSkill.trim())) {
      setCurriculum((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setCurriculum((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  const addLanguage = () => {
    if (newLanguage.trim() && !curriculum.languages.includes(newLanguage.trim())) {
      setCurriculum((prev) => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()],
      }))
      setNewLanguage("")
    }
  }

  const removeLanguage = (language: string) => {
    setCurriculum((prev) => ({
      ...prev,
      languages: prev.languages.filter((l) => l !== language),
    }))
  }

  const handleSave = () => {
    saveCurriculum(curriculum)
    onSave?.()
  }

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Informações Pessoais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Nome Completo</Label>
              <Input
                id="fullName"
                value={curriculum.personalInfo.fullName}
                onChange={(e) => handlePersonalInfoChange("fullName", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={curriculum.personalInfo.email}
                onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={curriculum.personalInfo.phone}
                onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="location">Localização</Label>
              <Input
                id="location"
                value={curriculum.personalInfo.location}
                onChange={(e) => handlePersonalInfoChange("location", e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="summary">Resumo Profissional</Label>
            <Textarea
              id="summary"
              rows={4}
              value={curriculum.personalInfo.summary}
              onChange={(e) => handlePersonalInfoChange("summary", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="linkedIn">LinkedIn</Label>
              <Input
                id="linkedIn"
                value={curriculum.personalInfo.linkedIn}
                onChange={(e) => handlePersonalInfoChange("linkedIn", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="github">GitHub</Label>
              <Input
                id="github"
                value={curriculum.personalInfo.github}
                onChange={(e) => handlePersonalInfoChange("github", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="portfolio">Portfolio</Label>
              <Input
                id="portfolio"
                value={curriculum.personalInfo.portfolio}
                onChange={(e) => handlePersonalInfoChange("portfolio", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Experience */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Experiência Profissional
          </CardTitle>
          <CardDescription>Adicione suas experiências profissionais</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {curriculum.experiences.map((experience, index) => (
            <div key={experience.id} className="p-4 border rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Experiência {index + 1}</h4>
                <Button variant="ghost" size="sm" onClick={() => removeExperience(experience.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Empresa</Label>
                  <Input
                    value={experience.company}
                    onChange={(e) => updateExperience(experience.id, "company", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Cargo</Label>
                  <Input
                    value={experience.position}
                    onChange={(e) => updateExperience(experience.id, "position", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Data de Início</Label>
                  <Input
                    type="month"
                    value={experience.startDate}
                    onChange={(e) => updateExperience(experience.id, "startDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Data de Fim</Label>
                  <Input
                    type="month"
                    value={experience.endDate}
                    onChange={(e) => updateExperience(experience.id, "endDate", e.target.value)}
                    disabled={experience.current}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`current-${experience.id}`}
                  checked={experience.current}
                  onChange={(e) => updateExperience(experience.id, "current", e.target.checked)}
                />
                <Label htmlFor={`current-${experience.id}`}>Trabalho atual</Label>
              </div>
              <div>
                <Label>Descrição</Label>
                <Textarea
                  rows={3}
                  value={experience.description}
                  onChange={(e) => updateExperience(experience.id, "description", e.target.value)}
                />
              </div>
            </div>
          ))}
          <Button onClick={addExperience} variant="outline" className="w-full bg-transparent">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Experiência
          </Button>
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Formação Acadêmica
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {curriculum.education.map((education, index) => (
            <div key={education.id} className="p-4 border rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Formação {index + 1}</h4>
                <Button variant="ghost" size="sm" onClick={() => removeEducation(education.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Instituição</Label>
                  <Input
                    value={education.institution}
                    onChange={(e) => updateEducation(education.id, "institution", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Grau</Label>
                  <Input
                    value={education.degree}
                    onChange={(e) => updateEducation(education.id, "degree", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Área de Estudo</Label>
                  <Input
                    value={education.field}
                    onChange={(e) => updateEducation(education.id, "field", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Data de Início</Label>
                  <Input
                    type="month"
                    value={education.startDate}
                    onChange={(e) => updateEducation(education.id, "startDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Data de Conclusão</Label>
                  <Input
                    type="month"
                    value={education.endDate}
                    onChange={(e) => updateEducation(education.id, "endDate", e.target.value)}
                    disabled={education.current}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`current-edu-${education.id}`}
                  checked={education.current}
                  onChange={(e) => updateEducation(education.id, "current", e.target.checked)}
                />
                <Label htmlFor={`current-edu-${education.id}`}>Em andamento</Label>
              </div>
            </div>
          ))}
          <Button onClick={addEducation} variant="outline" className="w-full bg-transparent">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Formação
          </Button>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Habilidades</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Digite uma habilidade"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addSkill()}
            />
            <Button onClick={addSkill}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {curriculum.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                {skill}
                <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill(skill)} />
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Languages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Idiomas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Ex: Inglês (Avançado)"
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addLanguage()}
            />
            <Button onClick={addLanguage}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {curriculum.languages.map((language) => (
              <Badge key={language} variant="secondary" className="flex items-center gap-1">
                {language}
                <X className="h-3 w-3 cursor-pointer" onClick={() => removeLanguage(language)} />
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          Salvar Currículo
        </Button>
      </div>
    </div>
  )
}
