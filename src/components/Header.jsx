"use client"
import { useState, useEffect, useRef } from "react" // Importa useRef
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import "./Header.css"

const Header = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const lastScrollY = useRef(0) // Usamos useRef para almacenar la última posición de scroll

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Si el scroll actual es mayor que el último scroll (bajando) Y hemos bajado más de 100px
      // (para evitar que se oculte al inicio por pequeños movimientos)
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHeaderVisible(false)
      }
      // Si el scroll actual es menor que el último scroll (subiendo)
      else if (currentScrollY < lastScrollY.current) {
        setIsHeaderVisible(true)
      }
      lastScrollY.current = currentScrollY // Actualiza la última posición de scroll
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, []) // El array vacío asegura que el efecto se ejecute solo una vez al montar y se limpie al desmontar

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <header className={`header ${isHeaderVisible ? "" : "header-hidden"}`}>
      <div className="header-container">
        {/* Logo y título */}
        <div className="header-brand">
          <Link to="/" className="brand-link">
            <h1>Sistema de Gestión de Prácticas</h1>
          </Link>
        </div>
        {/* Navegación */}
        <nav className="header-nav">
          {user ? (
            // Menú para usuarios autenticados
            <div className="nav-menu">
              {user.userType === "estudiante" && (
                <>
                  <Link
                    to="/estudiante-dashboard"
                    className={`nav-link ${
                      isActive("/estudiante-dashboard") || isActive("/estudiante-dashboard") ? "active" : ""
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link to="/panel-estudiante" className={`nav-link ${isActive("/panel-estudiante") ? "active" : ""}`}>
                    Mi Panel
                  </Link>
                  <Link to="/registro-empresa" className={`nav-link ${isActive("/registro-empresa") ? "active" : ""}`}>
                    Registrar Empresa
                  </Link>
                  <Link to="/evidencias" className={`nav-link ${isActive("/evidencias") ? "active" : ""}`}>
                    Evidencias
                  </Link>
                  <Link to="/reportes" className={`nav-link ${isActive("/reportes") ? "active" : ""}`}>
                    Reportes
                  </Link>
                </>
              )}
              {user.userType === "coordinador" && (
                <>
                  <Link to="/coordinador" className={`nav-link ${isActive("/coordinador") ? "active" : ""}`}>
                    Dashboard
                  </Link>
                  <Link
                    to="/gestion-estudiantes"
                    className={`nav-link ${isActive("/gestion-estudiantes") ? "active" : ""}`}
                  >
                    Gestión Estudiantes
                  </Link>
                </>
              )}
              <button onClick={handleLogout} className="nav-link logout-btn">
                Cerrar Sesión
              </button>
            </div>
          ) : (
            // Menú para usuarios no autenticados
            <div className="nav-menu">
              <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
                Inicio
              </Link>
              <Link to="/login" className={`nav-link ${isActive("/login") ? "active" : ""}`}>
                Iniciar Sesión
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
