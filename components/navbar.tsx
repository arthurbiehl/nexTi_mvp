"use client"

import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { User, Building2, LogOut, Settings, Heart } from "lucide-react"

export function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-primary">
          Nex<span className="text-blue-700">TI</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/empresas">
            <Button variant="ghost">Empresas</Button>
          </Link>

          {user ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>

              {user.type === "empresa" && (
                <>
                  <Link href="/curriculos">
                    <Button variant="ghost">Ver Currículos</Button>
                  </Link>
                  <Link href="/favoritos">
                    <Button variant="ghost">Favoritos</Button>
                  </Link>
                </>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        {user.type === "empresa" ? (
                          <>
                            <Building2 className="h-3 w-3" />
                            Empresa
                            {user.hasActivePlan && <span className="ml-1 text-green-600">• Premium</span>}
                          </>
                        ) : (
                          <>
                            <User className="h-3 w-3" />
                            Usuário
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/perfil">
                      <Settings className="mr-2 h-4 w-4" />
                      Perfil
                    </Link>
                  </DropdownMenuItem>
                  {user.type === "empresa" && (
                    <DropdownMenuItem asChild>
                      <Link href="/favoritos">
                        <Heart className="mr-2 h-4 w-4" />
                        Favoritos
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {user.type === "empresa" && !user.hasActivePlan && (
                    <DropdownMenuItem asChild>
                      <Link href="/planos">
                        <Building2 className="mr-2 h-4 w-4" />
                        Assinar Plano
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost">Entrar</Button>
              </Link>
              <Link href="/registro">
                <Button>Cadastrar</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
