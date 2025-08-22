export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate?: string
  description: string
  current: boolean
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate?: string
  current: boolean
}

export interface Curriculum {
  id: string
  userId: string
  personalInfo: {
    fullName: string
    email: string
    phone: string
    location: string
    summary: string
    linkedIn?: string
    github?: string
    portfolio?: string
  }
  experiences: Experience[]
  education: Education[]
  skills: string[]
  languages: string[]
  createdAt: string
  updatedAt: string
}

// Mock curriculum data
export const mockCurriculums: Curriculum[] = [
  {
    id: "1",
    userId: "1",
    personalInfo: {
      fullName: "João Silva",
      email: "joao@email.com",
      phone: "(11) 99999-9999",
      location: "São Paulo, SP",
      summary:
        "Desenvolvedor Full Stack com 5 anos de experiência em React, Node.js e Python. Apaixonado por criar soluções inovadoras e trabalhar em equipe.",
      linkedIn: "https://linkedin.com/in/joaosilva",
      github: "https://github.com/joaosilva",
      portfolio: "https://joaosilva.dev",
    },
    experiences: [
      {
        id: "1",
        company: "Tech Solutions",
        position: "Desenvolvedor Full Stack Sênior",
        startDate: "2022-01",
        description:
          "Desenvolvimento de aplicações web usando React, Node.js e PostgreSQL. Liderança técnica de equipe de 3 desenvolvedores.",
        current: true,
      },
      {
        id: "2",
        company: "StartupXYZ",
        position: "Desenvolvedor Frontend",
        startDate: "2020-03",
        endDate: "2021-12",
        description: "Criação de interfaces responsivas com React e TypeScript. Implementação de testes automatizados.",
        current: false,
      },
    ],
    education: [
      {
        id: "1",
        institution: "Universidade de São Paulo",
        degree: "Bacharelado",
        field: "Ciência da Computação",
        startDate: "2016-02",
        endDate: "2019-12",
        current: false,
      },
    ],
    skills: ["React", "Node.js", "TypeScript", "Python", "PostgreSQL", "MongoDB", "AWS", "Docker"],
    languages: ["Português (Nativo)", "Inglês (Avançado)", "Espanhol (Intermediário)"],
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
  },
  {
    id: "2",
    userId: "3",
    personalInfo: {
      fullName: "Maria Santos",
      email: "maria@email.com",
      phone: "(11) 88888-8888",
      location: "Rio de Janeiro, RJ",
      summary: "Designer UX/UI com 3 anos de experiência criando interfaces intuitivas e centradas no usuário.",
      linkedIn: "https://linkedin.com/in/mariasantos",
      portfolio: "https://mariasantos.design",
    },
    experiences: [
      {
        id: "1",
        company: "Design Studio",
        position: "UX/UI Designer",
        startDate: "2021-06",
        description: "Design de interfaces para aplicações web e mobile. Pesquisa de usuário e prototipagem.",
        current: true,
      },
    ],
    education: [
      {
        id: "1",
        institution: "PUC-Rio",
        degree: "Bacharelado",
        field: "Design",
        startDate: "2017-02",
        endDate: "2020-12",
        current: false,
      },
    ],
    skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research", "Usability Testing"],
    languages: ["Português (Nativo)", "Inglês (Intermediário)"],
    createdAt: "2024-01-10",
    updatedAt: "2024-01-18",
  },
]

export function getCurriculumByUserId(userId: string): Curriculum | undefined {
  return mockCurriculums.find((curriculum) => curriculum.userId === userId)
}

export function getAllCurriculums(): Curriculum[] {
  return mockCurriculums
}

export function saveCurriculum(curriculum: Curriculum): void {
  const existingIndex = mockCurriculums.findIndex((c) => c.id === curriculum.id)
  if (existingIndex >= 0) {
    mockCurriculums[existingIndex] = { ...curriculum, updatedAt: new Date().toISOString().split("T")[0] }
  } else {
    mockCurriculums.push({
      ...curriculum,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    })
  }
}
