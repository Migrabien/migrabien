"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, MapPin, Briefcase, FileText, Calendar, ArrowRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProtectedRoute from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

export default function PerfilPage() {
  const { user } = useAuth()

  // Función para obtener el nombre del país en español
  const getPaisNombre = (paisCodigo: string) => {
    const paises: Record<string, string> = {
      argentina: "Argentina",
      bolivia: "Bolivia",
      chile: "Chile",
      colombia: "Colombia",
      ecuador: "Ecuador",
      mexico: "México",
      peru: "Perú",
      venezuela: "Venezuela",
      otro: "Otro país latinoamericano",
      alemania: "Alemania",
      espana: "España",
      francia: "Francia",
      italia: "Italia",
      portugal: "Portugal",
      reinounido: "Reino Unido",
      suecia: "Suecia",
    }
    return paises[paisCodigo] || paisCodigo
  }

  // Función para obtener el nombre del motivo de migración en español
  const getMotivoNombre = (motivoCodigo: string) => {
    const motivos: Record<string, string> = {
      trabajo: "Trabajo",
      estudios: "Estudios",
      reunificacion: "Reunificación familiar",
      asilo: "Asilo o refugio",
      emprendimiento: "Emprendimiento",
      jubilacion: "Jubilación",
      otro: "Otro",
    }
    return motivos[motivoCodigo] || motivoCodigo
  }

  // Función para obtener el nombre del nivel educativo en español
  const getNivelEducativoNombre = (nivelCodigo: string) => {
    const niveles: Record<string, string> = {
      secundaria: "Secundaria",
      tecnico: "Técnico/Tecnólogo",
      universitario: "Universitario",
      posgrado: "Posgrado/Maestría",
      doctorado: "Doctorado",
      otro: "Otro",
    }
    return niveles[nivelCodigo] || nivelCodigo
  }

  // Función para obtener el nombre de la experiencia laboral en español
  const getExperienciaNombre = (experienciaCodigo: string) => {
    const experiencias: Record<string, string> = {
      estudiante: "Estudiante",
      "0-2": "0-2 años",
      "3-5": "3-5 años",
      "6-10": "6-10 años",
      "10+": "Más de 10 años",
    }
    return experiencias[experienciaCodigo] || experienciaCodigo
  }

  // Función para obtener el nombre del estado de documentos en español
  const getEstadoDocumentosNombre = (estadoCodigo: string) => {
    const estados: Record<string, string> = {
      completos: "Tengo todos los documentos necesarios",
      parcial: "Tengo algunos documentos",
      inicio: "Estoy comenzando a reunir documentos",
      noSe: "No sé qué documentos necesito",
    }
    return estados[estadoCodigo] || estadoCodigo
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 py-6 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sidebar con información del perfil */}
              <div className="lg:col-span-1 space-y-6">
                {/* Tarjeta de perfil */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex flex-col items-center">
                      <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src="/diverse-person-avatars.png" alt="Foto de perfil" />
                        <AvatarFallback>
                          <User className="h-12 w-12" />
                        </AvatarFallback>
                      </Avatar>
                      <CardTitle className="text-xl text-center">{user?.nombre}</CardTitle>
                      <CardDescription className="text-center">{user?.email}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 mt-4">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Migración</p>
                          <p className="text-sm text-gray-500">
                            {getPaisNombre(user?.paisOrigen || "")} → {getPaisNombre(user?.paisDestino || "")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Briefcase className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Motivo</p>
                          <p className="text-sm text-gray-500">{getMotivoNombre(user?.motivoMigracion || "")}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <FileText className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Documentos</p>
                          <p className="text-sm text-gray-500">
                            {getEstadoDocumentosNombre(user?.estadoDocumentos || "")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Miembro desde</p>
                          <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button variant="outline" className="w-full">
                        Editar perfil
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Tarjeta de progreso */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-teal-700">Mi Progreso Migratorio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Documentación</span>
                          <span>30%</span>
                        </div>
                        <Progress value={30} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Trámites</span>
                          <span>15%</span>
                        </div>
                        <Progress value={15} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Preparación</span>
                          <span>45%</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>
                      <div className="text-sm text-gray-500 mt-4">
                        Progreso general: <span className="font-medium">30%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contenido principal */}
              <div className="lg:col-span-2">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl text-teal-700">Mi Panel</CardTitle>
                    <CardDescription>Gestiona tu proceso migratorio desde aquí</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="resumen" className="w-full">
                      <TabsList className="grid grid-cols-3 mb-6">
                        <TabsTrigger value="resumen">Resumen</TabsTrigger>
                        <TabsTrigger value="actividad">Actividad</TabsTrigger>
                        <TabsTrigger value="documentos">Documentos</TabsTrigger>
                      </TabsList>
                      <TabsContent value="resumen" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">Coach de Viaje</CardTitle>
                              <CardDescription>Tu asistente migratorio personal</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-gray-600 mb-4">
                                Consulta con nuestro coach inteligente para recibir orientación personalizada sobre tu
                                proceso migratorio.
                              </p>
                              <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
                                <Link href="/coach">
                                  Hablar con el Coach
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                              </Button>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">Mi Checklist</CardTitle>
                              <CardDescription>Tareas pendientes: 8</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-gray-600 mb-4">
                                Organiza y sigue el progreso de tus tareas migratorias con nuestra checklist
                                personalizada.
                              </p>
                              <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
                                <Link href="/checklist">
                                  Ver mi checklist
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                              </Button>
                            </CardContent>
                          </Card>
                        </div>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Servicios Recomendados</CardTitle>
                            <CardDescription>Basados en tu perfil y necesidades</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex items-start">
                                <div className="h-10 w-10 rounded bg-teal-100 flex items-center justify-center mr-3">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-5 w-5 text-teal-600"
                                  >
                                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                                  </svg>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Traducciones Oficiales Europa</h4>
                                  <p className="text-xs text-gray-500 mt-1">
                                    Servicio de traducción jurada para tus documentos migratorios
                                  </p>
                                  <Button variant="link" size="sm" className="h-auto p-0 mt-1 text-teal-600">
                                    Ver detalles
                                  </Button>
                                </div>
                              </div>
                              <div className="flex items-start">
                                <div className="h-10 w-10 rounded bg-teal-100 flex items-center justify-center mr-3">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-5 w-5 text-teal-600"
                                  >
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                  </svg>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">EuroSalud Seguros Internacionales</h4>
                                  <p className="text-xs text-gray-500 mt-1">
                                    Seguros médicos que cumplen con los requisitos de visado
                                  </p>
                                  <Button variant="link" size="sm" className="h-auto p-0 mt-1 text-teal-600">
                                    Ver detalles
                                  </Button>
                                </div>
                              </div>
                            </div>
                            <div className="mt-4">
                              <Button asChild variant="outline" className="w-full">
                                <Link href="/servicios">Ver todos los servicios</Link>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Próximos Pasos</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-3">
                              <li className="flex items-start">
                                <div className="h-6 w-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                  <span className="text-xs">1</span>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Completa tu checklist de documentos</p>
                                  <p className="text-xs text-gray-500 mt-0.5">
                                    Asegúrate de tener todos los documentos necesarios para tu proceso
                                  </p>
                                </div>
                              </li>
                              <li className="flex items-start">
                                <div className="h-6 w-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                  <span className="text-xs">2</span>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Consulta con el Coach de Viaje</p>
                                  <p className="text-xs text-gray-500 mt-0.5">
                                    Obtén un plan personalizado para tu proceso migratorio
                                  </p>
                                </div>
                              </li>
                              <li className="flex items-start">
                                <div className="h-6 w-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                  <span className="text-xs">3</span>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Explora servicios verificados</p>
                                  <p className="text-xs text-gray-500 mt-0.5">
                                    Conecta con proveedores confiables para facilitar tu migración
                                  </p>
                                </div>
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      <TabsContent value="actividad">
                        <div className="space-y-4">
                          <p className="text-gray-500 text-sm">Historial de actividad reciente</p>
                          <div className="space-y-4">
                            <div className="border-l-2 border-teal-200 pl-4 pb-4">
                              <p className="text-sm font-medium">Registro completado</p>
                              <p className="text-xs text-gray-500">Hoy</p>
                            </div>
                            <div className="border-l-2 border-gray-200 pl-4">
                              <p className="text-sm text-gray-500">No hay más actividad para mostrar</p>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="documentos">
                        <div className="space-y-4">
                          <p className="text-gray-500 text-sm">Documentos guardados</p>
                          <div className="text-center py-8">
                            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                              <FileText className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-1">No hay documentos</h3>
                            <p className="text-gray-500 max-w-md mx-auto mb-4">
                              Aún no has subido ningún documento. Puedes subir tus documentos importantes para tenerlos
                              organizados.
                            </p>
                            <Button className="bg-teal-600 hover:bg-teal-700">Subir documento</Button>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
