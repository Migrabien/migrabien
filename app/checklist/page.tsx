"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Clock, Download, Filter, Plus, Search, Lock, ArrowRight, Check } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

// Definimos los tipos para las tareas
type TaskStatus = "completed" | "pending" | "in-progress"
type TaskPriority = "high" | "medium" | "low"
type TaskCategory = "documentos" | "tramites" | "preparacion" | "destino"

interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  category: TaskCategory
  dueDate?: Date
}

// Asegurarse de que todas las declaraciones de objetos terminen con punto y coma
// Revisar todas las declaraciones de objetos y arrays

// Datos de ejemplo para la checklist
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Obtener pasaporte vigente",
    description: "Verificar que el pasaporte tenga al menos 1 año de vigencia desde la fecha de viaje",
    status: "completed",
    priority: "high",
    category: "documentos",
  },
  {
    id: "2",
    title: "Apostillar título universitario",
    description: "Llevar el título original al Ministerio de Relaciones Exteriores para apostillarlo",
    status: "in-progress",
    priority: "high",
    category: "documentos",
    dueDate: new Date(2023, 6, 15),
  },
  {
    id: "3",
    title: "Solicitar certificado de antecedentes penales",
    description: "Obtener el certificado y apostillarlo para presentarlo en la solicitud de visa",
    status: "pending",
    priority: "high",
    category: "documentos",
    dueDate: new Date(2023, 6, 20),
  },
  {
    id: "4",
    title: "Contratar seguro médico internacional",
    description: "Debe cubrir todo el período de estancia inicial y cumplir con los requisitos del país de destino",
    status: "pending",
    priority: "medium",
    category: "tramites",
    dueDate: new Date(2023, 7, 1),
  },
  {
    id: "5",
    title: "Agendar cita en el consulado",
    description: "Reservar con anticipación la cita para solicitar la visa",
    status: "pending",
    priority: "high",
    category: "tramites",
    dueDate: new Date(2023, 7, 10),
  },
  {
    id: "6",
    title: "Preparar comprobantes de solvencia económica",
    description: "Reunir extractos bancarios de los últimos 6 meses y carta de patrocinio si aplica",
    status: "pending",
    priority: "medium",
    category: "documentos",
    dueDate: new Date(2023, 7, 5),
  },
  {
    id: "7",
    title: "Investigar opciones de alojamiento temporal",
    description: "Buscar opciones de alquiler a corto plazo para las primeras semanas",
    status: "pending",
    priority: "medium",
    category: "preparacion",
    dueDate: new Date(2023, 8, 1),
  },
  {
    id: "8",
    title: "Comprar boletos de avión",
    description: "Adquirir los boletos una vez aprobada la visa",
    status: "pending",
    priority: "medium",
    category: "preparacion",
    dueDate: new Date(2023, 8, 15),
  },
  {
    id: "9",
    title: "Informarse sobre el sistema de transporte local",
    description: "Investigar opciones de transporte público, tarifas y abonos mensuales",
    status: "pending",
    priority: "low",
    category: "destino",
  },
  {
    id: "10",
    title: "Preparar un fondo de emergencia",
    description: "Ahorrar al menos el equivalente a 3 meses de gastos básicos",
    status: "pending",
    priority: "high",
    category: "preparacion",
    dueDate: new Date(2023, 8, 10),
  },
]

