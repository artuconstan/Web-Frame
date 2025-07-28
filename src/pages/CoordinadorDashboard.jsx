"use client"

// Dashboard para coordinadores - Vista general del sistema y estudiantes
import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import "./CoordinadorDashboard.css"

const CoordinadorDashboard = () => {
  const { user } = useAuth()

  // Estados para manejar los datos del coordinador
  const [dashboardData, setDashboardData] = useState({
    estadisticas: {
      totalEstudiantes: 0,
      estudiantesActivos: 0,
      evidenciasPendientes: 0,
      empresasRegistradas: 0,
    },
    estudiantes: [],
    evidenciasPendientes: [],
    alertas: [],
  })

  const [loading, setLoading] = useState(true)
  const [filtroEstudiantes, setFiltroEstudiantes] = useState("")
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null)

  // Efecto para cargar datos del dashboard
  useEffect(() => {
    const cargarDatosCoordinador = async () => {
      try {
        // Simular carga de datos desde la API
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Datos de ejemplo para coordinador
        const datos = {
          estadisticas: {
            totalEstudiantes: 45,
            estudiantesActivos: 42,
            evidenciasPendientes: 23,
            empresasRegistradas: 18,
          },
          estudiantes: [
            {
              id: 1,
              nombre: "Ana García",
              email: "ana.garcia@email.com",
              empresa: "TechCorp S.A.",
              horasCompletadas: 180,
              horasRequeridas: 480,
              ultimaActividad: "2024-01-20",
              estado: "activo",
              calificacion: 18,
            },
            {
              id: 2,
              nombre: "Carlos López",
              email: "carlos.lopez@email.com",
              empresa: "Innovate Solutions",
              horasCompletadas: 240,
              horasRequeridas: 480,
              ultimaActividad: "2024-01-19",
              estado: "activo",
              calificacion: 17,
            },
            {
              id: 3,
              nombre: "María Rodríguez",
              email: "maria.rodriguez@email.com",
              empresa: "Digital Systems",
              horasCompletadas: 120,
              horasRequeridas: 480,
              ultimaActividad: "2024-01-15",
              estado: "retrasado",
              calificacion: 16,
            },
          ],
          evidenciasPendientes: [
            {
              id: 1,
              estudiante: "Ana García",
              titulo: "Informe Semanal 4",
              fechaSubida: "2024-01-20",
              tipo: "documento",
            },
            {
              id: 2,
              estudiante: "Carlos López",
              titulo: "Evidencia Fotográfica",
              fechaSubida: "2024-01-19",
              tipo: "imagen",
            },
          ],
          alertas: [
            {
              id: 1,
              tipo: "retraso",
              mensaje: "María Rodríguez no ha subido evidencias en 5 días",
              prioridad: "alta",
            },
            {
              id: 2,
              tipo: "revision",
              mensaje: "5 evidencias pendientes de revisión",
              prioridad: "media",
            },
          ],
        }

        setDashboardData(datos)
      } catch (error) {
        console.error("Error al cargar datos del coordinador:", error)
      } finally {
        setLoading(false)
      }
    }

    cargarDatosCoordinador()
  }, [])

  // Función para filtrar estudiantes
  const estudiantesFiltrados = dashboardData.estudiantes.filter(
    (estudiante) =>
      estudiante.nombre.toLowerCase().includes(filtroEstudiantes.toLowerCase()) ||
      estudiante.empresa.toLowerCase().includes(filtroEstudiantes.toLowerCase()),
  )

  // Función para aprobar evidencia
  const aprobarEvidencia = (evidenciaId) => {
    setDashboardData((prev) => ({
      ...prev,
      evidenciasPendientes: prev.evidenciasPendientes.filter((ev) => ev.id !== evidenciaId),
      estadisticas: {
        ...prev.estadisticas,
        evidenciasPendientes: prev.estadisticas.evidenciasPendientes - 1,
      },
    }))
    alert("Evidencia aprobada exitosamente")
  }

  // Función para rechazar evidencia
  const rechazarEvidencia = (evidenciaId) => {
    const comentario = prompt("Ingresa un comentario para el rechazo:")
    if (comentario) {
      setDashboardData((prev) => ({
        ...prev,
        evidenciasPendientes: prev.evidenciasPendientes.filter((ev) => ev.id !== evidenciaId),
        estadisticas: {
          ...prev.estadisticas,
          evidenciasPendientes: prev.estadisticas.evidenciasPendientes - 1,
        },
      }))
      alert("Evidencia rechazada con comentarios")
    }
  }

  // Función para exportar datos de estudiantes
  const exportarDatos = () => {
    const datos = estudiantesFiltrados.map((estudiante) => ({
      Nombre: estudiante.nombre,
      Email: estudiante.email,
      Empresa: estudiante.empresa,
      "Horas Completadas": estudiante.horasCompletadas,
      "Progreso (%)": Math.round((estudiante.horasCompletadas / estudiante.horasRequeridas) * 100),
      "Última Actividad": estudiante.ultimaActividad,
      Estado: estudiante.estado,
      Calificación: estudiante.calificacion,
    }))

    const csv = [Object.keys(datos[0]).join(","), ...datos.map((row) => Object.values(row).join(","))].join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `estudiantes_${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando dashboard del coordinador...</p>
      </div>
    )
  }

  return (
    <div className="coordinador-dashboard">
      {/* Encabezado */}
      <div className="dashboard-header">
        <h1>Dashboard del Coordinador</h1>
        <p>Gestiona y supervisa las prácticas profesionales</p>
      </div>

      {/* Estadísticas principales */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{dashboardData.estadisticas.totalEstudiantes}</h3>
            <p>Total Estudiantes</p>
            <small>{dashboardData.estadisticas.estudiantesActivos} activos</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>{dashboardData.estadisticas.evidenciasPendientes}</h3>
            <p>Evidencias Pendientes</p>
            <small>por revisar</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏢</div>
          <div className="stat-content">
            <h3>{dashboardData.estadisticas.empresasRegistradas}</h3>
            <p>Empresas Registradas</p>
            <small>colaboradoras</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>
              {Math.round(
                (dashboardData.estadisticas.estudiantesActivos / dashboardData.estadisticas.totalEstudiantes) * 100,
              )}
              %
            </h3>
            <p>Tasa de Actividad</p>
            <small>estudiantes activos</small>
          </div>
        </div>
      </div>

      {/* Alertas importantes */}
      {dashboardData.alertas.length > 0 && (
        <div className="alertas-section">
          <h2>Alertas Importantes</h2>
          <div className="alertas-list">
            {dashboardData.alertas.map((alerta) => (
              <div key={alerta.id} className={`alerta-item prioridad-${alerta.prioridad}`}>
                <div className="alerta-icon">{alerta.tipo === "retraso" ? "⚠️" : "📋"}</div>
                <div className="alerta-content">
                  <p>{alerta.mensaje}</p>
                  <small>Prioridad: {alerta.prioridad}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <div className="dashboard-content">
        {/* Lista de estudiantes */}
        <div className="estudiantes-section">
          <div className="section-header">
            <h2>Estudiantes ({estudiantesFiltrados.length})</h2>
            <div className="section-actions">
              <input
                type="text"
                placeholder="Buscar estudiante o empresa..."
                value={filtroEstudiantes}
                onChange={(e) => setFiltroEstudiantes(e.target.value)}
                className="search-input"
              />
              <button onClick={exportarDatos} className="btn btn-secondary">
                Exportar
              </button>
            </div>
          </div>

          <div className="estudiantes-table">
            <table>
              <thead>
                <tr>
                  <th>Estudiante</th>
                  <th>Empresa</th>
                  <th>Progreso</th>
                  <th>Última Actividad</th>
                  <th>Estado</th>
                  <th>Calificación</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {estudiantesFiltrados.map((estudiante) => {
                  const progreso = Math.round((estudiante.horasCompletadas / estudiante.horasRequeridas) * 100)
                  return (
                    <tr key={estudiante.id}>
                      <td>
                        <div className="estudiante-info">
                          <strong>{estudiante.nombre}</strong>
                          <small>{estudiante.email}</small>
                        </div>
                      </td>
                      <td>{estudiante.empresa}</td>
                      <td>
                        <div className="progreso-cell">
                          <div className="progreso-bar">
                            <div className="progreso-fill" style={{ width: `${progreso}%` }}></div>
                          </div>
                          <span>{progreso}%</span>
                        </div>
                      </td>
                      <td>{new Date(estudiante.ultimaActividad).toLocaleDateString("es-ES")}</td>
                      <td>
                        <span className={`estado-badge estado-${estudiante.estado}`}>{estudiante.estado}</span>
                      </td>
                      <td>
                        <span className="calificacion">{estudiante.calificacion}/20</span>
                      </td>
                      <td>
                        <div className="acciones-cell">
                          <button
                            className="btn btn-sm btn-outline"
                            onClick={() => setEstudianteSeleccionado(estudiante)}
                          >
                            Ver Detalles
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Evidencias pendientes */}
        <div className="evidencias-section">
          <h2>Evidencias Pendientes de Revisión</h2>
          {dashboardData.evidenciasPendientes.length === 0 ? (
            <p className="empty-message">No hay evidencias pendientes de revisión.</p>
          ) : (
            <div className="evidencias-pendientes">
              {dashboardData.evidenciasPendientes.map((evidencia) => (
                <div key={evidencia.id} className="evidencia-pendiente">
                  <div className="evidencia-info">
                    <h4>{evidencia.titulo}</h4>
                    <p>Estudiante: {evidencia.estudiante}</p>
                    <small>Subido: {new Date(evidencia.fechaSubida).toLocaleDateString("es-ES")}</small>
                  </div>
                  <div className="evidencia-tipo">{evidencia.tipo === "documento" ? "📄" : "🖼️"}</div>
                  <div className="evidencia-acciones">
                    <button className="btn btn-success btn-sm" onClick={() => aprobarEvidencia(evidencia.id)}>
                      Aprobar
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => rechazarEvidencia(evidencia.id)}>
                      Rechazar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal de detalles del estudiante */}
      {estudianteSeleccionado && (
        <div className="modal-overlay" onClick={() => setEstudianteSeleccionado(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Detalles de {estudianteSeleccionado.nombre}</h3>
              <button className="modal-close" onClick={() => setEstudianteSeleccionado(null)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="detalle-grid">
                <div className="detalle-item">
                  <strong>Email:</strong> {estudianteSeleccionado.email}
                </div>
                <div className="detalle-item">
                  <strong>Empresa:</strong> {estudianteSeleccionado.empresa}
                </div>
                <div className="detalle-item">
                  <strong>Horas Completadas:</strong> {estudianteSeleccionado.horasCompletadas}/
                  {estudianteSeleccionado.horasRequeridas}
                </div>
                <div className="detalle-item">
                  <strong>Progreso:</strong>{" "}
                  {Math.round((estudianteSeleccionado.horasCompletadas / estudianteSeleccionado.horasRequeridas) * 100)}
                  %
                </div>
                <div className="detalle-item">
                  <strong>Estado:</strong> {estudianteSeleccionado.estado}
                </div>
                <div className="detalle-item">
                  <strong>Calificación:</strong> {estudianteSeleccionado.calificacion}/20
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setEstudianteSeleccionado(null)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CoordinadorDashboard
