"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Star, Search, MapPin, Phone, Mail, ExternalLink, Filter, ThumbsUp, MessageSquare, Check } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Definimos los tipos para los servicios
type ServiceCategory = "legal" | "traduccion" | "alojamiento" | "empleo" | "educacion" | "salud" | "finanzas"
type ServiceCountry = "espana" | "alemania" | "francia" | "italia" | "portugal" | "reinounido" | "suecia"

interface Service {
  id: string
  name: string
  description: string
  category: ServiceCategory
  countries: ServiceCountry[]
  rating: number
  reviews: number
  verified: boolean
  contact: {
    phone?: string
    email: string
    website?: string
    location?: string
  }
  image: string
}

// Datos de ejemplo para los servicios
const initialServices: Service[] = [
  {
    id: "1",
    name: "Abogados Migratorios García & Asociados",
    description:
      "Especialistas en derecho migratorio con más de 15 años de experiencia ayudando a latinoamericanos a establecerse en España. Ofrecemos asesoría en visados de trabajo, reunificación familiar y nacionalidad.",
    category: "legal",
    countries: ["espana"],
    rating: 4.8,
    reviews: 124,
    verified: true,
    contact: {
      phone: "+34 91 123 4567",
      email: "info@garciaasociados.es",
      website: "www.garciaasociados.es",
      location: "Madrid, España",
    },
    image: "/placeholder.svg?height=80&width=80&query=legal+office+icon",
  },
  {
    id: "2",
    name: "Traducciones Oficiales Europa",
    description:
      "Servicio de traducción jurada y oficial para documentos migratorios. Traducimos certificados, títulos académicos, antecedentes penales y cualquier documento necesario para tu proceso migratorio.",
    category: "traduccion",
    countries: ["espana", "alemania", "francia", "italia"],
    rating: 4.7,
    reviews: 89,
    verified: true,
    contact: {
      phone: "+34 93 456 7890",
      email: "info@traduccionesoficiales.eu",
      website: "www.traduccionesoficiales.eu",
      location: "Barcelona, España (servicios online)",
    },
    image: "/placeholder.svg?height=80&width=80&query=translation+document+icon",
  },
  {
    id: "3",
    name: "HomeStart Alojamiento Temporal",
    description:
      "Alojamiento temporal para recién llegados a Alemania. Ofrecemos habitaciones y apartamentos amueblados con contratos flexibles de 1 a 6 meses, ideales para tu período de adaptación.",
    category: "alojamiento",
    countries: ["alemania"],
    rating: 4.5,
    reviews: 76,
    verified: true,
    contact: {
      phone: "+49 30 123 4567",
      email: "info@homestart.de",
      website: "www.homestart.de",
      location: "Berlín, Alemania",
    },
    image: "/placeholder.svg?height=80&width=80&query=apartment+housing+icon",
  },
  {
    id: "4",
    name: "LatinTalent Recruitment",
    description:
      "Agencia de reclutamiento especializada en conectar profesionales latinoamericanos con empresas europeas. Ofrecemos asesoría en CV, entrevistas y procesos de contratación internacional.",
    category: "empleo",
    countries: ["espana", "alemania", "portugal"],
    rating: 4.6,
    reviews: 103,
    verified: true,
    contact: {
      email: "careers@latintalent.eu",
      website: "www.latintalent.eu",
      location: "Lisboa, Portugal (servicios online)",
    },
    image: "/placeholder.svg?height=80&width=80&query=recruitment+job+icon",
  },
  {
    id: "5",
    name: "EuroSalud Seguros Internacionales",
    description:
      "Seguros médicos internacionales diseñados específicamente para migrantes. Nuestras pólizas cumplen con los requisitos de los consulados europeos para la solicitud de visados.",
    category: "salud",
    countries: ["espana", "alemania", "francia", "italia", "portugal", "reinounido", "suecia"],
    rating: 4.4,
    reviews: 68,
    verified: true,
    contact: {
      phone: "+34 91 987 6543",
      email: "info@eurosalud.com",
      website: "www.eurosalud.com",
    },
    image: "/placeholder.svg?height=80&width=80&query=health+insurance+icon",
  },
  {
    id: "6",
    name: "Homologación Express",
    description:
      "Servicio especializado en la homologación y convalidación de títulos universitarios latinoamericanos en Europa. Te guiamos en todo el proceso administrativo para que tus credenciales sean reconocidas.",
    category: "educacion",
    countries: ["espana", "italia", "portugal"],
    rating: 4.3,
    reviews: 52,
    verified: true,
    contact: {
      phone: "+34 96 345 6789",
      email: "info@homologacionexpress.es",
      website: "www.homologacionexpress.es",
      location: "Valencia, España",
    },
    image: "/placeholder.svg?height=80&width=80&query=education+diploma+icon",
  },
  {
    id: "7",
    name: "TransferWise para Migrantes",
    description:
      "Soluciones financieras para migrantes: transferencias internacionales a bajo costo, cuentas multi-divisa y tarjetas para gestionar tu dinero entre Latinoamérica y Europa.",
    category: "finanzas",
    countries: ["espana", "alemania", "francia", "italia", "portugal", "reinounido", "suecia"],
    rating: 4.9,
    reviews: 215,
    verified: true,
    contact: {
      email: "support@transferwise.com",
      website: "www.transferwise.com",
    },
    image: "/placeholder.svg?height=80&width=80&query=finance+money+transfer+icon",
  },
  {
    id: "8",
    name: "MiCasa Relocation Services",
    description:
      "Servicio integral de reubicación para familias latinoamericanas que se mudan a Francia. Ayudamos con la búsqueda de vivienda, escuelas para niños, trámites administrativos y más.",
    category: "alojamiento",
    countries: ["francia"],
    rating: 4.7,
    reviews: 43,
    verified: true,
    contact: {
      phone: "+33 1 2345 6789",
      email: "info@micasa-relocation.fr",
      website: "www.micasa-relocation.fr",
      location: "París, Francia",
    },
    image: "/placeholder.svg?height=80&width=80&query=relocation+home+icon",
  },
]

