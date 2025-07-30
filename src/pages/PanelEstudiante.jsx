"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useData } from "../contexts/DataContext"
import "./PanelEstudiante.css"

const PanelEstudiante = () => {
  const { user } = useAuth()
  const { obtenerEstudiante } = useData()

  const [perfilData, setPerfilData] = useState({
    informacionPersonal: {
      nombre: "",
      email: "",
      telefono: "",
      direccion: "",
      fechaNacimiento: "",
      carrera: "",
      semestre: "",
    },
    informacionPractica: {
      empresa: "",
      supervisor: "",
      fechaInicio: "",
      fechaFin: "",
      horasRequeridas: 480,
      horasCompletadas: 0,
    },
  })

  const [actividades, setActividades] = useState([])
  const [loading, setLoading] = useState(true)
  const [editando, setEditando] = useState(false)
  const [guardando, setGuardando] = useState(false)

  useEffect(() => {
    cargarDatosEstudiante()
  }, [user])

  const cargarDatosEstudiante = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Obtener datos reales del estudiante desde DataContext
      const estudianteData = user?.email ? obtenerEstudiante(user.email) : null

      // Datos combinando información real y de ejemplo
      const datos = {
        informacionPersonal: {
          nombre: estudianteData?.nombre || user?.nombre || "Nombre no disponible",
          email: estudianteData?.email || user?.email || "estudiante@email.com",
          telefono: "+51 987 654 321",
          direccion: "Av. Universitaria 123, Lima",
          fechaNacimiento: "1999-05-15",
          carrera: estudianteData?.carrera || "Ingeniería de Sistemas",
          semestre: "8vo Semestre",
        },
        informacionPractica: {
          empresa: estudianteData?.empresa || "TechCorp S.A.",
          supervisor: estudianteData?.supervisor || "Ing. María González",
          fechaInicio: "2024-01-15",
          fechaFin: "2024-04-15",
          horasRequeridas: estudianteData?.horasRequeridas || 480,
          horasCompletadas: estudianteData?.horasCompletadas || 156,
        },
      }

      const actividadesEjemplo = estudianteData?.actividadesRecientes || [
        {
          id: 1,
          fecha: "2024-01-20",
          descripcion: "Desarrollo de módulo de reportes",
          horas: 8,
          supervisor: "Ing. María González",
          estado: "aprobada",
        },
        {
          id: 2,
          fecha: "2024-01-19",
          descripcion: "Reunión con equipo de desarrollo",
          horas: 2,
          supervisor: "Ing. María González",
          estado: "aprobada",
        },
        {
          id: 3,
          fecha: "2024-01-18",
          descripcion: "Análisis de requerimientos del sistema",
          horas: 6,
          supervisor: "Ing. María González",
          estado: "pendiente",
        },
      ]

      setPerfilData(datos)
      setActividades(actividadesEjemplo)
    } catch (error) {
      console.error("Error al cargar datos:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (seccion, campo, valor) => {
    setPerfilData((prev) => ({
      ...prev,
      [seccion]: {
        ...prev[seccion],
        [campo]: valor,
      },
    }))
  }

  const guardarCambios = async () => {
    setGuardando(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setEditando(false)
      alert("Información actualizada exitosamente")
    } catch (error) {
      alert("Error al guardar los cambios")
    } finally {
      setGuardando(false)
    }
  }

  const calcularProgreso = () => {
    return Math.round(
      (perfilData.informacionPractica.horasCompletadas / perfilData.informacionPractica.horasRequeridas) * 100,
    )
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando información del estudiante...</p>
      </div>
    )
  }

  const progreso = calcularProgreso()

  return (
    <div className="panel-estudiante-container">
      {/* Header del Panel */}
      <div className="panel-header">
        <h1>👤 Mi Panel de Estudiante</h1>
        <p>Gestiona tu información personal y de práctica profesional</p>
      </div>

      {/* Contenido Principal con Layout de 2 Columnas */}
      <div className="panel-content">
        {/* Columna Izquierda */}
        <div className="content-left">
          {/* Información Personal */}
          <div className="info-section">
            <div className="section-header">
              <h2>📋 Información Personal</h2>
              <button
                className="btn btn-outline"
                onClick={() => (editando ? guardarCambios() : setEditando(true))}
                disabled={guardando}
              >
                {guardando ? "Guardando..." : editando ? "Guardar" : "Editar"}
              </button>
            </div>

            <div className="info-grid">
              <div className="info-item">
                <label>Nombre Completo</label>
                {editando ? (
                  <input
                    type="text"
                    value={perfilData.informacionPersonal.nombre}
                    onChange={(e) => handleInputChange("informacionPersonal", "nombre", e.target.value)}
                    className="form-control"
                  />
                ) : (
                  <span>{perfilData.informacionPersonal.nombre}</span>
                )}
              </div>

              <div className="info-item">
                <label>Email</label>
                {editando ? (
                  <input
                    type="email"
                    value={perfilData.informacionPersonal.email}
                    onChange={(e) => handleInputChange("informacionPersonal", "email", e.target.value)}
                    className="form-control"
                  />
                ) : (
                  <span>{perfilData.informacionPersonal.email}</span>
                )}
              </div>

              <div className="info-item">
                <label>Teléfono</label>
                {editando ? (
                  <input
                    type="tel"
                    value={perfilData.informacionPersonal.telefono}
                    onChange={(e) => handleInputChange("informacionPersonal", "telefono", e.target.value)}
                    className="form-control"
                  />
                ) : (
                  <span>{perfilData.informacionPersonal.telefono}</span>
                )}
              </div>

              <div className="info-item">
                <label>Dirección</label>
                {editando ? (
                  <input
                    type="text"
                    value={perfilData.informacionPersonal.direccion}
                    onChange={(e) => handleInputChange("informacionPersonal", "direccion", e.target.value)}
                    className="form-control"
                  />
                ) : (
                  <span>{perfilData.informacionPersonal.direccion}</span>
                )}
              </div>

              <div className="info-item">
                <label>Fecha de Nacimiento</label>
                {editando ? (
                  <input
                    type="date"
                    value={perfilData.informacionPersonal.fechaNacimiento}
                    onChange={(e) => handleInputChange("informacionPersonal", "fechaNacimiento", e.target.value)}
                    className="form-control"
                  />
                ) : (
                  <span>{new Date(perfilData.informacionPersonal.fechaNacimiento).toLocaleDateString("es-ES")}</span>
                )}
              </div>

              <div className="info-item">
                <label>Carrera</label>
                {editando ? (
                  <input
                    type="text"
                    value={perfilData.informacionPersonal.carrera}
                    onChange={(e) => handleInputChange("informacionPersonal", "carrera", e.target.value)}
                    className="form-control"
                  />
                ) : (
                  <span>{perfilData.informacionPersonal.carrera}</span>
                )}
              </div>

              <div className="info-item">
                <label>Semestre</label>
                {editando ? (
                  <input
                    type="text"
                    value={perfilData.informacionPersonal.semestre}
                    onChange={(e) => handleInputChange("informacionPersonal", "semestre", e.target.value)}
                    className="form-control"
                  />
                ) : (
                  <span>{perfilData.informacionPersonal.semestre}</span>
                )}
              </div>
            </div>
          </div>

          {/* Actividades Recientes */}
          <div className="info-section">
            <div className="section-header">
              <h2>📝 Actividades Recientes</h2>
            </div>

            <div className="actividades-lista">
              {actividades.length === 0 ? (
                <p className="empty-message">No hay actividades registradas</p>
              ) : (
                actividades.map((actividad) => (
                  <div key={actividad.id} className="actividad-item">
                    <div className="actividad-fecha">{new Date(actividad.fecha).toLocaleDateString("es-ES")}</div>

                    <div className="actividad-content">
                      <h4>{actividad.descripcion}</h4>
                      <p>Supervisor: {actividad.supervisor}</p>
                      <span className="actividad-horas">{actividad.horas} horas</span>
                    </div>

                    <div className={`actividad-estado estado-${actividad.estado}`}>
                      {actividad.estado === "aprobada" ? "✅" : "⏳"} {actividad.estado}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Columna Derecha */}
        <div className="content-right">
          {/* Información de la Práctica */}
          <div className="info-section">
            <div className="section-header">
              <h2>🏢 Información de la Práctica</h2>
            </div>

            <div className="practica-info">
              <div className="practica-grid">
                <div className="info-item">
                  <label>Empresa</label>
                  <span>{perfilData.informacionPractica.empresa}</span>
                </div>

                <div className="info-item">
                  <label>Supervisor</label>
                  <span>{perfilData.informacionPractica.supervisor}</span>
                </div>

                <div className="info-item">
                  <label>Fecha de Inicio</label>
                  <span>{new Date(perfilData.informacionPractica.fechaInicio).toLocaleDateString("es-ES")}</span>
                </div>

                <div className="info-item">
                  <label>Fecha de Fin</label>
                  <span>{new Date(perfilData.informacionPractica.fechaFin).toLocaleDateString("es-ES")}</span>
                </div>
              </div>

              {/* Progreso de horas */}
              <div className="progreso-horas">
                <div className="progreso-header">
                  <h3>⏱️ Progreso de Horas</h3>
                  <span className="progreso-porcentaje">{progreso}%</span>
                </div>

                <div className="progreso-bar">
                  <div className="progreso-fill" style={{ width: `${progreso}%` }}></div>
                </div>

                <div className="progreso-info">
                  <span>
                    {perfilData.informacionPractica.horasCompletadas} / {perfilData.informacionPractica.horasRequeridas}{" "}
                    horas
                  </span>
                  <span>
                    Faltan:{" "}
                    {perfilData.informacionPractica.horasRequeridas - perfilData.informacionPractica.horasCompletadas}{" "}
                    horas
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PanelEstudiante
