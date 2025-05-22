import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-teal-600">MigraBien</span>
            </Link>
            <p className="text-gray-500 text-sm">
              Acompañamos tu proceso migratorio de Latinoamérica a Europa con herramientas personalizadas y servicios
              confiables.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-4">Plataforma</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/coach" className="text-gray-500 hover:text-teal-600 text-sm">
                  Coach de Viaje
                </Link>
              </li>
              <li>
                <Link href="/checklist" className="text-gray-500 hover:text-teal-600 text-sm">
                  Checklist Migratoria
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-gray-500 hover:text-teal-600 text-sm">
                  Marketplace de Servicios
                </Link>
              </li>
              <li>
                <Link href="/perfil" className="text-gray-500 hover:text-teal-600 text-sm">
                  Mi Perfil
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-4">Recursos</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/guias" className="text-gray-500 hover:text-teal-600 text-sm">
                  Guías por País
                </Link>
              </li>
              <li>
                <Link href="/documentos" className="text-gray-500 hover:text-teal-600 text-sm">
                  Documentos Necesarios
                </Link>
              </li>
              <li>
                <Link href="/historias" className="text-gray-500 hover:text-teal-600 text-sm">
                  Historias de Éxito
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-500 hover:text-teal-600 text-sm">
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-4">Empresa</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/nosotros" className="text-gray-500 hover:text-teal-600 text-sm">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-500 hover:text-teal-600 text-sm">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-gray-500 hover:text-teal-600 text-sm">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-gray-500 hover:text-teal-600 text-sm">
                  Términos de Servicio
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} MigraBien. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="text-gray-500 hover:text-teal-600">
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
                className="h-5 w-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-teal-600">
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
                className="h-5 w-5"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-teal-600">
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
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-teal-600">
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
                className="h-5 w-5"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
