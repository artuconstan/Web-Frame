"use client"

import { createContext, useContext, useState } from "react"
import { useData } from "./DataContext" // Importa useData para acceder a los datos de estudiantes/coordinadores

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
  // Obtenemos el estado del usuario y la función para actualizarlo desde DataContext.
  // DataContext es la fuente de verdad para los datos de la aplicación, incluyendo el usuario logueado.
  // También obtenemos 'allAppData' para acceder directamente a los arrays de estudiantes y coordinadores.
  const { user: dataContextUser, setUserData, data: allAppData } = useData()

  // Estado local para controlar si el proceso de login/logout está en curso
  const [loadingAuthProcess, setLoadingAuthProcess] = useState(false)

  // Función para iniciar sesión
  const login = async (email, password, userType) => {
    setLoadingAuthProcess(true) // Inicia el estado de carga
    let foundUser = null

    if (userType === "estudiante") {
      // Busca al estudiante en el array 'students' de allAppData
      foundUser = allAppData.students.find(
        (s) => s.email === email && s.password === password && s.userType === "estudiante",
      )
    } else if (userType === "coordinador") {
      // Busca al coordinador en el array 'coordinadores' de allAppData
      foundUser = allAppData.coordinadores.find(
        (c) => c.email === email && c.password === password && c.userType === "coordinador",
      )
    }

    if (foundUser) {
      // Si se encuentra el usuario, actualiza el estado del usuario en DataContext.
      // DataContext se encargará de persistir esto en localStorage.
      setUserData(foundUser)
      setLoadingAuthProcess(false) // Finaliza el estado de carga
      return { success: true }
    } else {
      setLoadingAuthProcess(false) // Finaliza el estado de carga
      return { success: false, error: "Credenciales incorrectas o tipo de usuario inválido." }
    }
  }

  // Función para cerrar sesión
  const logout = () => {
    setLoadingAuthProcess(true) // Inicia el estado de carga
    setUserData(null) // Limpia el usuario en DataContext y localStorage
    setLoadingAuthProcess(false) // Finaliza el estado de carga
  }

  // La autenticación se determina directamente por la presencia del usuario en DataContext
  const isAuthenticated = !!dataContextUser

  // Valores que se proporcionan a través del contexto
  const value = {
    user: dataContextUser, // Exponemos el usuario que viene de DataContext
    login,
    logout,
    isAuthenticated,
    loading: loadingAuthProcess, // Usamos el estado de carga local para el proceso de autenticación
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
