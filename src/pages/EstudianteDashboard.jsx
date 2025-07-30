"use client"

// Dashboard principal para estudiantes - Vista general de su práctica
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import "./EstudianteDashboard.css"

const EstudianteDashboard = () => {
  const { user } = useAuth()

  // Estados para manejar los datos del dashboard
  const [dashboardData, setDashboardData] = useState({
    estadisticas: {
      horasCompletadas: 0,
      horasRequeridas: 480, // 3 meses * 40 horas/semana * 4 semanas
      evidenciasSubidas: 0,
      evidenciasAprobadas: 0,
      calificacionPromedio: 0,
    },
    actividadesRecientes: [],
    proximasActividades: [],
    notificaciones: [],
  })

  const [loading, setLoading] = useState(true)

  // Efecto para cargar datos del dashboard al montar el componente
  useEffect(() => {
    const cargarDatosDashboard = async () => {
      try {
        // Simular carga de datos desde la API
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Datos de ejemplo - en un proyecto real vendrían de la API
        const datos = {
          estadisticas: {
            horasCompletadas: 156,
            horasRequeridas: 480,
            evidenciasSubidas: 8,
            evidenciasAprobadas: 6,
            calificacionPromedio: 17.5,
          },
          actividadesRecientes: [
            {
              id: 1,
              fecha: "2024-01-20",
              actividad: "Desarrollo de módulo de reportes",
              horas: 8,
              estado: "completada",
            },
            {
              id: 2,
              fecha: "2024-01-19",
              actividad: "Reunión con supervisor",
              horas: 2,
              estado: "completada",
            },
            {
              id: 3,
              fecha: "2024-01-18",
              actividad: "Análisis de requerimientos",
              horas: 6,
              estado: "completada",
            },
          ],
          proximasActividades: [
            {
              id: 1,
              fecha: "2024-01-22",
              actividad: "Presentación de avances",
              hora: "10:00",
              tipo: "reunion",
            },
            {
              id: 2,
              fecha: "2024-01-25",
              actividad: "Entrega de informe semanal",
              hora: "17:00",
              tipo: "entrega",
            },
          ],
          notificaciones: [
            {
              id: 1,
              tipo: "aprobacion",
              mensaje: 'Tu evidencia "Informe Semanal 3" ha sido aprobada',
              fecha: "2024-01-20",
              leida: false,
            },
            {
              id: 2,
              tipo: "recordatorio",
              mensaje: "Recuerda subir tu informe semanal antes del viernes",
              fecha: "2024-01-19",
              leida: false,
            },
          ],
        }

        setDashboardData(datos)
      } catch (error) {
        console.error("Error al cargar datos del dashboard:", error)
      } finally {
        setLoading(false)
      }
    }

    cargarDatosDashboard()
  }, [])

  // Función para calcular el porcentaje de progreso
  const calcularPorcentajeProgreso = () => {
    return Math.round((dashboardData.estadisticas.horasCompletadas / dashboardData.estadisticas.horasRequeridas) * 100)
  }

  // Función para marcar notificación como leída
  const marcarNotificacionLeida = (id) => {
    setDashboardData((prev) => ({
      ...prev,
      notificaciones: prev.notificaciones.map((notif) => (notif.id === id ? { ...notif, leida: true } : notif)),
    }))
  }

  // Función para obtener el color del progreso según el porcentaje
  const getColorProgreso = (porcentaje) => {
    if (porcentaje >= 80) return "success"
    if (porcentaje >= 50) return "warning"
    return "danger"
  }

  // Verificar si el usuario está autenticado
  if (!user) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Verificando autenticación...</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando dashboard...</p>
      </div>
    )
  }

  const porcentajeProgreso = calcularPorcentajeProgreso()

  return (
    <div className="estudiante-dashboard">
      {/* Encabezado de bienvenida */}
      <div className="dashboard-header">
        <h1>¡Bienvenida, Ana !</h1>
        <p>Aquí tienes un resumen de tu práctica profesional</p>
      </div>

      {/* Tarjetas de estadísticas principales */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">⏰</div>
          <div className="stat-content">
            <h3>{dashboardData.estadisticas.horasCompletadas}</h3>
            <p>Horas Completadas</p>
            <small>de {dashboardData.estadisticas.horasRequeridas} requeridas</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📁</div>
          <div className="stat-content">
            <h3>{dashboardData.estadisticas.evidenciasSubidas}</h3>
            <p>Evidencias Subidas</p>
            <small>{dashboardData.estadisticas.evidenciasAprobadas} aprobadas</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{dashboardData.estadisticas.calificacionPromedio}</h3>
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
              Horas completadas: {dashboardData.estadisticas.horasCompletadas}/
              {dashboardData.estadisticas.horasRequeridas}
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
            {dashboardData.actividadesRecientes.length === 0 ? (
              <p className="empty-message">No hay actividades registradas aún.</p>
            ) : (
              <div className="actividades-list">
                {dashboardData.actividadesRecientes.map((actividad) => (
                  <div key={actividad.id} className="actividad-item">
                    <div className="actividad-fecha">{new Date(actividad.fecha).toLocaleDateString("es-ES")}</div>
                    <div className="actividad-info">
                      <h4>{actividad.actividad}</h4>
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
            {dashboardData.proximasActividades.length === 0 ? (
              <p className="empty-message">No hay actividades programadas.</p>
            ) : (
              <div className="proximas-list">
                {dashboardData.proximasActividades.map((actividad) => (
                  <div key={actividad.id} className="proxima-item">
                    <div className="proxima-fecha">
                      <div className="fecha">{new Date(actividad.fecha).toLocaleDateString("es-ES")}</div>
                      <div className="hora">{actividad.hora}</div>
                    </div>
                    <div className="proxima-info">
                      <h4>{actividad.actividad}</h4>
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
            {dashboardData.notificaciones.length === 0 ? (
              <p className="empty-message">No hay notificaciones nuevas.</p>
            ) : (
              <div className="notificaciones-list">
                {dashboardData.notificaciones.map((notificacion) => (
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
