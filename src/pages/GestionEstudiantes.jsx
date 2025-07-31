"use client"

import { useState } from "react"
import { useData } from "../contexts/DataContext" // Importa useData

const GestionEstudiantes = () => {
  console.log("GestionEstudiantes se está renderizando")

  // Usa el hook useData para obtener los estudiantes y las funciones de actualización
  const { estudiantes, actualizarEstadoEvidencia, actualizarEstadoReporte } = useData()

  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null)
  const [vistaActual, setVistaActual] = useState("lista")
  const [filtroEstudiante, setFiltroEstudiante] = useState("")
  const [filtroEstado, setFiltroEstado] = useState("todos")

  const estudiantesFiltrados = estudiantes.filter((estudiante) => {
    const coincideNombre =
      estudiante.nombre.toLowerCase().includes(filtroEstudiante.toLowerCase()) ||
      estudiante.empresa.toLowerCase().includes(filtroEstudiante.toLowerCase())
    const coincideEstado = filtroEstado === "todos" || estudiante.estado === filtroEstado
    return coincideNombre && coincideEstado
  })

  // Funciones para interactuar con el DataContext
  const handleAprobarEvidencia = (estudianteId, evidenciaId) => {
    actualizarEstadoEvidencia(estudianteId, evidenciaId, "aprobada", "")
    alert("Evidencia aprobada exitosamente.")
    // Opcional: Actualizar el estudiante seleccionado para reflejar el cambio inmediatamente
    setEstudianteSeleccionado((prev) => {
      if (!prev) return null
      const updatedEvidencias = prev.evidencias.map((e) =>
        e.id === evidenciaId ? { ...e, estado: "aprobada", comentarios: "" } : e,
      )
      return { ...prev, evidencias: updatedEvidencias }
    })
  }

  const handleRechazarEvidencia = (estudianteId, evidenciaId) => {
    const comentario = prompt("Ingresa un comentario para el rechazo:")
    if (comentario) {
      actualizarEstadoEvidencia(estudianteId, evidenciaId, "rechazada", comentario)
      alert("Evidencia rechazada con comentarios.")
      // Opcional: Actualizar el estudiante seleccionado para reflejar el cambio inmediatamente
      setEstudianteSeleccionado((prev) => {
        if (!prev) return null
        const updatedEvidencias = prev.evidencias.map((e) =>
          e.id === evidenciaId ? { ...e, estado: "rechazada", comentarios: comentario } : e,
        )
        return { ...prev, evidencias: updatedEvidencias }
      })
    }
  }

  const handleSolicitarCorreccionesEvidencia = (estudianteId, evidenciaId) => {
    const comentario = prompt("Ingresa las correcciones solicitadas:")
    if (comentario) {
      actualizarEstadoEvidencia(estudianteId, evidenciaId, "requiere_correcciones", comentario)
      alert("Correcciones solicitadas para la evidencia.")
      // Opcional: Actualizar el estudiante seleccionado para reflejar el cambio inmediatamente
      setEstudianteSeleccionado((prev) => {
        if (!prev) return null
        const updatedEvidencias = prev.evidencias.map((e) =>
          e.id === evidenciaId ? { ...e, estado: "requiere_correcciones", comentarios: comentario } : e,
        )
        return { ...prev, evidencias: updatedEvidencias }
      })
    }
  }

  const handleAprobarReporte = (estudianteId, reporteId) => {
    actualizarEstadoReporte(estudianteId, reporteId, "aprobado", "")
    alert("Reporte aprobado exitosamente.")
    // Opcional: Actualizar el estudiante seleccionado para reflejar el cambio inmediatamente
    setEstudianteSeleccionado((prev) => {
      if (!prev) return null
      const updatedReportes = prev.reportes.map((r) =>
        r.id === reporteId ? { ...r, estado: "aprobado", comentarios: "" } : r,
      )
      return { ...prev, reportes: updatedReportes }
    })
  }

  const getIconoTipo = (tipo) => {
    switch (tipo) {
      case "documento":
      case "informe":
      case "certificado":
      case "otro":
        return "📄"
      case "imagen":
        return "🖼️"
      case "video":
        return "🎥"
      case "presentacion":
        return "📊"
      case "semanal":
        return "📅"
      case "mensual":
        return "📈"
      case "evaluacion":
        return "📋"
      case "final":
        return "🎓"
      default:
        return "📄"
    }
  }

  // Si no hay estudiantes cargados, muestra un mensaje de carga
  if (!estudiantes) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          color: "#555",
          fontSize: "1.2rem",
        }}
      >
        <div
          style={{
            border: "6px solid #f3f3f3",
            borderTop: "6px solid #3498db",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            animation: "spin 1s linear infinite",
            marginBottom: "20px",
          }}
        ></div>
        <p>Cargando información de estudiantes...</p>
        <style jsx>{`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div
      style={{
        padding: "20px 40px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "1400px",
        margin: "0 auto",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "30px", textAlign: "center" }}>
        <h1 style={{ color: "#2c3e50", marginBottom: "10px" }}>Gestión de Estudiantes</h1>
        <p style={{ color: "#7f8c8d" }}>Supervisa el progreso, evidencias y reportes de todos los estudiantes</p>
      </div>

      {/* Navegación de vistas */}
      <div style={{ marginBottom: "30px", display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
        <button
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: vistaActual === "lista" ? "#3498db" : "#ecf0f1",
            color: vistaActual === "lista" ? "white" : "#2c3e50",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
          onClick={() => {
            setVistaActual("lista")
            setEstudianteSeleccionado(null) // Limpiar selección al volver a la lista
          }}
        >
          👥 Lista de Estudiantes
        </button>
        {estudianteSeleccionado && (
          <>
            <button
              style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: vistaActual === "evidencias" ? "#3498db" : "#ecf0f1",
                color: vistaActual === "evidencias" ? "white" : "#2c3e50",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
              onClick={() => setVistaActual("evidencias")}
            >
              📁 Evidencias de {estudianteSeleccionado.nombre.split(" ")[0]}
            </button>
            <button
              style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: vistaActual === "reportes" ? "#3498db" : "#ecf0f1",
                color: vistaActual === "reportes" ? "white" : "#2c3e50",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
              onClick={() => setVistaActual("reportes")}
            >
              📊 Reportes de {estudianteSeleccionado.nombre.split(" ")[0]}
            </button>
          </>
        )}
      </div>

      {/* Vista Lista de Estudiantes */}
      {vistaActual === "lista" && (
        <div>
          {/* Filtros */}
          <div
            style={{ marginBottom: "20px", display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}
          >
            <div>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Buscar estudiante:</label>
              <input
                type="text"
                placeholder="Nombre o empresa..."
                value={filtroEstudiante}
                onChange={(e) => setFiltroEstudiante(e.target.value)}
                style={{
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  width: "200px",
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Estado:</label>
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                style={{
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  width: "150px",
                }}
              >
                <option value="todos">Todos</option>
                <option value="activo">Activos</option>
                <option value="retrasado">Retrasados</option>
                <option value="completado">Completados</option>
              </select>
            </div>
          </div>

          {/* Lista de estudiantes */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "25px",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            {estudiantesFiltrados.length === 0 ? (
              <p style={{ textAlign: "center", gridColumn: "1 / -1", color: "#7f8c8d" }}>
                No se encontraron estudiantes que coincidan con los filtros.
              </p>
            ) : (
              estudiantesFiltrados.map((estudiante) => {
                const progreso = Math.round((estudiante.horasCompletadas / estudiante.horasRequeridas) * 100)
                const evidenciasPendientes = (estudiante.evidencias || []).filter(
                  (e) => e.estado === "pendiente",
                ).length
                const reportesPendientes = (estudiante.reportes || []).filter((r) => r.estado === "pendiente").length

                return (
                  <div
                    key={estudiante.id}
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "20px",
                      backgroundColor: "white",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          backgroundColor: "#3498db",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                          marginRight: "15px",
                        }}
                      >
                        {estudiante.nombre
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .substring(0, 2)}
                      </div>
                      <div>
                        <h3 style={{ margin: "0 0 5px 0", color: "#2c3e50" }}>{estudiante.nombre}</h3>
                        <p style={{ margin: "0 0 5px 0", color: "#7f8c8d", fontSize: "14px" }}>{estudiante.email}</p>
                        <span
                          style={{
                            padding: "2px 8px",
                            borderRadius: "12px",
                            fontSize: "12px",
                            backgroundColor:
                              estudiante.estado === "activo"
                                ? "#2ecc71"
                                : estudiante.estado === "retrasado"
                                  ? "#e74c3c"
                                  : "#f39c12", // Completado o cualquier otro estado
                            color: "white",
                          }}
                        >
                          {estudiante.estado}
                        </span>
                      </div>
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <div style={{ marginBottom: "8px" }}>
                        <strong>Empresa:</strong> {estudiante.empresa}
                      </div>
                      <div style={{ marginBottom: "8px" }}>
                        <strong>Supervisor:</strong> {estudiante.supervisor}
                      </div>
                      <div style={{ marginBottom: "8px" }}>
                        <strong>Progreso:</strong>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "5px" }}>
                          <div
                            style={{
                              width: "100%",
                              height: "8px",
                              backgroundColor: "#ecf0f1",
                              borderRadius: "4px",
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                width: `${progreso}%`,
                                height: "100%",
                                backgroundColor: "#3498db",
                              }}
                            ></div>
                          </div>
                          <span style={{ fontSize: "14px", fontWeight: "bold" }}>{progreso}%</span>
                        </div>
                      </div>
                      <div>
                        <strong>Horas:</strong> {estudiante.horasCompletadas}/{estudiante.horasRequeridas}
                      </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "18px", fontWeight: "bold", color: "#3498db" }}>
                          {(estudiante.evidencias || []).length}
                        </div>
                        <div style={{ fontSize: "12px", color: "#7f8c8d" }}>Evidencias</div>
                        {evidenciasPendientes > 0 && (
                          <div style={{ fontSize: "10px", color: "#e74c3c" }}>{evidenciasPendientes} pendientes</div>
                        )}
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "18px", fontWeight: "bold", color: "#3498db" }}>
                          {(estudiante.reportes || []).length}
                        </div>
                        <div style={{ fontSize: "12px", color: "#7f8c8d" }}>Reportes</div>
                        {reportesPendientes > 0 && (
                          <div style={{ fontSize: "10px", color: "#e74c3c" }}>{reportesPendientes} pendientes</div>
                        )}
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "18px", fontWeight: "bold", color: "#3498db" }}>
                          {estudiante.calificacion}/20
                        </div>
                        <div style={{ fontSize: "12px", color: "#7f8c8d" }}>Calificación</div>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      <button
                        style={{
                          flex: 1,
                          padding: "8px",
                          border: "none",
                          borderRadius: "4px",
                          backgroundColor: "#3498db",
                          color: "white",
                          cursor: "pointer",
                          fontSize: "14px",
                        }}
                        onClick={() => {
                          setEstudianteSeleccionado(estudiante)
                          setVistaActual("evidencias")
                        }}
                      >
                        📁 Ver Evidencias
                      </button>
                      <button
                        style={{
                          flex: 1,
                          padding: "8px",
                          border: "none",
                          borderRadius: "4px",
                          backgroundColor: "#2ecc71",
                          color: "white",
                          cursor: "pointer",
                          fontSize: "14px",
                        }}
                        onClick={() => {
                          setEstudianteSeleccionado(estudiante)
                          setVistaActual("reportes")
                        }}
                      >
                        📊 Ver Reportes
                      </button>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      )}

      {/* Vista Evidencias del Estudiante */}
      {vistaActual === "evidencias" && estudianteSeleccionado && (
        <div>
          <div style={{ marginBottom: "20px" }}>
            <button
              style={{
                padding: "8px 16px",
                border: "1px solid #3498db",
                borderRadius: "4px",
                backgroundColor: "white",
                color: "#3498db",
                cursor: "pointer",
                marginRight: "20px",
              }}
              onClick={() => setVistaActual("lista")}
            >
              ← Volver a la lista
            </button>
            <h2 style={{ display: "inline", color: "#2c3e50" }}>Evidencias de {estudianteSeleccionado.nombre}</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
            {(estudianteSeleccionado.evidencias || []).length === 0 ? (
              <p style={{ textAlign: "center", gridColumn: "1 / -1", color: "#7f8c8d" }}>
                Este estudiante no ha subido evidencias aún.
              </p>
            ) : (
              estudianteSeleccionado.evidencias.map((evidencia) => (
                <div
                  key={evidencia.id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "20px",
                    backgroundColor: "white",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "15px",
                    }}
                  >
                    <div style={{ fontSize: "24px" }}>{getIconoTipo(evidencia.tipo)}</div>
                    <span
                      style={{
                        padding: "4px 8px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        backgroundColor:
                          evidencia.estado === "aprobada"
                            ? "#2ecc71"
                            : evidencia.estado === "pendiente"
                              ? "#f39c12"
                              : evidencia.estado === "requiere_correcciones"
                                ? "#ff7f50" // Color para correcciones
                                : "#e74c3c", // Rechazada
                        color: "white",
                      }}
                    >
                      {evidencia.estado === "requiere_correcciones" ? "Correcciones" : evidencia.estado}
                    </span>
                  </div>

                  <div>
                    <h3 style={{ color: "#2c3e50", marginBottom: "10px" }}>{evidencia.titulo}</h3>
                    <p style={{ color: "#7f8c8d", marginBottom: "10px", fontSize: "14px" }}>{evidencia.descripcion}</p>
                    <p style={{ marginBottom: "5px", fontSize: "14px" }}>📁 {evidencia.archivo}</p>
                    <p style={{ marginBottom: "10px", fontSize: "14px" }}>
                      📅 {new Date(evidencia.fechaSubida).toLocaleDateString("es-ES")}
                    </p>

                    {evidencia.comentarios && (
                      <div
                        style={{
                          backgroundColor: "#f8f9fa",
                          padding: "10px",
                          borderRadius: "4px",
                          marginBottom: "15px",
                        }}
                      >
                        <strong>Comentarios:</strong>
                        <p style={{ margin: "5px 0 0 0", fontSize: "14px" }}>{evidencia.comentarios}</p>
                      </div>
                    )}
                  </div>

                  <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                    <button
                      style={{
                        padding: "6px 12px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        backgroundColor: "white",
                        cursor: "pointer",
                        fontSize: "12px",
                      }}
                      onClick={() => window.open(evidencia.url, "_blank")} // Abre el archivo en una nueva pestaña
                    >
                      👁️ Ver
                    </button>
                    <a
                      href={evidencia.url}
                      download={evidencia.archivo}
                      style={{
                        padding: "6px 12px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        backgroundColor: "white",
                        color: "inherit", // Para que el color del texto no cambie
                        textDecoration: "none", // Para quitar el subrayado
                        cursor: "pointer",
                        fontSize: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      📥 Descargar
                    </a>
                    {evidencia.estado === "pendiente" && (
                      <>
                        <button
                          style={{
                            padding: "6px 12px",
                            border: "none",
                            borderRadius: "4px",
                            backgroundColor: "#2ecc71",
                            color: "white",
                            cursor: "pointer",
                            fontSize: "12px",
                          }}
                          onClick={() => handleAprobarEvidencia(estudianteSeleccionado.id, evidencia.id)}
                        >
                          ✅ Aprobar
                        </button>
                        <button
                          style={{
                            padding: "6px 12px",
                            border: "none",
                            borderRadius: "4px",
                            backgroundColor: "#ff7f50", // Color para solicitar correcciones
                            color: "white",
                            cursor: "pointer",
                            fontSize: "12px",
                          }}
                          onClick={() => handleSolicitarCorreccionesEvidencia(estudianteSeleccionado.id, evidencia.id)}
                        >
                          📝 Correcciones
                        </button>
                        <button
                          style={{
                            padding: "6px 12px",
                            border: "none",
                            borderRadius: "4px",
                            backgroundColor: "#e74c3c",
                            color: "white",
                            cursor: "pointer",
                            fontSize: "12px",
                          }}
                          onClick={() => handleRechazarEvidencia(estudianteSeleccionado.id, evidencia.id)}
                        >
                          ❌ Rechazar
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Vista Reportes del Estudiante */}
      {vistaActual === "reportes" && estudianteSeleccionado && (
        <div>
          <div style={{ marginBottom: "20px" }}>
            <button
              style={{
                padding: "8px 16px",
                border: "1px solid #3498db",
                borderRadius: "4px",
                backgroundColor: "white",
                color: "#3498db",
                cursor: "pointer",
                marginRight: "20px",
              }}
              onClick={() => setVistaActual("lista")}
            >
              ← Volver a la lista
            </button>
            <h2 style={{ display: "inline", color: "#2c3e50" }}>Reportes de {estudianteSeleccionado.nombre}</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
            {(estudianteSeleccionado.reportes || []).length === 0 ? (
              <p style={{ textAlign: "center", gridColumn: "1 / -1", color: "#7f8c8d" }}>
                Este estudiante no ha generado reportes aún.
              </p>
            ) : (
              estudianteSeleccionado.reportes.map((reporte) => (
                <div
                  key={reporte.id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "20px",
                    backgroundColor: "white",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "15px",
                    }}
                  >
                    <div style={{ fontSize: "24px" }}>{getIconoTipo(reporte.tipo)}</div>
                    <span
                      style={{
                        padding: "4px 8px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        backgroundColor: reporte.estado === "aprobado" ? "#2ecc71" : "#f39c12",
                        color: "white",
                      }}
                    >
                      {reporte.estado}
                    </span>
                  </div>

                  <div>
                    <h3 style={{ color: "#2c3e50", marginBottom: "15px" }}>{reporte.titulo}</h3>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "15px" }}>
                      <div>
                        <strong>Período:</strong>
                        <div style={{ fontSize: "14px", color: "#7f8c8d" }}>{reporte.periodo}</div>
                      </div>
                      <div>
                        <strong>Generado:</strong>
                        <div style={{ fontSize: "14px", color: "#7f8c8d" }}>
                          {new Date(reporte.fechaGeneracion).toLocaleDateString("es-ES")}
                        </div>
                      </div>
                      <div>
                        <strong>Horas:</strong>
                        <div style={{ fontSize: "14px", color: "#7f8c8d" }}>{reporte.horasRegistradas}h</div>
                      </div>
                      <div>
                        <strong>Actividades:</strong>
                        <div style={{ fontSize: "14px", color: "#7f8c8d" }}>{reporte.actividades}</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>             
                    {reporte.estado === "pendiente" && (
                      <button
                        style={{
                          flex: 1,
                          padding: "8px",
                          border: "none",
                          borderRadius: "4px",
                          backgroundColor: "#2ecc71",
                          color: "white",
                          cursor: "pointer",
                          fontSize: "14px",
                        }}
                        onClick={() => handleAprobarReporte(estudianteSeleccionado.id, reporte.id)}
                      >
                        ✅ Aprobar
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default GestionEstudiantes
