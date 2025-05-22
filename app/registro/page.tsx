"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useAuth } from "@/contexts/auth-context"

export default function Registro() {
  const router = useRouter()
  const { toast } = useToast()
  const { register } = useAuth()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    paisOrigen: "",
    paisDestino: "espana", // España como único destino disponible
    motivoMigracion: "",
    nivelEducativo: "",
    experienciaLaboral: "",
    estadoDocumentos: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await register(formData)

      if (success) {
        toast({
          title: "Registro exitoso",
          description: "Tu cuenta ha sido creada correctamente",
        })
        router.push("/perfil")
      } else {
        toast({
          title: "Error en el registro",
          description: "No se pudo completar el registro",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al registrar tu cuenta",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tighter text-teal-700 mb-2">Crea tu cuenta en MigraBien</h1>
            <p className="text-gray-600">Completa tu perfil para recibir un plan migratorio personalizado</p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between max-w-md mx-auto">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-500"}`}
                >
                  {step > 1 ? <Check className="h-5 w-5" /> : "1"}
                </div>
                <span className="text-xs mt-1 text-gray-600">Cuenta</span>
              </div>
              <div className={`h-1 flex-1 mx-2 ${step >= 2 ? "bg-teal-600" : "bg-gray-200"}`}></div>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-500"}`}
                >
                  {step > 2 ? <Check className="h-5 w-5" /> : "2"}
                </div>
                <span className="text-xs mt-1 text-gray-600">Origen</span>
              </div>
              <div className={`h-1 flex-1 mx-2 ${step >= 3 ? "bg-teal-600" : "bg-gray-200"}`}></div>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-500"}`}
                >
                  3
                </div>
                <span className="text-xs mt-1 text-gray-600">Perfil</span>
              </div>
            </div>
          </div>

          <Card className="border-none shadow-lg">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre completo</Label>
                      <Input
                        id="nombre"
                        name="nombre"
                        placeholder="Ingresa tu nombre completo"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo electrónico</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="tu@correo.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Contraseña</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Crea una contraseña segura"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <p className="text-xs text-gray-500">
                        Mínimo 8 caracteres, incluyendo una letra mayúscula y un número
                      </p>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="paisOrigen">País de origen</Label>
                      <Select
                        value={formData.paisOrigen}
                        onValueChange={(value) => handleSelectChange("paisOrigen", value)}
                      >
                        <SelectTrigger id="paisOrigen">
                          <SelectValue placeholder="Selecciona tu país de origen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="argentina">Argentina</SelectItem>
                          <SelectItem value="bolivia">Bolivia</SelectItem>
                          <SelectItem value="chile">Chile</SelectItem>
                          <SelectItem value="colombia">Colombia</SelectItem>
                          <SelectItem value="ecuador">Ecuador</SelectItem>
                          <SelectItem value="mexico">México</SelectItem>
                          <SelectItem value="peru">Perú</SelectItem>
                          <SelectItem value="venezuela">Venezuela</SelectItem>
                          <SelectItem value="otro">Otro país latinoamericano</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paisDestino">País de destino</Label>
                      <div className="flex items-center p-2 border rounded-md bg-teal-50 border-teal-200">
                        <span className="text-teal-700 font-medium">España</span>
                        <div className="ml-auto bg-teal-100 text-teal-700 text-xs px-2 py-1 rounded-full">Único destino disponible</div>
                      </div>
                      <input 
                        type="hidden" 
                        name="paisDestino" 
                        value="espana" 
                        onChange={() => {}} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="motivoMigracion">Motivo principal de migración</Label>
                      <Select
                        value={formData.motivoMigracion}
                        onValueChange={(value) => handleSelectChange("motivoMigracion", value)}
                      >
                        <SelectTrigger id="motivoMigracion">
                          <SelectValue placeholder="Selecciona el motivo principal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="trabajo">Trabajo</SelectItem>
                          <SelectItem value="estudios">Estudios</SelectItem>
                          <SelectItem value="reunificacion">Reunificación familiar</SelectItem>
                          <SelectItem value="asilo">Asilo o refugio</SelectItem>
                          <SelectItem value="emprendimiento">Emprendimiento</SelectItem>
                          <SelectItem value="jubilacion">Jubilación</SelectItem>
                          <SelectItem value="otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nivelEducativo">Nivel educativo</Label>
                      <Select
                        value={formData.nivelEducativo}
                        onValueChange={(value) => handleSelectChange("nivelEducativo", value)}
                      >
                        <SelectTrigger id="nivelEducativo">
                          <SelectValue placeholder="Selecciona tu nivel educativo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="secundaria">Secundaria</SelectItem>
                          <SelectItem value="tecnico">Técnico/Tecnólogo</SelectItem>
                          <SelectItem value="universitario">Universitario</SelectItem>
                          <SelectItem value="posgrado">Posgrado/Maestría</SelectItem>
                          <SelectItem value="doctorado">Doctorado</SelectItem>
                          <SelectItem value="otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experienciaLaboral">Experiencia laboral</Label>
                      <Select
                        value={formData.experienciaLaboral}
                        onValueChange={(value) => handleSelectChange("experienciaLaboral", value)}
                      >
                        <SelectTrigger id="experienciaLaboral">
                          <SelectValue placeholder="Selecciona tu experiencia laboral" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="estudiante">Estudiante</SelectItem>
                          <SelectItem value="0-2">0-2 años</SelectItem>
                          <SelectItem value="3-5">3-5 años</SelectItem>
                          <SelectItem value="6-10">6-10 años</SelectItem>
                          <SelectItem value="10+">Más de 10 años</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="estadoDocumentos">Estado de tus documentos</Label>
                      <Select
                        value={formData.estadoDocumentos}
                        onValueChange={(value) => handleSelectChange("estadoDocumentos", value)}
                      >
                        <SelectTrigger id="estadoDocumentos">
                          <SelectValue placeholder="Selecciona el estado de tus documentos" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="completos">Tengo todos los documentos necesarios</SelectItem>
                          <SelectItem value="parcial">Tengo algunos documentos</SelectItem>
                          <SelectItem value="inicio">Estoy comenzando a reunir documentos</SelectItem>
                          <SelectItem value="noSe">No sé qué documentos necesito</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  {step > 1 ? (
                    <Button type="button" variant="outline" onClick={handleBack}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Atrás
                    </Button>
                  ) : (
                    <div></div>
                  )}

                  {step < 3 ? (
                    <Button type="button" className="bg-teal-600 hover:bg-teal-700" onClick={handleNext}>
                      Siguiente <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="submit" className="bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
                      {isLoading ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Completando registro...
                        </span>
                      ) : (
                        "Completar registro"
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center border-t p-6">
              <p className="text-sm text-gray-500">
                ¿Ya tienes una cuenta?{" "}
                <Link href="/login" className="text-teal-600 hover:underline">
                  Inicia sesión
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
