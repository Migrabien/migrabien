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
  const { isAuthenticated } = useAuth()
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState("chat")

  // Función para obtener respuesta del coach usando respuestas simuladas (fallback si la API falla)
  const simulateCoachResponse = (userMessage: string): string => {
    // Respuestas simuladas basadas en palabras clave
    if (userMessage.toLowerCase().includes("visa") || userMessage.toLowerCase().includes("visado")) {
      return "Para obtener información sobre visados para España, necesitarás:\n\n1. Pasaporte vigente con al menos 1 año de validez\n2. Formulario de solicitud de visado completado\n3. Fotografias recientes tipo pasaporte\n4. Justificación del motivo del viaje (carta de aceptación de universidad, contrato laboral, etc.)\n5. Seguro médico de viaje\n6. Prueba de solvencia económica\n7. Reserva de alojamiento\n8. Antecedentes penales apostillados\n\nLos requisitos específicos pueden variar según el tipo de visado (trabajo, estudios, etc.). ¿Tienes alguna pregunta sobre un tipo de visado en particular?"
    } 
    else if (userMessage.toLowerCase().includes("documento") || userMessage.toLowerCase().includes("documentos")) {
      return "Para migrar a España, los documentos esenciales que necesitarás son:\n\n1. Pasaporte vigente\n2. Visado correspondiente a tu situación (trabajo, estudios, etc.)\n3. Certificado de antecedentes penales apostillado\n4. Títulos académicos y profesionales apostillados\n5. Certificado médico (para algunos tipos de visado)\n6. Prueba de solvencia económica\n7. Seguro médico de viaje\n\nUna vez en España, deberás tramitar:\n\n1. Tarjeta de Identidad de Extranjero (TIE)\n2. Número de Identificación de Extranjero (NIE)\n3. Empadronamiento en tu municipio\n\n¿Hay algún documento específico sobre el que necesites más información?"
    }
    else if (userMessage.toLowerCase().includes("españa") || userMessage.toLowerCase().includes("spain")) {
      return "Para migrar a España desde Latinoamérica, el proceso general incluye:\n\n1. Determinar el tipo de visado que necesitas (trabajo, estudios, emprendedor, etc.)\n2. Reunir toda la documentación necesaria y apostillarla\n3. Solicitar cita en el consulado español en tu país\n4. Presentar la solicitud de visado con todos los documentos\n5. Esperar la resolución (puede tardar entre 1-3 meses)\n6. Una vez aprobado, viajar a España\n7. Tramitar la Tarjeta de Identidad de Extranjero (TIE) dentro de los 30 días siguientes a tu llegada\n\nEspaña ofrece varias vías para la migración legal, incluyendo la Ley de Startups, visados para nómadas digitales, reagrupación familiar, y el arraigo social después de 3 años de residencia continuada.\n\n¿Te interesa alguna vía en particular?"
    }
    else if (userMessage.toLowerCase().includes("trabajo") || userMessage.toLowerCase().includes("empleo") || userMessage.toLowerCase().includes("laboral")) {
      return "Para migrar a España por motivos laborales, tienes varias opciones:\n\n1. Visado de trabajo por cuenta ajena: Necesitas una oferta de trabajo de una empresa española. La empresa debe solicitar la autorización de residencia y trabajo.\n\n2. Visado de trabajo por cuenta propia: Para emprendedores o autónomos. Debes presentar un plan de negocio viable.\n\n3. Visado para profesionales altamente cualificados: Si tienes formación superior o experiencia profesional acreditada.\n\n4. Visado para nómadas digitales: Si trabajas remotamente para empresas fuera de España.\n\nLos requisitos generales incluyen:\n- Contrato de trabajo o plan de negocio\n- Títulos homologados (para ciertas profesiones)\n- Certificado de antecedentes penales\n- Certificado médico\n- Seguro médico\n\n¿Ya cuentas con una oferta laboral o estás en la fase de búsqueda?"
    }
    else if (userMessage.toLowerCase().includes("estudios") || userMessage.toLowerCase().includes("universidad") || userMessage.toLowerCase().includes("estudiar")) {
      return "Para migrar a España por estudios, necesitarás:\n\n1. Carta de aceptación de una institución educativa española\n2. Seguro médico que cubra toda tu estancia\n3. Prueba de solvencia económica para mantenerte durante tus estudios (aproximadamente 900€ mensuales)\n4. Pasaporte válido\n5. Certificado de antecedentes penales apostillado\n6. Certificado médico\n\nEl visado de estudiante te permite:\n- Residir legalmente en España durante tus estudios\n- Trabajar hasta 30 horas semanales (compatible con estudios)\n- Posibilidad de traer familiares bajo ciertas condiciones\n- Opción de cambiar a permiso de residencia y trabajo al finalizar\n\n¿Has sido aceptado ya en alguna institución educativa española?"
    }
    else if (userMessage.toLowerCase().includes("homologar") || userMessage.toLowerCase().includes("homologación") || userMessage.toLowerCase().includes("título")) {
      return "Para homologar tu título universitario en España, debes seguir estos pasos:\n\n1. Reunir la documentación necesaria:\n   - Título original legalizado y apostillado\n   - Certificado de notas/calificaciones legalizado y apostillado\n   - Plan de estudios detallado\n   - Traducción jurada de todos los documentos (si no están en español)\n   - Copia del DNI o pasaporte\n\n2. Presentar la solicitud en:\n   - Registro General del Ministerio de Universidades\n   - Delegaciones y Subdelegaciones del Gobierno\n   - Embajadas o consulados españoles\n\n3. Pagar la tasa correspondiente (aproximadamente 165€)\n\n4. Esperar la resolución (puede tardar entre 6 meses y 1 año)\n\nExisten dos tipos de reconocimiento:\n- Homologación: equivalencia a un título español concreto\n- Equivalencia: reconocimiento de un nivel académico\n\nPara profesiones reguladas (medicina, enfermería, arquitectura, etc.) el proceso puede ser más complejo y requerir pruebas adicionales.\n\n¿Qué tipo de título deseas homologar?"
    }
    else {
      return "Gracias por tu pregunta. Como Coach de Migración especializado en ayudar a personas latinoamericanas a migrar a España, puedo orientarte sobre:\n\n- Requisitos de visados y permisos de residencia\n- Documentación necesaria para diferentes trámites\n- Homologación de títulos académicos\n- Oportunidades laborales y emprendimiento\n- Proceso de reagrupación familiar\n- Trámites posteriores a la llegada (NIE, TIE, empadronamiento)\n- Aspectos prácticos como vivienda, sanidad y educación\n\nPara poder ayudarte mejor, ¿podrías darme más detalles sobre tu situación? Por ejemplo, ¿cuál es tu país de origen, cuál es tu motivo principal para migrar (trabajo, estudios, reunificación familiar, etc.), y en qué etapa del proceso te encuentras?"
    }
  }

  // Estado para almacenar el ID del thread de conversación
  const [threadId, setThreadId] = useState<string | null>(null);

  // Función para obtener respuesta del coach usando el asistente personalizado
  const getCoachResponse = async (userMessage: string) => {
    setIsLoading(true)

    try {
      try {
        // Llamar a la API con el asistente personalizado
        const response = await fetch('/api/coach', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: userMessage,
            threadId: threadId // Enviar el threadId si existe
          }),
        });

        if (!response.ok) {
          throw new Error('Error al comunicarse con el coach');
        }

        const data = await response.json();
        
        // Guardar el threadId para mantener la conversación
        if (data.threadId) {
          setThreadId(data.threadId);
        }
        
        const newMessage: Message = {
          id: Date.now().toString(),
          type: 'bot',
          content: data.response,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newMessage]);
      } catch (apiError) {
        console.error('Error con el asistente de OpenAI, usando respuestas simuladas:', apiError);
        
        // Fallback a respuestas simuladas si la API falla
        const simulatedResponse = simulateCoachResponse(userMessage);
        
        const fallbackMessage: Message = {
          id: Date.now().toString(),
          type: 'bot',
          content: simulatedResponse,
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, fallbackMessage]);
      }
    } catch (error) {
      console.error('Error general al obtener respuesta del coach:', error);
      
      // Mensaje de error en caso de fallo general
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: 'Lo siento, ha ocurrido un error al procesar tu pregunta. Por favor, intenta nuevamente.',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  // Función para manejar el envío de mensajes
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    const userInput = input
    setInput("")

    // Llamamos a la función que obtiene la respuesta del coach
    await getCoachResponse(userInput)
  }

  // Scroll automático al último mensaje con mejor posicionamiento
  useEffect(() => {
    if (messagesEndRef.current) {
      // Usar scrollIntoView con opciones para posicionar mejor
      messagesEndRef.current.scrollIntoView({ 
        behavior: "smooth", 
        block: "center" // Centrar el elemento en la ventana visible
      });
    }
  }, [messages])

  // Comentamos la restricción de autenticación para permitir pruebas sin registro
  // No hay restricción de autenticación ahora, cualquier usuario puede acceder al coach

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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="border shadow-sm h-full flex flex-col">
                <Tabs defaultValue="chat" className="flex-1 flex flex-col" value={activeTab} onValueChange={setActiveTab}>
                  <CardHeader className="pb-0">
                    <div className="flex justify-between items-center">
                      <CardTitle>Coach MigraBien</CardTitle>
                      <TabsList>
                        <TabsTrigger value="chat">Chat</TabsTrigger>
                        <TabsTrigger value="roadmap">Mi Roadmap</TabsTrigger>
                      </TabsList>
                    </div>
                    <CardDescription>Resuelve todas tus dudas sobre el proceso migratorio</CardDescription>
                  </CardHeader>
                  <TabsContent value="chat" className="flex-1 flex flex-col mt-0 px-4 pt-0 pb-4">
                    <CardContent className="flex-1 overflow-y-auto pt-4">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`flex items-start gap-2 max-w-[80%] ${
                                message.type === "user" ? "flex-row-reverse" : ""
                              }`}
                            >
                              <Avatar className={message.type === "user" ? "bg-teal-600" : "bg-gray-200"}>
                                <AvatarFallback>
                                  {message.type === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                                </AvatarFallback>
                              </Avatar>
                              <div
                                className={`rounded-lg p-3 text-sm ${
                                  message.type === "user"
                                    ? "bg-teal-600 text-white"
                                    : "bg-gray-100 text-gray-800 border border-gray-200"
                                }`}
                              >
                                <div className="whitespace-pre-wrap">{message.content}</div>
                                <div
                                  className={`text-xs mt-1 ${
                                    message.type === "user" ? "text-teal-100" : "text-gray-500"
                                  }`}
                                >
                                  {message.timestamp.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        {isLoading && (
                          <div className="flex justify-start">
                            <div className="flex items-start gap-2 max-w-[80%]">
                              <Avatar className="bg-gray-200">
                                <AvatarFallback>
                                  <Bot className="h-5 w-5" />
                                </AvatarFallback>
                              </Avatar>
                              <div className="rounded-lg p-3 text-sm bg-gray-100 text-gray-800 border border-gray-200">
                                <div className="flex items-center space-x-2">
                                  <div className="h-2 w-2 bg-teal-600 rounded-full animate-bounce"></div>
                                  <div className="h-2 w-2 bg-teal-600 rounded-full animate-bounce delay-100"></div>
                                  <div className="h-2 w-2 bg-teal-600 rounded-full animate-bounce delay-200"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        <div ref={messagesEndRef} />
                      </div>
                    </CardContent>
                    <div className="p-4 border-t">
                      <form onSubmit={handleSendMessage} className="flex gap-2">
                        <Input
                          placeholder="Escribe tu mensaje..."
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          className="flex-1"
                        />
                        <Button type="submit" size="icon" disabled={isLoading}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </form>
                    </div>
                  </TabsContent>
                  <TabsContent value="roadmap" className="flex-1 overflow-y-auto mt-0 p-4">
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-teal-700">Tu Plan Migratorio Personalizado</h3>
                        <p className="text-sm text-gray-500">
                          Este roadmap se adapta a tu situación específica y se actualiza con tu progreso
                        </p>
                      </div>

                      <div className="relative pl-8 space-y-8">
                        {/* Fase 1 */}
                        <div className="relative pl-8">
                          <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-teal-600"></div>
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-teal-700 mb-2">Fase 1: Investigación</h3>
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <div className="h-6 w-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                  <Check className="h-4 w-4" />
                                </div>
                                <span>Identificar país de destino</span>
                              </li>
                              <li className="flex items-start">
                                <div className="h-6 w-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                  <Check className="h-4 w-4" />
                                </div>
                                <span>Investigar requisitos de visado</span>
                              </li>
                              <li className="flex items-start">
                                <div className="h-6 w-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                  <span className="text-xs">3</span>
                                </div>
                                <span>Evaluar costos de vida</span>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* Fase 2 */}
                        <div className="relative pl-8">
                          <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-gray-300"></div>
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-teal-700 mb-2">Fase 2: Preparación de Documentos</h3>
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <div className="h-6 w-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                  <span className="text-xs">1</span>
                                </div>
                                <span>Obtener pasaporte actualizado</span>
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
                                <span>Obtener certificado de antecedentes penales</span>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* Fase 3 */}
                        <div className="relative pl-8">
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

            <div className="hidden lg:block">
              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle>Características del Coach</CardTitle>
                  <CardDescription>Tu asistente inteligente para migrar</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Asistente IA</h3>
                      <p className="text-sm text-gray-500">
                        Respuestas precisas y actualizadas sobre procesos migratorios
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Información de documentos</h3>
                      <p className="text-sm text-gray-500">
                        Guía sobre los documentos necesarios para cada etapa del proceso
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Roadmap personalizado</h3>
                      <p className="text-sm text-gray-500">
                        Plan migratorio adaptado a tus necesidades específicas
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0">
                      <Lock className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Respuestas personalizadas</h3>
                      <p className="text-sm text-gray-500">
                        Obtén información específica según tu país de origen, destino y situación personal
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
