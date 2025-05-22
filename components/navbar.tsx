"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, LogOut } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"

export default function Navbar() {
  // Asegurarse de que todas las declaraciones terminen con punto y coma
  // Revisar todas las declaraciones de variables y funciones

  // Verificar que las declaraciones de estado terminen con punto y coma
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated, user, logout } = useAuth()

  // Verificar que la función toggleMenu tenga punto y coma al final
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Verificar que los elementos de navegación terminen con punto y coma
  const navItems = [
    { name: "Inicio", href: "/" },
    { name: "Coach de Viaje", href: "/coach" },
    { name: "Checklist", href: "/checklist" },
    { name: "Servicios", href: "/servicios" },
    { name: "Sobre Nosotros", href: "/nosotros" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-teal-600">MigraBien</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-teal-600",
                pathname === item.href ? "text-teal-600" : "text-gray-600",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className="text-sm text-gray-600">
                Hola, <span className="font-medium">{user?.nombre ? user.nombre.split(" ")[0] : "Usuario"}</span>
              </div>
              <Button asChild variant="outline" className="bg-teal-50 text-teal-600 border-teal-200 hover:bg-teal-100 hover:text-teal-700">
                <Link href="/perfil">Mi Perfil</Link>
              </Button>
              <Button variant="outline" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar sesión
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="outline">
                <Link href="/login">Iniciar sesión</Link>
              </Button>
              <Button asChild className="bg-teal-600 hover:bg-teal-700">
                <Link href="/registro">Registrarse</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu} aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto flex flex-col space-y-3 py-4 px-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-teal-600 py-2",
                  pathname === item.href ? "text-teal-600" : "text-gray-600",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              {isAuthenticated ? (
                <>
                  <div className="text-sm text-gray-600 py-2">
                    Hola, <span className="font-medium">{user?.nombre ? user.nombre.split(" ")[0] : "Usuario"}</span>
                  </div>
                  <Button asChild variant="outline" className="bg-teal-50 text-teal-600 border-teal-200 hover:bg-teal-100 hover:text-teal-700 mb-2">
                    <Link href="/perfil">Mi Perfil</Link>
                  </Button>
                  <Button variant="outline" onClick={logout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar sesión
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="outline">
                    <Link href="/login">Iniciar sesión</Link>
                  </Button>
                  <Button asChild className="bg-teal-600 hover:bg-teal-700">
                    <Link href="/registro">Registrarse</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
