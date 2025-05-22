"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  sendEmailVerification,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

type User = {
  id: string
  nombre: string
  email: string
  emailVerified?: boolean
  paisOrigen: string
  paisDestino: string
  motivoMigracion: string
  nivelEducativo?: string
  experienciaLaboral?: string
  estadoDocumentos?: string
  photoURL?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  loginWithGoogle: () => Promise<boolean>
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
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true)
      if (firebaseUser) {
        // Usuario autenticado, obtener datos adicionales de Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              id: firebaseUser.uid,
              nombre: userData.nombre || firebaseUser.displayName || '',
              email: firebaseUser.email || '',
              emailVerified: firebaseUser.emailVerified,
              photoURL: firebaseUser.photoURL || undefined,
              paisOrigen: userData.paisOrigen || '',
              paisDestino: userData.paisDestino || '',
              motivoMigracion: userData.motivoMigracion || '',
              nivelEducativo: userData.nivelEducativo,
              experienciaLaboral: userData.experienciaLaboral,
              estadoDocumentos: userData.estadoDocumentos
            });
          } else {
            // Solo tenemos la información básica de Firebase Auth
            setUser({
              id: firebaseUser.uid,
              nombre: firebaseUser.displayName || '',
              email: firebaseUser.email || '',
              emailVerified: firebaseUser.emailVerified,
              photoURL: firebaseUser.photoURL || undefined,
              paisOrigen: '',
              paisDestino: '',
              motivoMigracion: ''
            });
          }
        } catch (error) {
          console.error("Error al obtener datos de usuario:", error);
        }
      } else {
        // Usuario no autenticado
        setUser(null);
      }
      setIsLoading(false);
    });

    // Limpiar la suscripción cuando se desmonte el componente
    return () => unsubscribe();
  }, [])

  // Función de login con Firebase
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      // El estado del usuario se actualizará automáticamente a través del listener onAuthStateChanged
      return true
    } catch (error) {
      console.error("Error al iniciar sesión:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Función de registro con Firebase
  const register = async (userData: any): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Crear usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        userData.email, 
        userData.password
      )
      
      const firebaseUser = userCredential.user
      
      // Actualizar el perfil con el nombre del usuario
      await updateProfile(firebaseUser, {
        displayName: userData.nombre
      })
      
      // Enviar email de verificación
      await sendEmailVerification(firebaseUser)
      
      // Guardar datos adicionales en Firestore
      const userDataForFirestore = {
        nombre: userData.nombre,
        email: userData.email,
        paisOrigen: userData.paisOrigen,
        paisDestino: userData.paisDestino,
        motivoMigracion: userData.motivoMigracion,
        nivelEducativo: userData.nivelEducativo,
        experienciaLaboral: userData.experienciaLaboral,
        estadoDocumentos: userData.estadoDocumentos,
        createdAt: new Date().toISOString()
      }
      
      await setDoc(doc(db, "users", firebaseUser.uid), userDataForFirestore)
      
      return true
    } catch (error) {
      console.error("Error al registrar usuario:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Función de logout con Firebase
  const logout = async () => {
    try {
      await signOut(auth)
      router.push("/")
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    }
  }

  // Función de inicio de sesión con Google
  const loginWithGoogle = async (): Promise<boolean> => {
    setIsLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      
      // El estado del usuario se actualizará automáticamente a través del listener onAuthStateChanged
      // Verificar si es la primera vez que el usuario inicia sesión con Google
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid))
      
      if (!userDoc.exists()) {
        // Es un nuevo usuario, guardar datos básicos en Firestore
        const userDataForFirestore = {
          nombre: userCredential.user.displayName || '',
          email: userCredential.user.email || '',
          paisOrigen: '',
          paisDestino: 'espana', // Valor predeterminado
          motivoMigracion: '',
          createdAt: new Date().toISOString(),
          authProvider: 'google'
        }
        
        await setDoc(doc(db, "users", userCredential.user.uid), userDataForFirestore)
      }
      
      return true
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithGoogle,
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
