import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ArrowRight, CheckCircle, Globe, MessageSquare, ShieldCheck } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-teal-50 to-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-teal-700">
                  Tu camino migratorio, más claro y seguro
                </h1>
                <p className="text-gray-600 md:text-xl">
                  MigraBien te acompaña en cada paso de tu proceso migratorio de Latinoamérica a Europa con asesoría
                  personalizada, herramientas prácticas y servicios verificados.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700">
                    <Link href="/registro">
                      Comienza tu plan migratorio
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/coach">Habla con nuestro coach</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://web3.cl/timhub/migrabien-banner.jpg"
                  alt="Personas planificando su migración"
                  className="mx-auto rounded-lg shadow-lg"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-teal-700">
                ¿Cómo te ayudamos?
              </h2>
              <p className="mt-4 text-gray-600 md:text-xl max-w-3xl mx-auto">
                Nuestra plataforma está diseñada para acompañarte en cada etapa de tu proceso migratorio
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-teal-700">Coach de Viaje IA</h3>
                <p className="text-gray-600">
                  Un asistente inteligente que te guía paso a paso, responde tus dudas y crea un plan personalizado
                  según tus necesidades.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-teal-700">Checklist Migratoria</h3>
                <p className="text-gray-600">
                  Una lista personalizada de tareas y documentos necesarios para tu proceso, adaptada a tu país de
                  origen y destino.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-teal-700">Servicios Verificados</h3>
                <p className="text-gray-600">
                  Accede a una red de profesionales y servicios confiables que te ayudarán en diferentes aspectos de tu
                  migración.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-teal-700">Información por País</h3>
                <p className="text-gray-600">
                  Datos específicos sobre requisitos, cultura y oportunidades en diferentes países europeos.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
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
                    className="h-6 w-6 text-teal-600"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-teal-700">Perfil Personalizado</h3>
                <p className="text-gray-600">
                  Crea tu perfil con tus objetivos y necesidades para recibir recomendaciones adaptadas a tu situación.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
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
                    className="h-6 w-6 text-teal-600"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-teal-700">Seguridad y Confianza</h3>
                <p className="text-gray-600">
                  Toda la información que compartes está protegida y solo se utiliza para mejorar tu experiencia
                  migratoria.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-teal-50 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-teal-700">
                Historias de éxito
              </h2>
              <p className="mt-4 text-gray-600 md:text-xl max-w-3xl mx-auto">
                Conoce a personas que han logrado su sueño migratorio con nuestra ayuda
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Testimonial 1 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img
                    src="/placeholder.svg?height=60&width=60&query=mujer+latina+joven+profesional+retrato"
                    alt="Foto de perfil"
                    className="h-12 w-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold">Marcela Rodríguez</h4>
                    <p className="text-sm text-gray-500">Colombia → España</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "MigraBien me ayudó a organizar todos los documentos que necesitaba para mi visa de trabajo. El coach
                  virtual me guió paso a paso y pude resolver todas mis dudas."
                </p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img
                    src="/placeholder.svg?height=60&width=60&query=hombre+latino+joven+profesional+retrato"
                    alt="Foto de perfil"
                    className="h-12 w-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold">Carlos Mendoza</h4>
                    <p className="text-sm text-gray-500">México → Alemania</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Gracias a la checklist personalizada pude organizar mi proceso de manera eficiente. Los servicios
                  recomendados fueron de gran ayuda para la homologación de mi título."
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img
                    src="/placeholder.svg?height=60&width=60&query=mujer+latina+adulta+profesional+retrato"
                    alt="Foto de perfil"
                    className="h-12 w-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold">Ana Gómez</h4>
                    <p className="text-sm text-gray-500">Perú → Portugal</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Como madre soltera, tenía muchas dudas sobre el proceso de reunificación familiar. MigraBien me
                  conectó con un abogado especializado que me ayudó a resolver mi caso."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="bg-teal-700 rounded-2xl p-8 md:p-12 shadow-xl">
              <div className="grid gap-6 lg:grid-cols-2 items-center">
                <div>
                  <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl">
                    Comienza tu viaje migratorio hoy
                  </h2>
                  <p className="mt-4 text-teal-100 md:text-xl">
                    Regístrate gratis y accede a todas las herramientas que necesitas para planificar tu migración de
                    forma segura y organizada.
                  </p>
                  <div className="mt-6">
                    <Button asChild size="lg" className="bg-white text-teal-700 hover:bg-teal-50">
                      <Link href="/registro">
                        Crear mi cuenta gratuita
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="relative hidden lg:block">
                  <img
                    src="/placeholder.svg?height=300&width=500&query=persona+latina+mirando+horizonte+con+maleta,+estilo+ilustración+moderna"
                    alt="Comenzando un nuevo camino"
                    className="rounded-lg shadow-lg"
                    width={500}
                    height={300}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
