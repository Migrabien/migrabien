"use client"

// Definimos los tipos para los usuarios
interface UserProfile {
  id: string
  name: string
  email: string
  country_origin: string
  country_destination: string
  migration_reason: string
  registration_date: Date
  last_activity: Date
  progress: number
  priority: "high" | "medium" | "low"
  status: "active" | "inactive" | "pending"
  notes?: string
  assigned_to?: string
}

// Datos de ejemplo para los usuarios
const initialUsers: UserProfile[] = [
  {
    id: "1",
    name: "María González",
    email: "maria.gonzalez@gmail.com",
    country_origin: "Colombia",
    country_destination: "España",
    migration_reason: "Trabajo",
    registration_date: new Date(2023, 4, 15),
    last_activity: new Date(2023, 5, 28),
    progress: 65,
    priority: "medium",
    status: "active",
  },
  {
    id: "2",
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@hotmail.com",
    country_origin: "México",
    country_destination: "Alemania",
    migration_reason: "Estudios",
    registration_date: new Date(2023, 5, 2),
    last_activity: new Date(2023, 5, 30),
    progress: 40,
    priority: "high",
    status: "active",
    notes: "Necesita ayuda urgente con la homologación de su título",
    assigned_to: "Ana Martínez",
  },
  {
    id: "3",
    name: "Laura Pérez",
    email: "laura.perez@yahoo.com",
    country_origin: "Argentina",
    country_destination: "Italia",
    migration_reason: "Reunificación familiar",
    registration_date: new Date(2023, 3, 10),
    last_activity: new Date(2023, 5, 15),
    progress: 85,
    priority: "low",
    status: "active",
  },
  {
    id: "4",
    name: "Juan Martínez",
    email: "juan.martinez@gmail.com",
    country_origin: "Perú",
    country_destination: "Portugal",
    migration_reason: "Trabajo",
    registration_date: new Date(2023, 5, 20),
    last_activity: new Date(2023, 5, 25),
    progress: 20,
    priority: "medium",
    status: "pending",
  },
  {
    id: "5",
    name: "Ana Silva",
    email: "ana.silva@outlook.com",
    country_origin: "Chile",
    country_destination: "Francia",
    migration_reason: "Emprendimiento",
    registration_date: new Date(2023, 4, 5),
    last_activity: new Date(2023, 5, 29),
    progress: 50,
    priority: "high",
    status: "active",
    notes: "Tiene dudas sobre los requisitos para su visa de emprendedor",
  },
  {
    i