export default function ChecklistPage() {
  // Asegurarse de que todas las declaraciones terminen con punto y coma
  // Revisar todas las declaraciones de variables y funciones

  // Verificar que las declaraciones de estado terminen con punto y coma
  const { isAuthenticated } = useAuth()
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [filter, setFilter] = useState<TaskStatus | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<TaskCategory | "all">("all")

  // Función para cambiar el estado de una tarea
  // Verificar que la función toggleTaskStatus tenga punto y coma al final
  const toggleTaskStatus = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            status: task.status === "completed" ? "pending" : "completed",
          }
        }
        return task
      }),
    )
  }

  // Filtrar tareas según los criterios seleccionados
  const filteredTasks = tasks.filter((task) => {
    // Filtro por estado
    if (filter !== "all" && task.status !== filter) return false

    // Filtro por categoría
    if (categoryFilter !== "all" && task.category !== categoryFilter) return false

    // Filtro por búsqueda
    if (
      searchQuery &&
      !task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !task.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false

    return true
  })

  // Verificar que las declaraciones de variables calculadas terminen con punto y coma
  const completedTasks = tasks.filter((task) => task.status === "completed").length
  const progressPercentage = (completedTasks / tasks.length) * 100

  // Si el usuario no está autenticado, mostrar una vista previa con invitación a registrarse
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 py-12 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-teal-700 mb-4">
                Tu Checklist Migratoria Personalizada
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Organiza y sigue el progreso de todas las tareas necesarias para tu proceso migratorio
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
              <div>
                <Card className="border-2 border-teal-100 shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl text-teal-700">¿Por qué necesitas una checklist?</CardTitle>
                    <CardDescription>Tu guía paso a paso para un proceso migratorio exitoso</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <Check className="h-4 w-4 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Organización completa</h3>
                        <p className="text-sm text-gray-500">
                          Mantén todos tus trámites y documentos organizados en un solo lugar
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <Check className="h-4 w-4 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Personalizada para ti</h3>
                        <p className="text-sm text-gray-500">
                          Adaptada a tu país de origen, destino y motivo de migración
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <Check className="h-4 w-4 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Seguimiento de progreso</h3>
                        <p className="text-sm text-gray-500">
                          Visualiza tu avance y mantente motivado durante todo el proceso
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <Check className="h-4 w-4 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Recordatorios y fechas límite</h3>
                        <p className="text-sm text-gray-500">
                          No olvides ningún paso importante con nuestro sistema de fechas
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="border shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-xl text-teal-700">Vista previa de la Checklist</CardTitle>
                        <CardDescription>Una muestra de lo que obtendrás al registrarte</CardDescription>
                      </div>
                      <div className="bg-teal-100 text-teal-700 text-xs font-medium px-2.5 py-1 rounded">
                        30% Completado
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="p-4 border-t border-b">
                      <Progress value={30} className="h-2" />
                    </div>
                    <div className="p-4 space-y-4 max-h-64 overflow-y-auto">
                      <div className="p-3 rounded-lg border bg-white border-gray-200 relative">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-500 line-through">Obtener pasaporte vigente</h3>
                            <p className="text-sm text-gray-400">
                              Verificar que el pasaporte tenga al menos 1 año de vigencia desde la fecha de viaje
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg border bg-white border-gray-200 relative">
                        <div className="flex items-start gap-3">
                          <Clock className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">Apostillar título universitario</h3>
                            <p className="text-sm text-gray-600">
                              Llevar el título original al Ministerio de Relaciones Exteriores para apostillarlo
                            </p>
                            <div className="mt-2 text-xs text-gray-500 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Fecha límite: 15/07/2023
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg border bg-white border-gray-200 relative">
                        <div className="flex items-start gap-3">
                          <Circle className="h-5 w-5 text-gray-300 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                              <h3 className="font-medium text-gray-900">
                                Solicitar certificado de antecedentes penales
                              </h3>
                              <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700">
                                Alta
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">
                              Obtener el certificado y apostillarlo para presentarlo en la solicitud de visa
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/80 to-gray-50 flex flex-col items-center justify-end p-6">
                        <Lock className="h-8 w-8 text-teal-600 mb-2" />
                        <p className="text-center text-gray-700 font-medium mb-4">
                          Regístrate para acceder a tu checklist personalizada
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="bg-teal-50 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-teal-700 mb-4">
                ¡Organiza tu proceso migratorio de forma efectiva!
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Regístrate gratis para acceder a tu checklist personalizada, seguir tu progreso y recibir recordatorios
                de fechas importantes.
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
                  <CardTitle className="text-lg text-teal-700">Categorías personalizadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Organiza tus tareas por categorías: documentos, trámites, preparación y más. Todo adaptado a tu
                    situación.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-teal-700">Prioridades claras</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Identifica fácilmente qué tareas son más urgentes y cuáles pueden esperar un poco más.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-teal-700">Exporta tu checklist</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Descarga tu checklist en formato PDF para tenerla siempre a mano, incluso sin conexión a internet.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Si el usuario está autenticado, mostrar la interfaz completa de la Checklist
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-6 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar con estadísticas y filtros */}
            <div className="lg:col-span-1 space-y-6">
              {/* Tarjeta de progreso */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-teal-700">Mi Progreso</CardTitle>
                  <CardDescription>
                    Has completado {completedTasks} de {tasks.length} tareas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Progress value={progressPercentage} className="h-2" />
                    <div className="text-sm text-gray-500 text-right">{progressPercentage.toFixed(0)}% completado</div>
                  </div>
                </CardContent>
              </Card>

              {/* Filtros */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-teal-700">Filtros</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Estado</label>
                    <Select value={filter} onValueChange={(value) => setFilter(value as TaskStatus | "all")}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filtrar por estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="completed">Completados</SelectItem>
                        <SelectItem value="pending">Pendientes</SelectItem>
                        <SelectItem value="in-progress">En progreso</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Categoría</label>
                    <Select
                      value={categoryFilter}
                      onValueChange={(value) => setCategoryFilter(value as TaskCategory | "all")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Filtrar por categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        <SelectItem value="documentos">Documentos</SelectItem>
                        <SelectItem value="tramites">Trámites</SelectItem>
                        <SelectItem value="preparacion">Preparación</SelectItem>
                        <SelectItem value="destino">En destino</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setFilter("all")
                        setCategoryFilter("all")
                        setSearchQuery("")
                      }}
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Limpiar filtros
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Acciones */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-teal-700">Acciones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Añadir tarea
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar checklist
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Lista de tareas */}
            <div className="lg:col-span-3">
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl text-teal-700">Mi Checklist Migratoria</CardTitle>
                      <CardDescription>Organiza y sigue el progreso de tus tareas migratorias</CardDescription>
                    </div>
                    <div className="relative w-full md:w-64">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Buscar tareas..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all" className="w-full">
                    <TabsList className="grid grid-cols-4 mb-4">
                      <TabsTrigger value="all">Todas</TabsTrigger>
                      <TabsTrigger value="pending">Pendientes</TabsTrigger>
                      <TabsTrigger value="in-progress">En progreso</TabsTrigger>
                      <TabsTrigger value="completed">Completadas</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="m-0">
                      <div className="space-y-4">
                        {filteredTasks.length > 0 ? (
                          filteredTasks.map((task) => (
                            <div
                              key={task.id}
                              className={`p-4 rounded-lg border ${
                                task.status === "completed" ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200"
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <button onClick={() => toggleTaskStatus(task.id)} className="mt-0.5 flex-shrink-0">
                                  {task.status === "completed" ? (
                                    <CheckCircle className="h-5 w-5 text-teal-600" />
                                  ) : task.status === "in-progress" ? (
                                    <Clock className="h-5 w-5 text-amber-500" />
                                  ) : (
                                    <Circle className="h-5 w-5 text-gray-300" />
                                  )}
                                </button>
                                <div className="flex-1">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                                    <h3
                                      className={`font-medium ${
                                        task.status === "completed" ? "text-gray-500 line-through" : "text-gray-900"
                                      }`}
                                    >
                                      {task.title}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                      <Badge
                                        variant="outline"
                                        className={`${
                                          task.category === "documentos"
                                            ? "border-blue-200 bg-blue-50 text-blue-700"
                                            : task.category === "tramites"
                                              ? "border-purple-200 bg-purple-50 text-purple-700"
                                              : task.category === "preparacion"
                                                ? "border-amber-200 bg-amber-50 text-amber-700"
                                                : "border-green-200 bg-green-50 text-green-700"
                                        }`}
                                      >
                                        {task.category === "documentos"
                                          ? "Documentos"
                                          : task.category === "tramites"
                                            ? "Trámites"
                                            : task.category === "preparacion"
                                              ? "Preparación"
                                              : "En destino"}
                                      </Badge>
                                      <Badge
                                        variant="outline"
                                        className={`${
                                          task.priority === "high"
                                            ? "border-red-200 bg-red-50 text-red-700"
                                            : task.priority === "medium"
                                              ? "border-amber-200 bg-amber-50 text-amber-700"
                                              : "border-green-200 bg-green-50 text-green-700"
                                        }`}
                                      >
                                        {task.priority === "high"
                                          ? "Alta"
                                          : task.priority === "medium"
                                            ? "Media"
                                            : "Baja"}
                                      </Badge>
                                    </div>
                                  </div>
                                  <p
                                    className={`text-sm ${
                                      task.status === "completed" ? "text-gray-400" : "text-gray-600"
                                    }`}
                                  >
                                    {task.description}
                                  </p>
                                  {task.dueDate && (
                                    <div className="mt-2 text-xs text-gray-500 flex items-center">
                                      <Clock className="h-3 w-3 mr-1" />
                                      Fecha límite: {task.dueDate.toLocaleDateString()}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-gray-500">
                              No se encontraron tareas que coincidan con los filtros seleccionados.
                            </p>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    <TabsContent value="pending" className="m-0">
                      <div className="space-y-4">
                        {filteredTasks
                          .filter((task) => task.status === "pending")
                          .map((task) => (
                            <div key={task.id} className="p-4 rounded-lg border bg-white border-gray-200">
                              <div className="flex items-start gap-3">
                                <button onClick={() => toggleTaskStatus(task.id)} className="mt-0.5 flex-shrink-0">
                                  <Circle className="h-5 w-5 text-gray-300" />
                                </button>
                                <div className="flex-1">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                                    <h3 className="font-medium text-gray-900">{task.title}</h3>
                                    <div className="flex items-center gap-2">
                                      <Badge
                                        variant="outline"
                                        className={`${
                                          task.category === "documentos"
                                            ? "border-blue-200 bg-blue-50 text-blue-700"
                                            : task.category === "tramites"
                                              ? "border-purple-200 bg-purple-50 text-purple-700"
                                              : task.category === "preparacion"
                                                ? "border-amber-200 bg-amber-50 text-amber-700"
                                                : "border-green-200 bg-green-50 text-green-700"
                                        }`}
                                      >
                                        {task.category === "documentos"
                                          ? "Documentos"
                                          : task.category === "tramites"
                                            ? "Trámites"
                                            : task.category === "preparacion"
                                              ? "Preparación"
                                              : "En destino"}
                                      </Badge>
                                      <Badge
                                        variant="outline"
                                        className={`${
                                          task.priority === "high"
                                            ? "border-red-200 bg-red-50 text-red-700"
                                            : task.priority === "medium"
                                              ? "border-amber-200 bg-amber-50 text-amber-700"
                                              : "border-green-200 bg-green-50 text-green-700"
                                        }`}
                                      >
                                        {task.priority === "high"
                                          ? "Alta"
                                          : task.priority === "medium"
                                            ? "Media"
                                            : "Baja"}
                                      </Badge>
                                    </div>
                                  </div>
                                  <p className="text-sm text-gray-600">{task.description}</p>
                                  {task.dueDate && (
                                    <div className="mt-2 text-xs text-gray-500 flex items-center">
                                      <Clock className="h-3 w-3 mr-1" />
                                      Fecha límite: {task.dueDate.toLocaleDateString()}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="in-progress" className="m-0">
                      <div className="space-y-4">
                        {filteredTasks
                          .filter((task) => task.status === "in-progress")
                          .map((task) => (
                            <div key={task.id} className="p-4 rounded-lg border bg-white border-gray-200">
                              <div className="flex items-start gap-3">
                                <button onClick={() => toggleTaskStatus(task.id)} className="mt-0.5 flex-shrink-0">
                                  <Clock className="h-5 w-5 text-amber-500" />
                                </button>
                                <div className="flex-1">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                                    <h3 className="font-medium text-gray-900">{task.title}</h3>
                                    <div className="flex items-center gap-2">
                                      <Badge
                                        variant="outline"
                                        className={`${
                                          task.category === "documentos"
                                            ? "border-blue-200 bg-blue-50 text-blue-700"
                                            : task.category === "tramites"
                                              ? "border-purple-200 bg-purple-50 text-purple-700"
                                              : task.category === "preparacion"
                                                ? "border-amber-200 bg-amber-50 text-amber-700"
                                                : "border-green-200 bg-green-50 text-green-700"
                                        }`}
                                      >
                                        {task.category === "documentos"
                                          ? "Documentos"
                                          : task.category === "tramites"
                                            ? "Trámites"
                                            : task.category === "preparacion"
                                              ? "Preparación"
                                              : "En destino"}
                                      </Badge>
                                      <Badge
                                        variant="outline"
                                        className={`${
                                          task.priority === "high"
                                            ? "border-red-200 bg-red-50 text-red-700"
                                            : task.priority === "medium"
                                              ? "border-amber-200 bg-amber-50 text-amber-700"
                                              : "border-green-200 bg-green-50 text-green-700"
                                        }`}
                                      >
                                        {task.priority === "high"
                                          ? "Alta"
                                          : task.priority === "medium"
                                            ? "Media"
                                            : "Baja"}
                                      </Badge>
                                    </div>
                                  </div>
                                  <p className="text-sm text-gray-600">{task.description}</p>
                                  {task.dueDate && (
                                    <div className="mt-2 text-xs text-gray-500 flex items-center">
                                      <Clock className="h-3 w-3 mr-1" />
                                      Fecha límite: {task.dueDate.toLocaleDateString()}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="completed" className="m-0">
                      <div className="space-y-4">
                        {filteredTasks
                          .filter((task) => task.status === "completed")
                          .map((task) => (
                            <div key={task.id} className="p-4 rounded-lg border bg-gray-50 border-gray-200">
                              <div className="flex items-start gap-3">
                                <button onClick={() => toggleTaskStatus(task.id)} className="mt-0.5 flex-shrink-0">
                                  <CheckCircle className="h-5 w-5 text-teal-600" />
                                </button>
                                <div className="flex-1">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                                    <h3 className="font-medium text-gray-500 line-through">{task.title}</h3>
                                    <div className="flex items-center gap-2">
                                      <Badge
                                        variant="outline"
                                        className={`${
                                          task.category === "documentos"
                                            ? "border-blue-200 bg-blue-50 text-blue-700"
                                            : task.category === "tramites"
                                              ? "border-purple-200 bg-purple-50 text-purple-700"
                                              : task.category === "preparacion"
                                                ? "border-amber-200 bg-amber-50 text-amber-700"
                                                : "border-green-200 bg-green-50 text-green-700"
                                        }`}
                                      >
                                        {task.category === "documentos"
                                          ? "Documentos"
                                          : task.category === "tramites"
                                            ? "Trámites"
                                            : task.category === "preparacion"
                                              ? "Preparación"
                                              : "En destino"}
                                      </Badge>
                                      <Badge
                                        variant="outline"
                                        className={`${
                                          task.priority === "high"
                                            ? "border-red-200 bg-red-50 text-red-700"
                                            : task.priority === "medium"
                                              ? "border-amber-200 bg-amber-50 text-amber-700"
                                              : "border-green-200 bg-green-50 text-green-700"
                                        }`}
                                      >
                                        {task.priority === "high"
                                          ? "Alta"
                                          : task.priority === "medium"
                                            ? "Media"
                                            : "Baja"}
                                      </Badge>
                                    </div>
                                  </div>
                                  <p className="text-sm text-gray-400">{task.description}</p>
                                  {task.dueDate && (
                                    <div className="mt-2 text-xs text-gray-400 flex items-center">
                                      <Clock className="h-3 w-3 mr-1" />
                                      Fecha límite: {task.dueDate.toLocaleDateString()}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
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
  )
}
