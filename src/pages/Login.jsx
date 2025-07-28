"use client"

// Página de inicio de sesión
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import "./Login.css"

const Login = () => {
  // Estados para manejar el formulario
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "estudiante", // Por defecto estudiante
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { login } = useAuth()
  const navigate = useNavigate()

  // Función para manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError("")
  }

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validaciones básicas
    if (!formData.email || !formData.password) {
      setError("Por favor, completa todos los campos")
      setLoading(false)
      return
    }

    if (!formData.email.includes("@")) {
      setError("Por favor, ingresa un email válido")
      setLoading(false)
      return
    }

    try {
      // Intentar iniciar sesión
      const result = await login(formData.email, formData.password, formData.userType)

      if (result.success) {
        // Redirigir según el tipo de usuario
        if (formData.userType === "estudiante") {
          navigate("/estudiante")
        } else {
          navigate("/coordinador")
        }
      } else {
        setError(result.error || "Error al iniciar sesión")
      }
    } catch (error) {
      setError("Error de conexión. Intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Encabezado del formulario */}
        <div className="login-header">
          <h2>Iniciar Sesión</h2>
          <p>Accede a tu cuenta del sistema de prácticas</p>
        </div>

        {/* Formulario de login */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* Selector de tipo de usuario */}
          <div className="form-group">
            <label htmlFor="userType">Tipo de Usuario</label>
            <select
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="form-control"
            >
              <option value="estudiante">Estudiante</option>
              <option value="coordinador">Coordinador</option>
            </select>
          </div>

          {/* Campo de email */}
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="tu.email@ejemplo.com"
              disabled={loading}
            />
          </div>

          {/* Campo de contraseña */}
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Tu contraseña"
              disabled={loading}
            />
          </div>

          {/* Mostrar errores si los hay */}
          {error && <div className="error-message">{error}</div>}

          {/* Botón de envío */}
          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>

        {/* Enlaces adicionales */}
        <div className="login-footer">
          <Link to="/" className="back-link">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
