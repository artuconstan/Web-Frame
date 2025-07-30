"use client"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useData } from "../contexts/DataContext"
import { FileText, Upload, Search, XCircle, CheckCircle, Info, Download } from "lucide-react"
import "./Evidencias.css"

const Evidencias = () => {
  const { user } = useAuth()
  const { obtenerEstudiante, actualizarEstudiante } = useData()
  const [estudiante, setEstudiante] = useState(null)
  const [newEvidencia, setNewEvidencia] = useState({ nombre: "", tipo: "", archivo: null })
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const fileInputRef = useRef(null)

  // Añade estos console.log para depurar el flujo de datos
  console.log("Evidencias: Componente renderizado.")
  console.log("Evidencias: user state (desde useAuth):", user)
  console.log("Evidencias: estudiante state (local):", estudiante)

  useEffect(() => {
    const fetchEstudiante = async () => {
      if (user?.email) {
        console.log("Evidencias: user.email disponible, intentando obtener estudiante:", user.email)
        try {
          const data = obtenerEstudiante(user.email)
          console.log("Evidencias: Datos de estudiante obtenidos de DataContext:", data)
          // Asegúrate de que 'evidencias' sea un array, incluso si está vacío
          if (data && !data.evidencias) {
            data.evidencias = []
          }
          setEstudiante(data)
        } catch (error) {
          console.error("Evidencias: Error al obtener estudiante del DataContext:", error)
          setEstudiante(null) // En caso de error, resetea el estudiante a null
        }
      } else {
        console.log("Evidencias: user.email NO disponible, reseteando estudiante a null.")
        setEstudiante(null)
      }
    }
    fetchEstudiante()
  }, [user, obtenerEstudiante])

  const handleFileChange = (e) => {
    setNewEvidencia({ ...newEvidencia, archivo: e.target.files[0] })
  }

  const handleUploadEvidencia = async (e) => {
    e.preventDefault()
    if (!newEvidencia.nombre || !newEvidencia.tipo || !newEvidencia.archivo) {
      alert("Por favor, completa todos los campos y selecciona un archivo.")
      return
    }
    const newEvidenciaData = {
      id: Date.now().toString(),
      titulo: newEvidencia.nombre, // Usar 'titulo' en lugar de 'nombre' para consistencia con el modelo de datos
      descripcion: "Evidencia subida por el estudiante.", // Puedes añadir un campo de descripción en el formulario si lo deseas
      tipo: newEvidencia.tipo,
      archivo: newEvidencia.archivo.name, // Guardar el nombre del archivo
      fechaSubida: new Date().toLocaleDateString("es-ES"),
      estado: "pendiente",
      url: URL.createObjectURL(newEvidencia.archivo),
      comentarios: "",
    }

    // Obtener las evidencias actuales del estudiante y añadir la nueva
    const currentEvidencias = estudiante?.evidencias || []
    const updatedEvidencias = [...currentEvidencias, newEvidenciaData]

    try {
      // Actualizar el estudiante en el DataContext
      await actualizarEstudiante(user.email, { evidencias: updatedEvidencias })
      // Actualizar el estado local del componente
      setEstudiante((prev) => ({ ...prev, evidencias: updatedEvidencias }))
      setNewEvidencia({ nombre: "", tipo: "", archivo: null })
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
      alert("Evidencia subida exitosamente. Esperando revisión.")
    } catch (error) {
      console.error("Evidencias: Error al subir evidencia:", error)
      alert("Error al subir evidencia. Por favor, inténtalo de nuevo.")
    }
  }

  const filteredEvidencias = estudiante?.evidencias?.filter((evidencia) => {
    const matchesSearch = evidencia.titulo.toLowerCase().includes(searchTerm.toLowerCase()) // Usar 'titulo'
    const matchesStatus = filterStatus === "all" || evidencia.estado === filterStatus
    return matchesSearch && matchesStatus
  })

  // Show loading spinner if user is not yet loaded or student data is not available
  if (!user || !estudiante) {
    console.log("Evidencias: Renderizando estado de carga. user:", user, "estudiante:", estudiante)
    return (
      <div
        className="loading-container"
        style={{
          backgroundColor: "#f0f2f5",
          padding: "50px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          // Añadido para asegurar visibilidad del spinner
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          width: "100%",
          position: "fixed", // Para que ocupe toda la pantalla si es necesario
          top: 0,
          left: 0,
          zIndex: 9999, // Asegura que esté por encima de todo
        }}
      >
        <div className="spinner"></div>
        <p style={{ color: "#3498db", fontWeight: "bold" }}>Cargando información de evidencias...</p>
        {!user && <p style={{ color: "#e74c3c", fontSize: "0.9em" }}>Usuario no autenticado o no cargado.</p>}
        {user && !estudiante && (
          <p style={{ color: "#e74c3c", fontSize: "0.9em" }}>Estudiante no encontrado para el usuario actual.</p>
        )}
      </div>
    )
  }

  // Si llegamos aquí, user y estudiante deberían ser válidos.
  console.log("Evidencias: Renderizando contenido principal. Estudiante final:", estudiante)

  return (
    <div className="evidencias-container">
      <div className="evidencias-header">
        <h1>Gestión de Evidencias</h1>
        <p>Sube y gestiona los documentos y archivos de tu práctica profesional.</p>
      </div>
      <div className="evidencias-content">
        {/* Sección de Subida de Evidencias */}
        <div className="section-card upload-section">
          <h2 className="section-title">
            <Upload /> Subir Nueva Evidencia
          </h2>
          <form onSubmit={handleUploadEvidencia} className="upload-form">
            <div className="form-group">
              <label htmlFor="nombreEvidencia">Nombre de la Evidencia</label>
              <input
                type="text"
                id="nombreEvidencia"
                value={newEvidencia.nombre}
                onChange={(e) => setNewEvidencia({ ...newEvidencia, nombre: e.target.value })}
                placeholder="Ej: Informe Semanal 1, Certificado de Horas"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="tipoEvidencia">Tipo de Evidencia</label>
              <select
                id="tipoEvidencia"
                value={newEvidencia.tipo}
                onChange={(e) => setNewEvidencia({ ...newEvidencia, tipo: e.target.value })}
                required
              >
                <option value="">Selecciona un tipo</option>
                <option value="informe">Informe</option>
                <option value="certificado">Certificado</option>
                <option value="presentacion">Presentación</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="archivoEvidencia">Archivo</label>
              <input type="file" id="archivoEvidencia" onChange={handleFileChange} ref={fileInputRef} required />
              {newEvidencia.archivo && <p className="file-info">Archivo seleccionado: {newEvidencia.archivo.name}</p>}
            </div>
            <button type="submit" className="btn-upload">
              <Upload size={20} /> Subir Evidencia
            </button>
          </form>
        </div>
        {/* Sección de Lista de Evidencias */}
        <div className="section-card evidencias-list-section">
          <h2 className="section-title">
            <FileText /> Mis Evidencias
          </h2>
          <div className="filters-and-search">
            <div className="search-bar">
              <Search size={20} />
              <input
                type="text"
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-status">
              <label htmlFor="filterStatus">Estado:</label>
              <select id="filterStatus" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">Todos</option>
                <option value="aprobado">Aprobado</option>
                <option value="pendiente">Pendiente</option>
                <option value="rechazado">Rechazado</option>
              </select>
            </div>
          </div>
          {filteredEvidencias?.length === 0 ? (
            <p className="empty-state-text">No hay evidencias que coincidan con tu búsqueda o filtros.</p>
          ) : (
            <div className="evidencias-table-container">
              <table className="evidencias-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Fecha Subida</th>
                    <th>Estado</th>
                    <th>Comentarios</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvidencias?.map((evidencia) => (
                    <tr key={evidencia.id}>
                      <td>{evidencia.titulo}</td> {/* Usar 'titulo' */}
                      <td>{evidencia.tipo}</td>
                      <td>{evidencia.fechaSubida}</td>
                      <td>
                        <span className={`status-badge ${evidencia.estado}`}>
                          {evidencia.estado === "aprobado" && <CheckCircle size={14} />}
                          {evidencia.estado === "pendiente" && <Info size={14} />}
                          {evidencia.estado === "rechazado" && <XCircle size={14} />}
                          {evidencia.estado}
                        </span>
                      </td>
                      <td>{evidencia.comentarios || "N/A"}</td>
                      <td>
                        <a
                          href={evidencia.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-action-download"
                        >
                          <Download size={18} />
                        </a>
                        {/* Aquí se podrían añadir botones para editar o eliminar si se permite */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Evidencias
