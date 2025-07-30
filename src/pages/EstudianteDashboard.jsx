"use client"

// Dashboard principal para estudiantes - Vista general de su práctica
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useData } from "../contexts/DataContext" // Importa useData
import "./EstudianteDashboard.css"

const EstudianteDashboard = () => {
  const { user } = useAuth() // Obtén el usuario del contexto de autenticación
  const { obtenerEstudiante, marcarNotificacionLeida: marcarNotificacionLeidaContext } = useData() // Obtén funciones de DataContext

  const [estudiante, setEstudiante] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Efecto para cargar datos del estudiante desde DataContext
  useEffect(() => {
    const fetchEstudianteData = async () => {
      if (user?.email) {
        try {
          const data = obtenerEstudiante(user.email)
          if (data) {
            setEstudiante(data)
          } else {
            setError("No se encontró información para el estudiante actual.")
          }
        } catch (err) {
          console.error("Error al obtener datos del estudiante:", err)
          setError("Error al cargar la información del estudiante.")
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
        setError("Usuario no autenticado o email no disponible.")
      }
    }
    fetchEstudianteData()
  }, [user, obtenerEstudiante]) // Dependencias: user y obtenerEstudiante

  // Función para calcular el porcentaje de progreso
  const calcularPorcentajeProgreso = () => {
    if (!estudiante || estudiante.horasRequeridas === 0) return 0
    return Math.round((estudiante.horasCompletadas / estudiante.horasRequeridas) * 100)
  }

  // Función para marcar notificación como leída (usando la del DataContext)
  const marcarNotificacionLeida = (id) => {
    if (user?.email) {
      marcarNotificacionLeidaContext(user.email, id)
      // Actualiza el estado local para reflejar el cambio inmediatamente
      setEstudiante((prevEstudiante) => {
        if (!prevEstudiante) return null
        return {
          ...prevEstudiante,
          notificaciones: prevEstudiante.notificaciones.map((notif) =>
            notif.id === id ? { ...notif, leida: true } : notif,
          ),
        }
      })
    }
  }

  // Función para obtener el color del progreso según el porcentaje
  const getColorProgreso = (porcentaje) => {
    if (porcentaje >= 80) return "success"
    if (porcentaje >= 50) return "warning"
    return "danger"
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando tu dashboard...</p>
      </div>
    )
  }

  if (error) {
    return <div className="error-message">{error}</div>
  }

  if (!estudiante) {
    return <div className="info-message">No hay datos de estudiante disponibles.</div>
  }

  const porcentajeProgreso = calcularPorcentajeProgreso()

  return (
    <div className="estudiante-dashboard">
      {/* Encabezado de bienvenida */}
      <div className="dashboard-header">
        <h1>¡Bienvenido/a, {estudiante.nombre || "Estudiante"}!</h1>
        <p>Aquí tienes un resumen de tu práctica profesional</p>
      </div>

      {/* Tarjetas de estadísticas principales */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">⏰</div>
          <div className="stat-content">
            <h3>{estudiante.horasCompletadas}</h3>
            <p>Horas Completadas</p>
            <small>de {estudiante.horasRequeridas} requeridas</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📁</div>
          <div className="stat-content">
            <h3>{estudiante.evidenciasSubidas}</h3>
            <p>Evidencias Subidas</p>
            <small>{estudiante.evidenciasAprobadas} aprobadas</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{estudiante.calificacion}</h3>
            <p>Calificación Promedio</p>
            <small>sobre 20 puntos</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h3>{porcentajeProgreso}%</h3>
            <p>Progreso General</p>
            <small>de la práctica</small>
          </div>
        </div>
      </div>

      {/* Barra de progreso general */}
      <div className="progress-section">
        <h2>Progreso de la Práctica</h2>
        <div className="progress-container">
          <div className="progress-info">
            <span>
              Horas completadas: {estudiante.horasCompletadas}/{estudiante.horasRequeridas}
            </span>
            <span>{porcentajeProgreso}%</span>
          </div>
          <div className="progress-bar">
            <div
              className={`progress-fill progress-${getColorProgreso(porcentajeProgreso)}`}
              style={{ width: `${porcentajeProgreso}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Contenido principal en dos columnas */}
      <div className="dashboard-content">
        {/* COLUMNA IZQUIERDA */}
        <div className="content-left">
          {/* Actividades recientes */}
          <div className="dashboard-section">
            <h2>📋 Actividades Recientes</h2>
            {(estudiante.actividadesRecientes || []).length === 0 ? (
              <p className="empty-message">No hay actividades registradas aún.</p>
            ) : (
              <div className="actividades-list">
                {estudiante.actividadesRecientes.map((actividad) => (
                  <div key={actividad.id} className="actividad-item">
                    <div className="actividad-fecha">{new Date(actividad.fecha).toLocaleDateString("es-ES")}</div>
                    <div className="actividad-info">
                      <h4>{actividad.descripcion}</h4> {/* Usar 'descripcion' */}
                      <p>{actividad.horas} horas</p>
                    </div>
                    <div className={`actividad-estado estado-${actividad.estado}`}>{actividad.estado}</div>
                  </div>
                ))}
              </div>
            )}
            <Link to="/panel-estudiante" className="btn btn-outline">
              Ver todas las actividades
            </Link>
          </div>

          {/* Próximas actividades */}
          <div className="dashboard-section">
            <h2>📅 Próximas Actividades</h2>
            {(estudiante.proximasActividades || []).length === 0 ? (
              <p className="empty-message">No hay actividades programadas.</p>
            ) : (
              <div className="proximas-list">
                {estudiante.proximasActividades.map((actividad) => (
                  <div key={actividad.id} className="proxima-item">
                    <div className="proxima-fecha">
                      <div className="fecha">{new Date(actividad.fecha).toLocaleDateString("es-ES")}</div>
                      <div className="hora">{actividad.hora}</div>
                    </div>
                    <div className="proxima-info">
                      <h4>{actividad.descripcion}</h4> {/* Usar 'descripcion' */}
                      <span className={`tipo-badge tipo-${actividad.tipo}`}>{actividad.tipo}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="content-right">
          {/* Notificaciones */}
          <div className="dashboard-section">
            <h2>🔔 Notificaciones</h2>
            {(estudiante.notificaciones || []).length === 0 ? (
              <p className="empty-message">No hay notificaciones nuevas.</p>
            ) : (
              <div className="notificaciones-list">
                {estudiante.notificaciones.map((notificacion) => (
                  <div
                    key={notificacion.id}
                    className={`notificacion-item ${!notificacion.leida ? "no-leida" : ""}`}
                    onClick={() => marcarNotificacionLeida(notificacion.id)}
                  >
                    <div className={`notificacion-tipo tipo-${notificacion.tipo}`}>
                      {notificacion.tipo === "aprobacion" ? "✅" : "⏰"}
                    </div>
                    <div className="notificacion-content">
                      <p>{notificacion.mensaje}</p>
                      <small>{new Date(notificacion.fecha).toLocaleDateString("es-ES")}</small>
                    </div>
                    {!notificacion.leida && <div className="notificacion-badge"></div>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Accesos rápidos */}
          <div className="dashboard-section">
            <h2>⚡ Accesos Rápidos</h2>
            <div className="quick-actions">
              <Link to="/evidencias" className="quick-action">
                <div className="action-icon">📤</div>
                <span>Subir Evidencia</span>
              </Link>

              <Link to="/registro-empresa" className="quick-action">
                <div className="action-icon">🏢</div>
                <span>Registrar Empresa</span>
              </Link>

              <Link to="/reportes" className="quick-action">
                <div className="action-icon">📊</div>
                <span>Generar Reporte</span>
              </Link>

              <Link to="/panel-estudiante" className="quick-action">
                <div className="action-icon">👤</div>
                <span>Mi Perfil</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EstudianteDashboard
