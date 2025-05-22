"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/components/ui/use-toast"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Acceso restringido",
        description: "Debes iniciar sesión para acceder a esta página",
        variant: "destructive",
      })
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router, toast])

  // Mientras verifica la autenticación, muestra un estado de carga
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  // Si está autenticado, muestra el contenido protegido
  return isAuthenticated ? <>{children}</> : null
}
