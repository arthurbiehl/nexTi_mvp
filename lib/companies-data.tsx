export interface CompanyRequirement {
  id: string
  title: string
  department: string
  level: "Junior" | "Pleno" | "Senior" | "Especialista"
  skills: string[]
  description: string
  location: string
  type: "CLT" | "PJ" | "Freelancer" | "Estágio"
  salary?: string
  postedAt: Date
}

export interface Company {
  id: string
  name: string
  logo: string
  description: string
  website: string
  industry: string
  size: string
  location: string
  requirements: CompanyRequirement[]
  isActive: boolean
}

export const mockCompanies: Company[] = [
  {
    id: "1",
    name: "TechCorp Solutions",
    logo: "/abstract-tech-logo.png",
    description:
      "Empresa líder em soluções tecnológicas para o mercado financeiro, focada em inovação e transformação digital.",
    website: "https://techcorp.com.br",
    industry: "Tecnologia",
    size: "200-500 funcionários",
    location: "São Paulo, SP",
    isActive: true,
    requirements: [
      {
        id: "1",
        title: "Desenvolvedor React Senior",
        department: "Tecnologia",
        level: "Senior",
        skills: ["React", "TypeScript", "Node.js", "AWS"],
        description: "Buscamos desenvolvedor experiente para liderar projetos de frontend em nossa equipe de produtos.",
        location: "São Paulo, SP - Híbrido",
        type: "CLT",
        salary: "R$ 12.000 - R$ 18.000",
        postedAt: new Date("2024-01-15"),
      },
      {
        id: "2",
        title: "UX/UI Designer Pleno",
        department: "Design",
        level: "Pleno",
        skills: ["Figma", "Adobe XD", "Prototipagem", "Design System"],
        description: "Designer para criar experiências incríveis em nossos produtos financeiros.",
        location: "São Paulo, SP - Remoto",
        type: "CLT",
        salary: "R$ 8.000 - R$ 12.000",
        postedAt: new Date("2024-01-10"),
      },
    ],
  },
  {
    id: "2",
    name: "InnovateHub",
    logo: "/placeholder-sqbgu.png",
    description:
      "Startup focada em inteligência artificial e machine learning para automação de processos empresariais.",
    website: "https://innovatehub.ai",
    industry: "Inteligência Artificial",
    size: "50-100 funcionários",
    location: "Rio de Janeiro, RJ",
    isActive: true,
    requirements: [
      {
        id: "3",
        title: "Cientista de Dados",
        department: "Data Science",
        level: "Pleno",
        skills: ["Python", "Machine Learning", "TensorFlow", "SQL"],
        description: "Profissional para desenvolver modelos de ML e análises avançadas de dados.",
        location: "Rio de Janeiro, RJ - Remoto",
        type: "CLT",
        salary: "R$ 10.000 - R$ 15.000",
        postedAt: new Date("2024-01-12"),
      },
      {
        id: "4",
        title: "Engenheiro de Software Junior",
        department: "Engenharia",
        level: "Junior",
        skills: ["Python", "Django", "PostgreSQL", "Docker"],
        description: "Oportunidade para desenvolvedor iniciante crescer em ambiente de alta tecnologia.",
        location: "Rio de Janeiro, RJ - Presencial",
        type: "CLT",
        salary: "R$ 5.000 - R$ 8.000",
        postedAt: new Date("2024-01-08"),
      },
    ],
  },
  {
    id: "3",
    name: "Digital Marketing Pro",
    logo: "/marketing-agency-logo.png",
    description:
      "Agência de marketing digital especializada em e-commerce e performance marketing para grandes marcas.",
    website: "https://digitalmarketingpro.com.br",
    industry: "Marketing Digital",
    size: "100-200 funcionários",
    location: "Belo Horizonte, MG",
    isActive: true,
    requirements: [
      {
        id: "5",
        title: "Especialista em Google Ads",
        department: "Performance",
        level: "Especialista",
        skills: ["Google Ads", "Facebook Ads", "Analytics", "Data Studio"],
        description: "Especialista para gerenciar campanhas de grandes clientes e otimizar performance.",
        location: "Belo Horizonte, MG - Híbrido",
        type: "CLT",
        salary: "R$ 8.000 - R$ 14.000",
        postedAt: new Date("2024-01-14"),
      },
      {
        id: "6",
        title: "Social Media Manager",
        department: "Criativo",
        level: "Pleno",
        skills: ["Instagram", "TikTok", "Canva", "Copywriting"],
        description: "Gerenciar redes sociais de clientes e criar estratégias de conteúdo.",
        location: "Belo Horizonte, MG - Presencial",
        type: "CLT",
        salary: "R$ 4.500 - R$ 7.000",
        postedAt: new Date("2024-01-11"),
      },
    ],
  },
  {
    id: "4",
    name: "HealthTech Brasil",
    logo: "/healthcare-tech-logo.png",
    description: "Empresa de tecnologia para saúde, desenvolvendo soluções para hospitais e clínicas em todo o Brasil.",
    website: "https://healthtechbrasil.com.br",
    industry: "Saúde e Tecnologia",
    size: "300-500 funcionários",
    location: "Curitiba, PR",
    isActive: true,
    requirements: [
      {
        id: "7",
        title: "Desenvolvedor Mobile Flutter",
        department: "Mobile",
        level: "Pleno",
        skills: ["Flutter", "Dart", "Firebase", "REST APIs"],
        description: "Desenvolver aplicativos mobile para pacientes e profissionais de saúde.",
        location: "Curitiba, PR - Híbrido",
        type: "CLT",
        salary: "R$ 9.000 - R$ 13.000",
        postedAt: new Date("2024-01-13"),
      },
      {
        id: "8",
        title: "Product Manager",
        department: "Produto",
        level: "Senior",
        skills: ["Product Management", "Scrum", "Analytics", "UX Research"],
        description: "Liderar produtos digitais que impactam a vida de milhares de pacientes.",
        location: "Curitiba, PR - Remoto",
        type: "CLT",
        salary: "R$ 15.000 - R$ 22.000",
        postedAt: new Date("2024-01-09"),
      },
    ],
  },
  {
    id: "5",
    name: "EcoSustentável",
    logo: "/placeholder-secdl.png",
    description: "Consultoria em sustentabilidade empresarial, ajudando empresas a implementar práticas ESG.",
    website: "https://ecosustentavel.com.br",
    industry: "Sustentabilidade",
    size: "20-50 funcionários",
    location: "Florianópolis, SC",
    isActive: true,
    requirements: [
      {
        id: "9",
        title: "Consultor ESG Junior",
        department: "Consultoria",
        level: "Junior",
        skills: ["ESG", "Relatórios de Sustentabilidade", "Excel", "PowerBI"],
        description: "Apoiar empresas na implementação de práticas sustentáveis e relatórios ESG.",
        location: "Florianópolis, SC - Híbrido",
        type: "CLT",
        salary: "R$ 4.000 - R$ 6.500",
        postedAt: new Date("2024-01-16"),
      },
    ],
  },
]

export function getActiveCompanies(): Company[] {
  return mockCompanies.filter((company) => company.isActive)
}

export function getCompanyById(id: string): Company | undefined {
  return mockCompanies.find((company) => company.id === id)
}

export function getAllRequirements(): CompanyRequirement[] {
  return mockCompanies.flatMap((company) =>
    company.requirements.map((req) => ({ ...req, companyName: company.name, companyId: company.id })),
  )
}
