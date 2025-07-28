"use client"

import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useData } from "../contexts/DataContext"
import "./Reportes.css"
import { Plus, FileText, Download, Eye, BarChart, Award, RefreshCcw } from "lucide-react"

const Reportes = () => {
  const { user } = useAuth()
  const { obtenerEstudiante, agregarReporte } = useData()

  const estudiante = obtenerEstudiante(user?.email)

  const [tipoReporte, setTipoReporte] = useState("semanal")
  const [fechaInicio, setFechaInicio] = useState("")
  const [fechaFin, setFechaFin] = useState("")
  const [contenidoReporte, setContenidoReporte] = useState("")
  const [generandoReporte, setGenerandoReporte] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!fechaInicio || !fechaFin || !contenidoReporte) {
      alert("Por favor, completa todos los campos para generar el reporte.")
      return
    }

    if (new Date(fechaInicio) > new Date(fechaFin)) {
      alert("La fecha de inicio no puede ser mayor a la fecha de fin.")
      return
    }

    setGenerandoReporte(true)

    try {
      // Simular generación y subida de reporte
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const nuevoReporte = {
        tipo: tipoReporte,
        titulo: `Reporte ${tipoReporte.charAt(0).toUpperCase() + tipoReporte.slice(1)} (${fechaInicio} - ${fechaFin})`,
        periodo: `${fechaInicio} - ${fechaFin}`,
        contenido: contenidoReporte,
        horasRegistradas: Math.floor(Math.random() * 40) + 20, // Simulated data
        actividades: Math.floor(Math.random() * 10) + 5, // Simulated data
        url: `/reports/reporte-${Date.now()}.pdf`, // Simulated URL
      }

      agregarReporte(user.email, nuevoReporte)
      alert("Reporte generado y enviado al coordinador para revisión.")
      setTipoReporte("semanal")
      setFechaInicio("")
      setFechaFin("")
      setContenidoReporte("")
    } catch (error) {
      console.error("Error al generar reporte:", error)
      alert("Error al generar el reporte. Intenta de nuevo.")
    } finally {
      setGenerandoReporte(false)
    }
  }

  const getEstadoClass = (estado) => {
    switch (estado) {
      case "revisado":
        return "estado-completado"
      case "pendiente":
        return "estado-pendiente"
      case "rechazado":
        return "estado-error"
      default:
        return ""
    }
  }

  const getIconoTipo = (tipo) => {
    switch (tipo) {
      case "semanal":
        return "📅"
      case "mensual":
        return "📊"
      case "evaluacion":
        return "📋"
      case "final":
        return "🎓"
      default:
        return "📄"
    }
  }

  const reportesEstudiante = estudiante?.reportes || []
  const totalReportes = reportesEstudiante.length
  const reportesCompletados = reportesEstudiante.filter((r) => r.estado === "revisado").length
  const reportesPendientes = reportesEstudiante.filter((r) => r.estado === "pendiente").length
  const totalHoras = reportesEstudiante.reduce((sum, r) => sum + (r.horasRegistradas || 0), 0)


  return (
    <div className="reportes-container">
      {/* Header de la página */}
      <div className="page-header">
        <h1>Gestión de Reportes</h1>
        <p>Genera y gestiona los reportes de tu práctica profesional</p>
      </div>

      {/* Layout principal de dos columnas */}
      <div className="reportes-main-layout">
        {/* ===== COLUMNA IZQUIERDA: Lista de Reportes Generados ===== */}
        <div className="reportes-left-column">
          <div className="reportes-section">
            <h2 className="section-title">
              <FileText className="section-icon" />
              Reportes Generados ({totalReportes})
            </h2>

            {reportesEstudiante.length === 0 ? (
              <div className="empty-state">
                <p>No hay reportes generados aún</p>
                <small>Genera tu primer reporte usando el formulario de la derecha</small>
              </div>
            ) : (
              <div className="reportes-lista">
                {reportesEstudiante.map((reporte) => (
                  <div key={reporte.id} className="reporte-card">
                    <div className="reporte-header">
                      <div className="reporte-tipo">{getIconoTipo(reporte.tipo)}</div>
                      <div className={`reporte-estado ${getEstadoClass(reporte.estado)}`}>{reporte.estado}</div>
                    </div>

                    <div className="reporte-content">
                      <h3>{reporte.titulo}</h3>

                      <div className="reporte-meta">
                        <div className="meta-item">
                          <strong>Período</strong>
                          <span>{reporte.periodo}</span>
                        </div>
                        <div className="meta-item">
                          <strong>Generado</strong>
                          <span>{new Date(reporte.fechaCreacion).toLocaleDateString("es-ES")}</span>
                        </div>
                        <div className="meta-item">
                          <strong>Horas</strong>
                          <span>{reporte.horasRegistradas}h</span>
                        </div>
                        <div className="meta-item">
                          <strong>Actividades</strong>
                          <span>{reporte.actividades}</span>
                        </div>
                      </div>
                      {reporte.comentariosCoordinador && (
                        <div className="reporte-comentarios">
                          <strong>Comentarios del coordinador:</strong>
                          <p>{reporte.comentariosCoordinador}</p>
                        </div>
                      )}
                    </div>

                    <div className="reporte-actions">
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => alert(`Abriendo vista previa: ${reporte.titulo}`)}
                      >
                        <Eye /> Ver
                      </button>
                      <a
                        href={reporte.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm"
                      >
                        <Download /> Descargar
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ===== COLUMNA DERECHA: Generar Nuevo Reporte y Estadísticas ===== */}
        <div className="reportes-right-column">
          {/* Sección para generar nuevo reporte */}
          <div className="reportes-section filtros-section">
            <h2 className="section-title">
              <Plus className="section-icon" />
              Generar Nuevo Reporte
            </h2>

            <form onSubmit={handleSubmit} className="filtros-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="tipoReporte">Tipo de Reporte</label>
                  <select
                    id="tipoReporte"
                    value={tipoReporte}
                    onChange={(e) => setTipoReporte(e.target.value)}
                    className="form-control"
                    disabled={generandoReporte}
                  >
                    <option value="semanal">Reporte Semanal</option>
                    <option value="mensual">Reporte Mensual</option>
                    <option value="evaluacion">Evaluación de Desempeño</option>
                    <option value="final">Reporte Final</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fechaInicio">Fecha de Inicio</label>
                  <input
                    type="date"
                    id="fechaInicio"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                    className="form-control"
                    required
                    disabled={generandoReporte}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="fechaFin">Fecha de Fin</label>
                  <input
                    type="date"
                    id="fechaFin"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                    className="form-control"
                    required
                    disabled={generandoReporte}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contenidoReporte">Contenido Principal</label>
                <textarea
                  id="contenidoReporte"
                  value={contenidoReporte}
                  onChange={(e) => setContenidoReporte(e.target.value)}
                  placeholder="Describe tus actividades, logros y desafíos durante este período."
                  rows="6"
                  className="form-control"
                  required
                  disabled={generandoReporte}
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={generandoReporte}>
                  {generandoReporte ? (
                    "Generando..."
                  ) : (
                    <>
                      <RefreshCcw /> Generar Reporte
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Estadísticas de reportes */}
          <div className="reportes-section">
            <h2 className="section-title">
              <BarChart className="section-icon" />
              Estadísticas
            </h2>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📄</div>
                <div className="stat-content">
                  <h3>{totalReportes}</h3>
                  <p>Total Reportes</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-content">
                  <h3>{reportesCompletados}</h3>
                  <p>Completados</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">⏳</div>
                <div className="stat-content">
                  <h3>{reportesPendientes}</h3>
                  <p>Pendientes</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">⏰</div>
                <div className="stat-content">
                  <h3>{totalHoras}</h3>
                  <p>Horas Totales</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reportes
