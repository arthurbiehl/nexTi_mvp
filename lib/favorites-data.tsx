export interface FavoriteCandidate {
  id: string
  companyId: string
  curriculumId: string
  addedAt: string
  notes?: string
  tags: string[]
}

// Mock favorites data
const mockFavorites: FavoriteCandidate[] = [
  {
    id: "1",
    companyId: "2",
    curriculumId: "1",
    addedAt: "2024-01-20",
    notes: "Excelente perfil para vaga de React Developer",
    tags: ["React", "Frontend", "Senior"],
  },
]

export function getFavoritesByCompany(companyId: string): FavoriteCandidate[] {
  return mockFavorites.filter((fav) => fav.companyId === companyId)
}

export function addToFavorites(companyId: string, curriculumId: string, notes?: string, tags: string[] = []): boolean {
  const existing = mockFavorites.find((fav) => fav.companyId === companyId && fav.curriculumId === curriculumId)
  if (existing) return false

  mockFavorites.push({
    id: Date.now().toString(),
    companyId,
    curriculumId,
    addedAt: new Date().toISOString().split("T")[0],
    notes,
    tags,
  })

  return true
}

export function removeFromFavorites(companyId: string, curriculumId: string): boolean {
  const index = mockFavorites.findIndex((fav) => fav.companyId === companyId && fav.curriculumId === curriculumId)
  if (index >= 0) {
    mockFavorites.splice(index, 1)
    return true
  }
  return false
}

export function isFavorite(companyId: string, curriculumId: string): boolean {
  return mockFavorites.some((fav) => fav.companyId === companyId && fav.curriculumId === curriculumId)
}
