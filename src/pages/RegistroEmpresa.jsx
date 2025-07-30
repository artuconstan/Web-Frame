"use client"

// Página para registrar información de la empresa donde realizará la práctica
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import "./RegistroEmpresa.css"

const RegistroEmpresa = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    // Información básica de la empresa
    nombreEmpresa: "",
    ruc: "",
    razonSocial: "",
    sector: "",
    tipoEmpresa: "",

    // Información de contacto
    direccion: "",
    distrito: "",
    provincia: "",
    departamento: "",
    telefono: "",
    email: "",
    sitioWeb: "",

    // Información del supervisor
    nombreSupervisor: "",
    cargoSupervisor: "",
    telefonoSupervisor: "",
    emailSupervisor: "",

    // Información de la práctica
    areaPractica: "",
    fechaInicio: "",
    fechaFin: "",
    horarioInicio: "",
    horarioFin: "",
    modalidad: "",
    descripcionActividades: "",
    objetivos: "",

    // Información adicional
    numeroEmpleados: "",
    observaciones: "",
  })

  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" })

  // Opciones para los selectores
  const sectores = [
    "Tecnología",
    "Salud",
    "Educación",
    "Comercio",
    "Manufactura",
    "Servicios",
    "Construcción",
    "Agricultura",
    "Turismo",
    "Financiero",
    "Otro",
  ]



  const modalidades = ["Presencial", "Remoto", "Híbrido"]


  // Función para manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Función para validar el formulario
  const validarFormulario = () => {
    const camposRequeridos = [
      "nombreEmpresa",
      "ruc",
      "sector",
      "direccion",
      "telefono",
      "email",
      "nombreSupervisor",
      "cargoSupervisor",
      "emailSupervisor",
      "areaPractica",
      "fechaInicio",
      "fechaFin",
      "modalidad",
    ]

    for (const campo of camposRequeridos) {
      if (!formData[campo].trim()) {
        return `El campo ${campo.replace(/([A-Z])/g, " $1").toLowerCase()} es requerido`
      }
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return "El email de la empresa no tiene un formato válido"
    }
    if (!emailRegex.test(formData.emailSupervisor)) {
      return "El email del supervisor no tiene un formato válido"
    }

    // Validar RUC (11 dígitos)
    if (!/^\d{11}$/.test(formData.ruc)) {
      return "El RUC debe tener 11 dígitos"
    }

    // Validar fechas
    const fechaInicio = new Date(formData.fechaInicio)
    const fechaFin = new Date(formData.fechaFin)
    if (fechaFin <= fechaInicio) {
      return "La fecha de fin debe ser posterior a la fecha de inicio"
    }

    return null
  }

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault()

    const error = validarFormulario()
    if (error) {
      setMensaje({ tipo: "error", texto: error })
      return
    }

    setLoading(true)
    setMensaje({ tipo: "", texto: "" })

    try {
      // Simular envío a la API
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // En un proyecto real, aquí harías la petición HTTP
      console.log("Datos de la empresa:", formData)

      setMensaje({
        tipo: "success",
        texto: "¡Empresa registrada exitosamente! Serás redirigido al dashboard.",
      })

      // Redirigir después de 2 segundos
      setTimeout(() => {
        navigate("/estudiante-dashboard")
      }, 2000)
    } catch (error) {
      console.error("Error al registrar empresa:", error)
      setMensaje({
        tipo: "error",
        texto: "Error al registrar la empresa. Por favor, inténtalo de nuevo.",
      })
    } finally {
      setLoading(false)
    }
  }

  // Función para limpiar el formulario
  const limpiarFormulario = () => {
    setFormData({
      nombreEmpresa: "",
      ruc: "",
      razonSocial: "",
      sector: "",
      tipoEmpresa: "",
      direccion: "",
      distrito: "",
      provincia: "",
      departamento: "",
      telefono: "",
      email: "",
      sitioWeb: "",
      nombreSupervisor: "",
      cargoSupervisor: "",
      telefonoSupervisor: "",
      emailSupervisor: "",
      areaPractica: "",
      fechaInicio: "",
      fechaFin: "",
      horarioInicio: "",
      horarioFin: "",
      modalidad: "",
      descripcionActividades: "",
      objetivos: "",
      numeroEmpleados: "",
      observaciones: "",
    })
    setMensaje({ tipo: "", texto: "" })
  }

  return (
    <div className="registro-empresa">
      {/* Header de la página */}
      <div className="page-header">
        <h1>Registro de Empresa</h1>
        <p>Completa la información de la empresa donde realizarás tu práctica profesional</p>
      </div>

      {/* Mensaje de estado */}
      {mensaje.texto && (
        <div className={`${mensaje.tipo}-message`}>
          {mensaje.tipo === "success" ? "✅" : "❌"} {mensaje.texto}
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-container">
        {/* Layout de dos columnas para las secciones */}
        <div className="form-sections-container">
          {/* ===== COLUMNA IZQUIERDA ===== */}
          <div className="form-section-left">
            {/* Información básica de la empresa */}
            <div className="form-section">
              <h2 className="section-title">
                <span className="section-icon">🏢</span>
                Información Básica de la Empresa
              </h2>

              <div className="info-box">
                <h4>Información importante</h4>
                <p>
                  Asegúrate de que todos los datos sean correctos, ya que esta información será utilizada para generar
                  los documentos oficiales de tu práctica.
                </p>
              </div>

              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label htmlFor="nombreEmpresa">
                    Nombre de la Empresa <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="nombreEmpresa"
                    name="nombreEmpresa"
                    value={formData.nombreEmpresa}
                    onChange={handleInputChange}
                    placeholder="Ej: Tech Solutions SAC"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="ruc">
                    RUC <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="ruc"
                    name="ruc"
                    value={formData.ruc}
                    onChange={handleInputChange}
                    placeholder="12345678901"
                    maxLength="11"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="razonSocial">Razón Social</label>
                  <input
                    type="text"
                    id="razonSocial"
                    name="razonSocial"
                    value={formData.razonSocial}
                    onChange={handleInputChange}
                    placeholder="Tech Solutions Sociedad Anónima Cerrada"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="sector">
                    Sector <span className="required">*</span>
                  </label>
                  <select id="sector" name="sector" value={formData.sector} onChange={handleInputChange} required>
                    <option value="">Seleccionar sector</option>
                    {sectores.map((sector) => (
                      <option key={sector} value={sector}>
                        {sector}
                      </option>
                    ))}
                  </select>
                </div>


              </div>
            </div>

            {/* Información de contacto */}
            <div className="form-section">
              <h2 className="section-title">
                <span className="section-icon">📍</span>
                Información de Contacto
              </h2>

              <div className="form-grid form-grid-2">
                <div className="form-group full-width">
                  <label htmlFor="direccion">
                    Dirección <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="direccion"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    placeholder="Av. Principal 123, Oficina 456"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="distrito">Distrito</label>
                  <input
                    type="text"
                    id="distrito"
                    name="distrito"
                    value={formData.distrito}
                    onChange={handleInputChange}
                    placeholder="Ej: San Isidro"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="provincia">Provincia</label>
                  <input
                    type="text"
                    id="provincia"
                    name="provincia"
                    value={formData.provincia}
                    onChange={handleInputChange}
                    placeholder="Ej: Lima"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="telefono">
                    Teléfono <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    placeholder="01-234-5678"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="contacto@empresa.com"
                    required
                  />
                </div>

              </div>
            </div>
          </div>

          {/* ===== COLUMNA DERECHA ===== */}
          <div className="form-section-right">
            {/* Información del supervisor */}
            <div className="form-section">
              <h2 className="section-title">
                <span className="section-icon">👤</span>
                Información del Supervisor
              </h2>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="nombreSupervisor">
                    Nombre del Supervisor <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="nombreSupervisor"
                    name="nombreSupervisor"
                    value={formData.nombreSupervisor}
                    onChange={handleInputChange}
                    placeholder="Juan Pérez García"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cargoSupervisor">
                    Cargo <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="cargoSupervisor"
                    name="cargoSupervisor"
                    value={formData.cargoSupervisor}
                    onChange={handleInputChange}
                    placeholder="Gerente de Desarrollo"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="telefonoSupervisor">Teléfono del Supervisor</label>
                  <input
                    type="tel"
                    id="telefonoSupervisor"
                    name="telefonoSupervisor"
                    value={formData.telefonoSupervisor}
                    onChange={handleInputChange}
                    placeholder="987-654-321"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="emailSupervisor">
                    Email del Supervisor <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="emailSupervisor"
                    name="emailSupervisor"
                    value={formData.emailSupervisor}
                    onChange={handleInputChange}
                    placeholder="supervisor@empresa.com"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Información de la práctica */}
            <div className="form-section">
              <h2 className="section-title">
                <span className="section-icon">📋</span>
                Información de la Práctica
              </h2>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="areaPractica">
                    Área de Práctica <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="areaPractica"
                    name="areaPractica"
                    value={formData.areaPractica}
                    onChange={handleInputChange}
                    placeholder="Desarrollo de Software"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="modalidad">
                    Modalidad <span className="required">*</span>
                  </label>
                  <select
                    id="modalidad"
                    name="modalidad"
                    value={formData.modalidad}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccionar modalidad</option>
                    {modalidades.map((modalidad) => (
                      <option key={modalidad} value={modalidad}>
                        {modalidad}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="fechaInicio">
                    Fecha de Inicio <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    id="fechaInicio"
                    name="fechaInicio"
                    value={formData.fechaInicio}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="fechaFin">
                    Fecha de Fin <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    id="fechaFin"
                    name="fechaFin"
                    value={formData.fechaFin}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="horarioInicio">Horario de Inicio</label>
                  <input
                    type="time"
                    id="horarioInicio"
                    name="horarioInicio"
                    value={formData.horarioInicio}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="horarioFin">Horario de Fin</label>
                  <input
                    type="time"
                    id="horarioFin"
                    name="horarioFin"
                    value={formData.horarioFin}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="descripcionActividades">Descripción de Actividades</label>
                  <textarea
                    id="descripcionActividades"
                    name="descripcionActividades"
                    value={formData.descripcionActividades}
                    onChange={handleInputChange}
                    placeholder="Describe las principales actividades que realizarás durante la práctica..."
                    rows="4"
                  />
                </div>



                <div className="form-group full-width">
                  <label htmlFor="observaciones">Observaciones Adicionales</label>
                  <textarea
                    id="observaciones"
                    name="observaciones"
                    value={formData.observaciones}
                    onChange={handleInputChange}
                    placeholder="Cualquier información adicional relevante..."
                    rows="3"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="form-actions">
          <button type="button" onClick={limpiarFormulario} className="btn btn-secondary" disabled={loading}>
             Limpiar Formulario
          </button>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <>
                <div className="loading-spinner"></div>
                Registrando...
              </>
            ) : (
              <> Registrar Empresa</>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default RegistroEmpresa
