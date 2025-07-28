"use client"

// Context para manejar la autenticación en toda la aplicación
import { createContext, useContext, useState, useEffect } from "react"

// Creamos el contexto de autenticación
const AuthContext = createContext()

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  // Estado para almacenar la información del usuario autenticado
  const [user, setUser] = useState(null)
  // Estado para controlar si estamos cargando la información de autenticación
  const [loading, setLoading] = useState(true)

  // Efecto para verificar si hay un usuario logueado al cargar la app
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Error al parsear usuario almacenado:", error)
        localStorage.removeItem("user")
      }
    }
    setLoading(false)
  }, [])

  // Función para iniciar sesión
  const login = async (email, password, userType) => {
    try {
      // Simulamos una llamada a la API de autenticación
      // En un proyecto real, aquí harías una petición HTTP al backend
      const userData = {
        id: Date.now(),
        email,
        userType, // 'estudiante' o 'coordinador'
        name: userType === "estudiante" ? "Estudiante Demo" : "Coordinador Demo",
      }

      // Guardamos el usuario en localStorage para persistir la sesión
      localStorage.setItem("user", JSON.stringify(userData))
      setUser(userData)

      return { success: true }
    } catch (error) {
      console.error("Error en login:", error)
      return { success: false, error: "Error al iniciar sesión" }
    }
  }

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  // Función para verificar si el usuario está autenticado
  const isAuthenticated = () => {
    return user !== null
  }

  // Valores que se proporcionan a través del contexto
  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