export default function ServiciosPage() {
  const [services, setServices] = useState<Service[]>(initialServices)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<ServiceCategory | "all">("all")
  const [countryFilter, setCountryFilter] = useState<ServiceCountry | "all">("all")

  // Filtrar servicios según los criterios seleccionados
  const filteredServices = services.filter((service) => {
    // Filtro por categoría
    if (categoryFilter !== "all" && service.category !== categoryFilter) return false

    // Filtro por país
    if (countryFilter !== "all" && !service.countries.includes(countryFilter)) return false

    // Filtro por búsqueda
    if (
      searchQuery &&
      !service.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !service.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false

    return true
  })

  // Función para renderizar estrellas según la calificación
  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-amber-400 text-amber-400" />)
    }

    if (hasHalfStar) {
      stars.push(
        <svg
          key="half"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-amber-400"
        >
          <path d="M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2" fill="#FBBF24" />
          <path d="M12 2v15.8l-6.2 3.2L7 14.1 2 9.3l7-1L12 2z" fill="#FBBF24" />
        </svg>,
      )
    }

    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-amber-400" />)
    }

    return stars
  }

  // Función para obtener el nombre de la categoría en español
  const getCategoryName = (category: ServiceCategory) => {
    switch (category) {
      case "legal":
        return "Asesoría Legal"
      case "traduccion":
        return "Traducción"
      case "alojamiento":
        return "Alojamiento"
      case "empleo":
        return "Empleo"
      case "educacion":
        return "Educación"
      case "salud":
        return "Salud"
      case "finanzas":
        return "Finanzas"
      default:
        return category
    }
  }

  // Función para obtener el nombre del país en español
  const getCountryName = (country: ServiceCountry) => {
    switch (country) {
      case "espana":
        return "España"
      case "alemania":
        return "Alemania"
      case "francia":
        return "Francia"
      case "italia":
        return "Italia"
      case "portugal":
        return "Portugal"
      case "reinounido":
        return "Reino Unido"
      case "suecia":
        return "Suecia"
      default:
        return country
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-6 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tighter text-teal-700 mb-2">Marketplace de Servicios</h1>
            <p className="text-gray-600 max-w-3xl">
              Encuentra servicios verificados y de confianza para facilitar tu proceso migratorio. Todos los proveedores
              han sido evaluados por nuestro equipo.
            </p>
          </div>

          {/* Filtros y búsqueda */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Buscar servicios..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select
                value={categoryFilter}
                onValueChange={(value) => setCategoryFilter(value as ServiceCategory | "all")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  <SelectItem value="legal">Asesoría Legal</SelectItem>
                  <SelectItem value="traduccion">Traducción</SelectItem>
                  <SelectItem value="alojamiento">Alojamiento</SelectItem>
                  <SelectItem value="empleo">Empleo</SelectItem>
                  <SelectItem value="educacion">Educación</SelectItem>
                  <SelectItem value="salud">Salud</SelectItem>
                  <SelectItem value="finanzas">Finanzas</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={countryFilter}
                onValueChange={(value) => setCountryFilter(value as ServiceCountry | "all")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por país" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los países</SelectItem>
                  <SelectItem value="espana">España</SelectItem>
                  <SelectItem value="alemania">Alemania</SelectItem>
                  <SelectItem value="francia">Francia</SelectItem>
                  <SelectItem value="italia">Italia</SelectItem>
                  <SelectItem value="portugal">Portugal</SelectItem>
                  <SelectItem value="reinounido">Reino Unido</SelectItem>
                  <SelectItem value="suecia">Suecia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setCategoryFilter("all")
                  setCountryFilter("all")
                  setSearchQuery("")
                }}
              >
                <Filter className="h-4 w-4 mr-2" />
                Limpiar filtros
              </Button>
            </div>
          </div>

          {/* Lista de servicios */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <Card key={service.id} className="overflow-hidden">
                  <CardHeader className="p-4 pb-0">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-4">
                        <div className="h-16 w-16 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                          <img src={service.image || "/placeholder.svg"} alt={service.name} className="h-10 w-10" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{service.name}</CardTitle>
                          <div className="flex items-center mt-1">
                            <div className="flex mr-1">{renderStars(service.rating)}</div>
                            <span className="text-sm text-gray-600">
                              {service.rating.toFixed(1)} ({service.reviews})
                            </span>
                            {service.verified && (
                              <Badge className="ml-2 bg-teal-100 text-teal-700 hover:bg-teal-100">Verificado</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="mb-3">
                      <Badge variant="outline" className="bg-gray-100">
                        {getCategoryName(service.category)}
                      </Badge>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {service.countries.map((country) => (
                          <Badge key={country} variant="outline" className="text-xs">
                            {getCountryName(country)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <CardDescription className="text-gray-600 mb-4">{service.description}</CardDescription>
                    <div className="space-y-2 text-sm">
                      {service.contact.location && (
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                          <span>{service.contact.location}</span>
                        </div>
                      )}
                      {service.contact.phone && (
                        <div className="flex items-start">
                          <Phone className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                          <span>{service.contact.phone}</span>
                        </div>
                      )}
                      <div className="flex items-start">
                        <Mail className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                        <span>{service.contact.email}</span>
                      </div>
                      {service.contact.website && (
                        <div className="flex items-start">
                          <ExternalLink className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                          <a
                            href={`https://${service.contact.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal-600 hover:underline"
                          >
                            {service.contact.website}
                          </a>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Button variant="outline" size="sm">
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Recomendar
                    </Button>
                    <Button className="bg-teal-600 hover:bg-teal-700" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contactar
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No se encontraron servicios</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  No hay servicios que coincidan con tus criterios de búsqueda. Intenta con otros filtros o términos de
                  búsqueda.
                </p>
              </div>
            )}
          </div>

          {/* Sección para proveedores */}
          <div className="mt-16 bg-teal-50 rounded-lg p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-teal-700 mb-4">¿Ofreces servicios para migrantes?</h2>
                <p className="text-gray-600 mb-6">
                  Si eres un proveedor de servicios para migrantes latinoamericanos en Europa, únete a nuestro
                  marketplace verificado y conecta con clientes potenciales.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <Check className="h-3 w-3" />
                    </div>
                    <span className="text-gray-600">Aumenta tu visibilidad con migrantes latinoamericanos</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <Check className="h-3 w-3" />
                    </div>
                    <span className="text-gray-600">
                      Recibe recomendaciones personalizadas de nuestro Coach de Viaje
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <Check className="h-3 w-3" />
                    </div>
                    <span className="text-gray-600">
                      Obtén la insignia de "Servicio Verificado" tras nuestro proceso de validación
                    </span>
                  </li>
                </ul>
                <Button className="bg-teal-600 hover:bg-teal-700">Registra tu servicio</Button>
              </div>
              <div className="hidden md:block">
                <img
                  src="/placeholder.svg?height=300&width=400&query=business+partnership+handshake+illustration"
                  alt="Colaboración con proveedores"
                  className="rounded-lg"
                  width={400}
                  height={300}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
