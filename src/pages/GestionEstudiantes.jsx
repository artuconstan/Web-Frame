"use client"

import { useState } from "react"

const GestionEstudiantes = () => {
  console.log("GestionEstudiantes se está renderizando")

  // Datos de prueba directos para evitar problemas de contexto
  const estudiantes = [
    {
      id: 1,
      nombre: "Ana María González",
      email: "ana.gonzalez@uleam.edu.ec",
      estado: "activo",
      empresa: "Tech Solutions Inc.",
      supervisor: "Juan Pérez",
      horasCompletadas: 156,
      horasRequeridas: 480,
      calificacion: 17.5,
      evidencias: [
        {
          id: 1,
          titulo: "Diseño de Base de Datos",
          descripcion: "Diseño completo de la base de datos del proyecto",
          tipo: "documento",
          archivo: "diseno_bd.pdf",
          fechaSubida: "2024-07-10",
          estado: "aprobada",
          comentarios: "Excelente trabajo en la normalización.",
        },
        {
          id: 2,
          titulo: "Implementación de API REST",
          descripcion: "Desarrollo de endpoints para la API",
          tipo: "documento",
          archivo: "api_rest.zip",
          fechaSubida: "2024-07-15",
          estado: "pendiente",
          comentarios: "",
        },
      ],
      reportes: [
        {
          id: 1,
          titulo: "Reporte Semanal - Semana 1",
          tipo: "semanal",
          periodo: "01/07/2024 - 07/07/2024",
          fechaGeneracion: "2024-07-07",
          horasRegistradas: 40,
          actividades: 5,
          estado: "aprobado",
          comentarios: "Buen resumen, sigue así.",
        },
      ],
    },
    {
      id: 2,
      nombre: "Carlos Rodríguez",
      email: "carlos.rodriguez@uleam.edu.ec",
      estado: "retrasado",
      empresa: "Innovate Marketing Corp",
      supervisor: "María López",
      horasCompletadas: 120,
      horasRequeridas: 480,
      calificacion: 16.0,
      evidencias: [
        {
          id: 3,
          titulo: "Análisis de Mercado",
          descripcion: "Estudio de mercado para campaña digital",
          tipo: "presentacion",
          archivo: "analisis_mercado.pptx",
          fechaSubida: "2024-07-01",
          estado: "aprobada",
          comentarios: "Muy detallado y bien estructurado.",
        },
      ],
      reportes: [
        {
          id: 2,
          titulo: "Reporte Mensual - Julio",
          tipo: "mensual",
          periodo: "01/07/2024 - 31/07/2024",
          fechaGeneracion: "2024-07-31",
          horasRegistradas: 120,
          actividades: 8,
          estado: "pendiente",
          comentarios: "",
        },
      ],
    },
  ]

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

  const aprobarEvidencia = (estudianteId, evidenciaId) => {
    alert("Evidencia aprobada exitosamente")
  }

  const rechazarEvidencia = (estudianteId, evidenciaId) => {
    const comentario = prompt("Ingresa un comentario para el rechazo:")
    if (comentario) {
      alert("Evidencia rechazada con comentarios")
    }
  }

  const aprobarReporte = (estudianteId, reporteId) => {
    alert("Reporte aprobado exitosamente")
  }

  const getIconoTipo = (tipo) => {
    switch (tipo) {
      case "documento":
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
        return "📊"
      case "evaluacion":
        return "📋"
      case "final":
        return "🎓"
      default:
        return "📄"
    }
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
      <div style={{ marginBottom: "30px", display: "flex", gap: "10px", justifyContent: "center" }}>
        <button
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: vistaActual === "lista" ? "#3498db" : "#ecf0f1",
            color: vistaActual === "lista" ? "white" : "#2c3e50",
            cursor: "pointer",
          }}
          onClick={() => setVistaActual("lista")}
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
          <div style={{ marginBottom: "20px", display: "flex", gap: "20px", justifyContent: "center" }}>
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
            {estudiantesFiltrados.map((estudiante) => {
              const progreso = Math.round((estudiante.horasCompletadas / estudiante.horasRequeridas) * 100)
              const evidenciasPendientes = estudiante.evidencias.filter((e) => e.estado === "pendiente").length
              const reportesPendientes = estudiante.reportes.filter((r) => r.estado === "pendiente").length

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
                          backgroundColor: estudiante.estado === "activo" ? "#2ecc71" : "#e74c3c",
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
                        {estudiante.evidencias.length}
                      </div>
                      <div style={{ fontSize: "12px", color: "#7f8c8d" }}>Evidencias</div>
                      {evidenciasPendientes > 0 && (
                        <div style={{ fontSize: "10px", color: "#e74c3c" }}>{evidenciasPendientes} pendientes</div>
                      )}
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "18px", fontWeight: "bold", color: "#3498db" }}>
                        {estudiante.reportes.length}
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

                  <div style={{ display: "flex", gap: "10px" }}>
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
            })}
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
            {estudianteSeleccionado.evidencias.map((evidencia) => (
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
                            : "#e74c3c",
                      color: "white",
                    }}
                  >
                    {evidencia.estado}
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
                      style={{ backgroundColor: "#f8f9fa", padding: "10px", borderRadius: "4px", marginBottom: "15px" }}
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
                  >
                    👁️ Ver
                  </button>
                  <button
                    style={{
                      padding: "6px 12px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      backgroundColor: "white",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                  >
                    📥 Descargar
                  </button>
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
                        onClick={() => aprobarEvidencia(estudianteSeleccionado.id, evidencia.id)}
                      >
                        ✅ Aprobar
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
                        onClick={() => rechazarEvidencia(estudianteSeleccionado.id, evidencia.id)}
                      >
                        ❌ Rechazar
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
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
            {estudianteSeleccionado.reportes.map((reporte) => (
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

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    style={{
                      flex: 1,
                      padding: "8px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      backgroundColor: "white",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    👁️ Ver
                  </button>
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
                  >
                    📥 Descargar
                  </button>
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
                      onClick={() => aprobarReporte(estudianteSeleccionado.id, reporte.id)}
                    >
                      ✅ Aprobar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default GestionEstudiantes
