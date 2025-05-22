"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Send, User, Bot, ArrowRight, FileText, MapPin, Check, Lock } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

// Definimos los tipos para los mensajes
type MessageType = "user" | "bot"

interface Message {
  id: string
  type: MessageType
  content: string
  timestamp: Date
}

// Asegurarse de que todas las declaraciones de objetos terminen con punto y coma
// Revisar todas las declaraciones de objetos y arrays

// Mensajes iniciales para el coach
const initialMessages: Message[] = [
  {
    id: "1",
    type: "bot",
    content:
      "¡Hola! Soy tu Coach de Viaje en MigraBien. Estoy aquí para ayudarte a planificar tu proceso migratorio de Latinoamérica a Europa. ¿En qué puedo ayudarte hoy?",
    timestamp: new Date(),
  },
  {
    id: "2",
    type: "bot",
    content:
      "Puedes preguntarme sobre requisitos de visado, documentación necesaria, pasos para migrar a un país específico, o cualquier duda que tengas sobre tu proceso migratorio.",
    timestamp: new Date(),
  },
]

export default function CoachPage() {
  // Asegurarse de que todas las declaraciones terminen con punto y coma
  // Revisar todas las declaraciones de variables y funciones

  // Verificar que las declaraciones de estado terminen con punto y coma
  const { isAuthenticated } = useAuth()
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState("chat")

  // Verificar que la función simulateCoachResponse tenga punto y coma al final
  const simulateCoachResponse = (userMessage: string) => {
    setIsLoading(true)

    // Simulamos un tiempo de respuesta
    setTimeout(() => {
      let responseContent = ""

      // Respuestas simuladas basadas en palabras clave
      if (userMessage.toLowerCase().includes("visa") || userMessage.toLowerCase().includes("visado")) {
        responseContent =
          "Para obtener información sobre visados, necesito saber a qué país europeo planeas migrar. Cada país tiene requisitos específicos. ¿Podrías indicarme el país de destino?"
      } else if (userMessage.toLowerCase().includes("españa") || userMessage.toLowerCase().includes("spain")) {
        responseContent =
          "Para migrar a España, generalmente necesitarás:\n\n1. Pasaporte vigente\n2. Visado según tu propósito (trabajo, estudios, etc.)\n3. Seguro médico\n4. Prueba de solvencia económica\n5. Antecedentes penales apostillados\n\n¿Tienes alguna pregunta específica sobre alguno de estos requisitos?"
      } else if (userMessage.toLowerCase().includes("trabajo") || userMessage.toLowerCase().includes("empleo")) {
        responseContent =
          "Para migrar por motivos laborales, generalmente necesitarás:\n\n1. Una oferta de trabajo de una empresa en el país de destino\n2. Que la empresa solicite un permiso de trabajo para ti\n3. Homologación de tus títulos académicos\n\n¿Ya cuentas con una oferta laboral o estás en la fase de búsqueda?"
      } else if (userMessage.toLowerCase().includes("estudios") || userMessage.toLowerCase().includes("universidad")) {
        responseContent =
          "Para migrar por estudios, necesitarás:\n\n1. Carta de aceptación de la institución educativa\n2. Seguro médico internacional\n3. Prueba de solvencia económica para mantenerte durante tus estudios\n4. Visado de estudiante\n\n¿Ya has sido aceptado en alguna institución?"
      } else {
        responseContent =
          "Gracias por tu mensaje. Para poder ayudarte mejor, ¿podrías darme más detalles sobre tu situación? Por ejemplo:\n\n- ¿A qué país europeo planeas migrar?\n- ¿Cuál es tu motivo principal (trabajo, estudios, reunificación familiar)?\n- ¿En qué etapa del proceso te encuentras?"
      }

      const newMessage: Message = {
        id: Date.now().toString(),
        type: "bot",
        content: responseContent,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, newMessage])
      setIsLoading(false)
    }, 1500)
  }

  // Verificar que la función handleSendMessage tenga punto y coma al final
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (input.trim() === "") return

    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInput("")

    // Simulamos la respuesta del coach
    simulateCoachResponse(input)
  }

  // Scroll automático al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Si el usuario no está autenticado, mostrar una vista previa con invitación a registrarse
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 py-12 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-teal-700 mb-4">
                Tu Coach de Viaje Personal
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Obtén respuestas personalizadas a todas tus dudas sobre el proceso migratorio
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
              <div className="order-2 lg:order-1">
                <Card className="border-2 border-teal-100 shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl text-teal-700">¿Qué puede hacer el Coach por ti?</CardTitle>
                    <CardDescription>Tu asistente migratorio inteligente</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <Check className="h-4 w-4 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Respuestas personalizadas</h3>
                        <p className="text-sm text-gray-500">
                          Obtén información específica según tu país de origen, destino y situación personal
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <Check className="h-4 w-4 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Guía paso a paso</h3>
                        <p className="text-sm text-gray-500">
                          Recibe orientación detallada sobre cada etapa de tu proceso migratorio
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <Check className="h-4 w-4 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Roadmap personalizado</h3>
                        <p className="text-sm text-gray-500">
                          Obtén un plan migratorio adaptado a tus necesidades y objetivos
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <Check className="h-4 w-4 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Disponible 24/7</h3>
                        <p className="text-sm text-gray-500">Consulta en cualquier momento y desde cualquier lugar</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="order-1 lg:order-2">
                <Card className="border shadow-md">
                  <CardContent className="p-0 overflow-hidden">
                    <div className="bg-gray-100 p-4 border-b">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10 bg-teal-100">
                          <AvatarImage src="/robot-assistant-icon.png" alt="Coach AI" />
                          <AvatarFallback className="bg-teal-100 text-teal-700">
                            <Bot className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">Coach de Viaje</h3>
                          <p className="text-xs text-gray-500">En línea</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 space-y-4 h-64 overflow-y-auto bg-white">
                      <div className="flex justify-start">
                        <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-800">
                          <div>¡Hola! Soy tu Coach de Viaje en MigraBien. ¿En qué puedo ayudarte hoy?</div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="max-w-[80%] rounded-lg p-3 bg-teal-600 text-white">
                          <div>Hola, quiero migrar a España. ¿Qué documentos necesito?</div>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-800">
                          <div>
                            Para migrar a España, generalmente necesitarás:
                            <br />
                            <br />
                            1. Pasaporte vigente
                            <br />
                            2. Visado según tu propósito (trabajo, estudios, etc.)
                            <br />
                            3. Seguro médico
                            <br />
                            4. Prueba de solvencia económica
                            <br />
                            5. Antecedentes penales apostillados
                            <br />
                            <br />
                            <span className="text-teal-600 font-medium">
                              Regístrate para obtener información personalizada...
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-t bg-white relative">
                      <div className="absolute inset-0 bg-gray-100/80 backdrop-blur-sm flex flex-col items-center justify-center">
                        <Lock className="h-8 w-8 text-teal-600 mb-2" />
                        <p className="text-center text-gray-700 font-medium mb-4">
                          Regístrate para desbloquear el Coach de Viaje
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Input placeholder="Escribe tu mensaje aquí..." className="flex-1" disabled />
                        <Button size="icon" disabled className="bg-teal-600">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="bg-teal-50 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-teal-700 mb-4">
                ¡Desbloquea todas las funcionalidades del Coach de Viaje!
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Regístrate gratis para acceder a respuestas personalizadas, crear tu roadmap migratorio y recibir
                recomendaciones adaptadas a tu situación específica.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700">
                  <Link href="/registro">
                    Crear cuenta gratuita
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/login">Ya tengo una cuenta</Link>
                </Button>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-teal-700">Preguntas frecuentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    El Coach puede responder preguntas sobre requisitos de visado, documentación necesaria, costos de
                    vida, y mucho más.
                  </p>
                  <Button variant="link" className="p-0 h-auto text-teal-600">
                    Ver preguntas populares
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-teal-700">Historias de éxito</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Conoce cómo el Coach de Viaje ha ayudado a otros migrantes latinoamericanos a cumplir su sueño de
                    vivir en Europa.
                  </p>
                  <Button variant="link" className="p-0 h-auto text-teal-600">
                    Leer testimonios
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-teal-700">Recursos gratuitos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Accede a guías básicas, artículos informativos y recursos para comenzar tu proceso migratorio.
                  </p>
                  <Button variant="link" className="p-0 h-auto text-teal-600">
                    Explorar recursos
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Si el usuario está autenticado, mostrar la interfaz completa del Coach
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-6 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sidebar con información y opciones */}
            <div className="lg:col-span-1">
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <Avatar className="h-12 w-12 bg-teal-100">
                      <AvatarImage src="/robot-assistant-icon.png" alt="Coach AI" />
                      <AvatarFallback className="bg-teal-100 text-teal-700">
                        <Bot className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-xl font-bold text-teal-700">Coach de Viaje</h2>
                      <p className="text-sm text-gray-500">Tu asistente migratorio personal</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-teal-50 p-4 rounded-lg">
                      <h3 className="font-medium text-teal-700 mb-2">¿Qué puedo preguntarle?</h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start">
                          <ArrowRight className="h-4 w-4 text-teal-600 mr-2 mt-0.5" />
                          <span>Requisitos de visado para tu país de destino</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="h-4 w-4 text-teal-600 mr-2 mt-0.5" />
                          <span>Documentos necesarios según tu situación</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="h-4 w-4 text-teal-600 mr-2 mt-0.5" />
                          <span>Pasos para homologar títulos académicos</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="h-4 w-4 text-teal-600 mr-2 mt-0.5" />
                          <span>Opciones de vivienda y costos de vida</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="h-4 w-4 text-teal-600 mr-2 mt-0.5" />
                          <span>Consejos para adaptarte a tu nuevo país</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">Acciones rápidas</h3>
                      <div className="grid grid-cols-1 gap-2">
                        <Button variant="outline" className="justify-start">
                          <FileText className="h-4 w-4 mr-2" />
                          Ver mi checklist migratoria
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <MapPin className="h-4 w-4 mr-2" />
                          Explorar servicios en mi destino
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <User className="h-4 w-4 mr-2" />
                          Actualizar mi perfil
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chat principal */}
            <div className="lg:col-span-2">
              <Card className="h-full flex flex-col">
                <Tabs
                  defaultValue="chat"
                  className="flex-1 flex flex-col"
                  value={activeTab}
                  onValueChange={setActiveTab}
                >
                  <div className="border-b px-6 py-3">
                    <TabsList className="grid grid-cols-2">
                      <TabsTrigger value="chat">Chat</TabsTrigger>
                      <TabsTrigger value="roadmap">Mi Roadmap</TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="chat" className="flex-1 flex flex-col p-0 m-0">
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-4 ${
                              message.type === "user" ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            <div className="whitespace-pre-line">{message.content}</div>
                            <div
                              className={`text-xs mt-1 ${message.type === "user" ? "text-teal-100" : "text-gray-500"}`}
                            >
                              {message.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="max-w-[80%] rounded-lg p-4 bg-gray-100 text-gray-800">
                            <div className="flex space-x-2">
                              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                              <div
                                className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                              <div
                                className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                                style={{ animationDelay: "0.4s" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                    <div className="p-4 border-t">
                      <form onSubmit={handleSendMessage} className="flex space-x-2">
                        <Input
                          placeholder="Escribe tu mensaje aquí..."
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          className="flex-1"
                          disabled={isLoading}
                        />
                        <Button
                          type="submit"
                          size="icon"
                          disabled={isLoading || input.trim() === ""}
                          className="bg-teal-600 hover:bg-teal-700"
                        >
                          <Send className="h-4 w-4" />
                          <span className="sr-only">Enviar mensaje</span>
                        </Button>
                      </form>
                    </div>
                  </TabsContent>

                  <TabsContent value="roadmap" className="flex-1 overflow-y-auto p-6 m-0">
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-teal-700">Tu Roadmap Migratorio</h2>
                        <p className="text-gray-600">
                          Este es tu plan personalizado basado en tu perfil y conversaciones con el Coach
                        </p>
                      </div>

                      <div className="space-y-8">
                        {/* Fase 1 */}
                        <div className="relative pl-8 pb-8 border-l-2 border-teal-200">
                          <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-teal-600"></div>
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-teal-700 mb-2">Fase 1: Preparación Inicial</h3>
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <div className="h-6 w-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                  <Check className="h-3 w-3" />
                                </div>
                                <span>Obtener pasaporte vigente</span>
                              </li>
                              <li className="flex items-start">
                                <div className="h-6 w-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                  <Check className="h-3 w-3" />
                                </div>
                                <span>Investigar requisitos específicos del país de destino</span>
                              </li>
                              <li className="flex items-start">
                                <div className="h-6 w-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                  <span className="text-xs">3</span>
                                </div>
                                <span>Verificar si necesitas apostillar documentos</span>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* Fase 2 */}
                        <div className="relative pl-8 pb-8 border-l-2 border-teal-200">
                          <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-teal-400"></div>
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-teal-700 mb-2">Fase 2: Documentación</h3>
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <div className="h-6 w-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                  <span className="text-xs">1</span>
                                </div>
                                <span>Solicitar certificado de antecedentes penales</span>
                              </li>
                              <li className="flex items-start">
                                <div className="h-6 w-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                  <span className="text-xs">2</span>
                                </div>
                                <span>Apostillar documentos académicos</span>
                              </li>
                              <li className="flex items-start">
                                <div className="h-6 w-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                  <span className="text-xs">3</span>
                                </div>
                                <span>Obtener seguro médico internacional</span>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* Fase 3 */}
                        <div className="relative pl-8 pb-8 border-l-2 border-teal-200">
                          <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-gray-300"></div>
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-teal-700 mb-2">Fase 3: Solicitud de Visado</h3>
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <div className="h-6 w-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                  <span className="text-xs">1</span>
                                </div>
                                <span>Agendar cita en el consulado</span>
                              </li>
                              <li className="flex items-start">
                                <div className="h-6 w-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                  <span className="text-xs">2</span>
                                </div>
                                <span>Preparar documentación para la entrevista</span>
                              </li>
                              <li className="flex items-start">
                                <div className="h-6 w-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                  <span className="text-xs">3</span>
                                </div>
                                <span>Demostrar solvencia económica</span>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* Fase 4 */}
                        <div className="relative pl-8">
                          <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-gray-300"></div>
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-teal-700 mb-2">Fase 4: Preparación para el Viaje</h3>
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <div className="h-6 w-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                  <span className="text-xs">1</span>
                                </div>
                                <span>Buscar alojamiento temporal</span>
                              </li>
                              <li className="flex items-start">
                                <div className="h-6 w-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                  <span className="text-xs">2</span>
                                </div>
                                <span>Comprar boletos de avión</span>
                              </li>
                              <li className="flex items-start">
                                <div className="h-6 w-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                  <span className="text-xs">3</span>
                                </div>
                                <span>Preparar un fondo de emergencia</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 text-center">
                        <Button className="bg-teal-600 hover:bg-teal-700">Actualizar mi roadmap</Button>
                        <p className="text-sm text-gray-500 mt-2">
                          Este roadmap se actualiza automáticamente según tus conversaciones con el Coach
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
