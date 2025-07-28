"use client"

import { useAuth } from "../contexts/AuthContext"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Verificando autenticación...</p>
      </div>
    )
  }

  // Si no hay usuario autenticado, redirigir al login
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Si hay usuario autenticado, mostrar el contenido
  return children
}

export default ProtectedRoute
