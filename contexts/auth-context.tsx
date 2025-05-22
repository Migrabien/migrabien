"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  nombre: string
  email: string
  password?: string
  paisOrigen: string
  paisDestino: string
  motivoMigracion: string
  nivelEducativo?: string
  experienciaLaboral?: string
  estadoDocumentos?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (userData: any) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Verificar si el usuario está autenticado al cargar la página
  useEffect(() => {
    const storedUser = localStorage.getItem("migrabien_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Función de login simulada
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulamos una verificación de credenciales
    // En una implementación real, esto sería una llamada a una API
    return new Promise((resolve) => {
      setTimeout(() => {
        // Verificamos si hay un usuario registrado con este email
        const storedUsers = localStorage.getItem("migrabien_users")
        const users = storedUsers ? JSON.parse(storedUsers) : []

        const foundUser = users.find((u: any) => u.email === email)

        if (foundUser && password === "password") {
          // En una app real, verificaríamos el hash de la contraseña
          setUser(foundUser)
          localStorage.setItem("migrabien_user", JSON.stringify(foundUser))
          setIsLoading(false)
          resolve(true)
        } else {
          setIsLoading(false)
          resolve(false)
        }
      }, 1000)
    })
  }

  // Función de registro simulada
  const register = async (userData: any): Promise<boolean> => {
    setIsLoading(true)

    return new Promise((resolve) => {
      setTimeout(() => {
        // Generamos un ID único
        const newUser = {
          ...userData,
          id: Date.now().toString(),
        }

        // Guardamos el usuario en localStorage (simulando una base de datos)
        const storedUsers = localStorage.getItem("migrabien_users")
        const users = storedUsers ? JSON.parse(storedUsers) : []
        users.push(newUser)
        localStorage.setItem("migrabien_users", JSON.stringify(users))

        // Autenticamos al usuario
        setUser(newUser)
        localStorage.setItem("migrabien_user", JSON.stringify(newUser))

        setIsLoading(false)
        resolve(true)
      }, 1000)
    })
  }

  // Función de logout
  const logout = () => {
    setUser(null)
    localStorage.removeItem("migrabien_user")
    router.push("/")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}
