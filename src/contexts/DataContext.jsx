"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"

const DataContext = createContext(null)

export const DataProvider = ({ children }) => {
  // Default data for students
  const defaultStudents = [
    {
      id: 1,
      email: "estudiante@example.com",
      password: "password",
      userType: "estudiante",
      nombre: "Ana María González",
      carrera: "Ingeniería en Software",
      institucion: "Universidad XYZ",
      estado: "activo", // activo, retrasado, completado
      empresa: "Tech Solutions Inc.",
      supervisor: "Juan Pérez",
      progresoGeneral: 33,
      horasCompletadas: 156,
      horasRequeridas: 480,
      evidenciasSubidas: 8,
      evidenciasAprobadas: 6,
      calificacion: 17.5,
      actividadesRecientes: [
        {
          id: 1,
          descripcion: "Desarrollo de módulo de autenticación",
          fecha: "2024-07-20",
          estado: "completado",
        },
        {
          id: 2,
          descripcion: "Reunión de planificación de sprint",
          fecha: "2024-07-18",
          estado: "completado",
        },
        {
          id: 3,
          descripcion: "Investigación de nuevas tecnologías",
          fecha: "2024-07-15",
          estado: "pendiente",
        },
      ],
      proximasActividades: [
        { id: 4, descripcion: "Presentación de avance de proyecto", fecha: "2024-08-01" },
        { id: 5, descripcion: "Revisión de código con el equipo", fecha: "2024-07-29" },
      ],
      notificaciones: [
        { id: 1, mensaje: "Nueva evidencia aprobada: 'Diseño UI/UX'", leida: false },
        { id: 2, mensaje: "Recordatorio: Reporte semanal pendiente", leida: false },
        { id: 3, mensaje: "Tu práctica ha alcanzado el 30% de progreso", leida: true },
      ],
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
          url: "/placeholder.pdf?query=diseno_bd", // Placeholder URL
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
          url: "/placeholder.zip?query=api_rest", // Placeholder URL
        },
        {
          id: 3,
          titulo: "Pruebas Unitarias",
          descripcion: "Suite de pruebas para los módulos principales",
          tipo: "documento",
          archivo: "pruebas_unitarias.zip",
          fechaSubida: "2024-07-20",
          estado: "rechazada",
          comentarios: "Necesita más cobertura de casos de borde.",
          url: "/placeholder.zip?query=pruebas_unitarias", // Placeholder URL
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
          url: "/placeholder.pdf?query=reporte_semanal_1", // Placeholder URL
        },
        {
          id: 2,
          titulo: "Reporte Semanal - Semana 2",
          tipo: "semanal",
          periodo: "08/07/2024 - 14/07/2024",
          fechaGeneracion: "2024-07-14",
          horasRegistradas: 38,
          actividades: 4,
          estado: "pendiente",
          comentarios: "",
          url: "/placeholder.pdf?query=reporte_semanal_2", // Placeholder URL
        },
      ],
      empresaInfo: {
        nombre: "Tech Solutions Inc.",
        ruc: "1234567890001",
        direccion: "Av. Principal 123",
        telefono: "0987654321",
        contacto: "Juan Pérez",
        cargoContacto: "Gerente de Proyectos",
        emailContacto: "juan.perez@techsolutions.com",
      },
    },
    {
      id: 2,
      email: "carlos.rodriguez@example.com",
      password: "password",
      userType: "estudiante",
      nombre: "Carlos Rodríguez",
      carrera: "Marketing Digital",
      institucion: "Universidad ABC",
      estado: "retrasado",
      empresa: "Innovate Marketing Corp",
      supervisor: "María López",
      progresoGeneral: 25,
      horasCompletadas: 120,
      horasRequeridas: 480,
      evidenciasSubidas: 5,
      evidenciasAprobadas: 3,
      calificacion: 16.0,
      actividadesRecientes: [],
      proximasActividades: [],
      notificaciones: [],
      evidencias: [
        {
          id: 4,
          titulo: "Análisis de Mercado",
          descripcion: "Estudio de mercado para campaña digital",
          tipo: "presentacion",
          archivo: "analisis_mercado.pptx",
          fechaSubida: "2024-07-01",
          estado: "aprobada",
          comentarios: "Muy detallado y bien estructurado.",
          url: "/placeholder.pptx?query=analisis_mercado", // Placeholder URL
        },
        {
          id: 5,
          titulo: "Propuesta de Campaña",
          descripcion: "Propuesta completa para campaña en redes sociales",
          tipo: "documento",
          archivo: "propuesta_campana.pdf",
          fechaSubida: "2024-07-08",
          estado: "pendiente",
          comentarios: "",
          url: "/placeholder.pdf?query=propuesta_campana", // Placeholder URL
        },
      ],
      reportes: [
        {
          id: 3,
          titulo: "Reporte Mensual - Julio",
          tipo: "mensual",
          periodo: "01/07/2024 - 31/07/2024",
          fechaGeneracion: "2024-07-31",
          horasRegistradas: 120,
          actividades: 8,
          estado: "pendiente",
          comentarios: "",
          url: "/placeholder.pdf?query=reporte_mensual_julio", // Placeholder URL
        },
      ],
      empresaInfo: {
        nombre: "Innovate Marketing Corp",
        ruc: "0987654321001",
        direccion: "Calle Comercial 456",
        telefono: "0912345678",
        contacto: "María López",
        cargoContacto: "Directora de Marketing",
        emailContacto: "maria.lopez@innovatemarketing.com",
      },
    },
  ]

  const defaultCoordinadores = [
    {
      id: 3,
      email: "coordinador@example.com",
      password: "password",
      userType: "coordinador",
      nombre: "Coordinador General",
    },
  ]

  const defaultEmpresas = [] // Assuming no default companies are needed for now

  // Initialize state from localStorage or with default data for each key
  const [data, setData] = useState(() => {
    if (typeof window !== "undefined") {
      const savedStudents = localStorage.getItem("estudiantes")
      const savedCoordinadores = localStorage.getItem("coordinadores")
      const savedEmpresas = localStorage.getItem("empresas")
      const savedUser = localStorage.getItem("user") // Assuming 'user' might also be stored separately

      let initialStudents = defaultStudents
      if (savedStudents) {
        const parsedStudents = JSON.parse(savedStudents)
        // Only use saved students if the array is not empty
        if (parsedStudents.length > 0) {
          initialStudents = parsedStudents
        }
      }

      let initialCoordinadores = defaultCoordinadores
      if (savedCoordinadores) {
        const parsedCoordinadores = JSON.parse(savedCoordinadores)
        if (parsedCoordinadores.length > 0) {
          initialCoordinadores = parsedCoordinadores
        }
      }

      let initialEmpresas = defaultEmpresas
      if (savedEmpresas) {
        const parsedEmpresas = JSON.parse(savedEmpresas)
        if (parsedEmpresas.length > 0) {
          initialEmpresas = parsedEmpresas
        }
      }

      return {
        students: initialStudents,
        coordinadores: initialCoordinadores,
        empresas: initialEmpresas,
        user: savedUser ? JSON.parse(savedUser) : null, // 'user' might be null if not logged in
      }
    }
    return { students: [], coordinadores: [], empresas: [], user: null } // Default empty if not in browser
  })

  const [loading, setLoading] = useState(false)

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("estudiantes", JSON.stringify(data.students))
      localStorage.setItem("coordinadores", JSON.stringify(data.coordinadores))
      localStorage.setItem("empresas", JSON.stringify(data.empresas))
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user))
      } else {
        localStorage.removeItem("user") // Clear user if logged out
      }
    }
  }, [data])

  // --- Student Data Management ---
  const obtenerEstudiante = useCallback(
    (email) => {
      return data.students.find((s) => s.email === email && s.userType === "estudiante")
    },
    [data.students],
  )

  const actualizarEstudiante = useCallback((email, newData) => {
    setData((prevData) => ({
      ...prevData,
      students: prevData.students.map((s) =>
        s.email === email && s.userType === "estudiante" ? { ...s, ...newData } : s,
      ),
    }))
  }, [])

  const agregarEvidencia = useCallback((studentEmail, newEvidencia) => {
    setData((prevData) => ({
      ...prevData,
      students: prevData.students.map((s) => {
        if (s.email === studentEmail && s.userType === "estudiante") {
          const evidenciaConId = {
            id: Date.now(),
            fechaSubida: new Date().toISOString().split("T")[0],
            estado: "pendiente",
            comentarios: "",
            ...newEvidencia,
          }
          return {
            ...s,
            evidencias: [evidenciaConId, ...(s.evidencias || [])],
            evidenciasSubidas: (s.evidenciasSubidas || 0) + 1,
            notificaciones: [
              { id: Date.now() + 1, mensaje: `Nueva evidencia subida: '${newEvidencia.titulo}'`, leida: false },
              ...(s.notificaciones || []),
            ],
          }
        }
        return s
      }),
    }))
    return true
  }, [])

  const actualizarEstadoEvidencia = useCallback((estudianteId, evidenciaId, nuevoEstado, comentarios) => {
    setData((prevData) => ({
      ...prevData,
      students: prevData.students.map((s) => {
        if (s.id === estudianteId && s.userType === "estudiante") {
          return {
            ...s,
            evidencias: s.evidencias.map((e) =>
              e.id === evidenciaId ? { ...e, estado: nuevoEstado, comentarios: comentarios } : e,
            ),
            evidenciasAprobadas: nuevoEstado === "aprobada" ? (s.evidenciasAprobadas || 0) + 1 : s.evidenciasAprobadas,
            notificaciones: [
              {
                id: Date.now(),
                mensaje: `Tu evidencia '${s.evidencias.find((e) => e.id === evidenciaId)?.titulo}' ha sido ${nuevoEstado}.`,
                leida: false,
              },
              ...(s.notificaciones || []),
            ],
          }
        }
        return s
      }),
    }))
  }, [])

  const agregarReporte = useCallback((studentEmail, newReporte) => {
    setData((prevData) => ({
      ...prevData,
      students: prevData.students.map((s) => {
        if (s.email === studentEmail && s.userType === "estudiante") {
          const reporteConId = {
            id: Date.now(),
            fechaGeneracion: new Date().toISOString().split("T")[0],
            estado: "pendiente",
            comentarios: "",
            ...newReporte,
          }
          return {
            ...s,
            reportes: [reporteConId, ...(s.reportes || [])],
            notificaciones: [
              { id: Date.now() + 1, mensaje: `Nuevo reporte generado: '${newReporte.titulo}'`, leida: false },
              ...(s.notificaciones || []),
            ],
          }
        }
        return s
      }),
    }))
    return true
  }, [])

  const actualizarEstadoReporte = useCallback((estudianteId, reporteId, nuevoEstado, comentarios) => {
    setData((prevData) => ({
      ...prevData,
      students: prevData.students.map((s) => {
        if (s.id === estudianteId && s.userType === "estudiante") {
          return {
            ...s,
            reportes: s.reportes.map((r) =>
              r.id === reporteId ? { ...r, estado: nuevoEstado, comentarios: comentarios } : r,
            ),
            notificaciones: [
              {
                id: Date.now(),
                mensaje: `Tu reporte '${s.reportes.find((r) => r.id === reporteId)?.titulo}' ha sido ${nuevoEstado}.`,
                leida: false,
              },
              ...(s.notificaciones || []),
            ],
          }
        }
        return s
      }),
    }))
  }, [])

  const marcarNotificacionLeida = useCallback((studentEmail, notificacionId) => {
    setData((prevData) => ({
      ...prevData,
      students: prevData.students.map((s) => {
        if (s.email === studentEmail && s.userType === "estudiante") {
          return {
            ...s,
            notificaciones: s.notificaciones.map((n) => (n.id === notificacionId ? { ...n, leida: true } : n)),
          }
        }
        return s
      }),
    }))
  }, [])

  // --- Coordinator Data Management ---
  const obtenerTodosLosEstudiantes = useCallback(() => {
    return data.students.filter((s) => s.userType === "estudiante")
  }, [data.students])

  const obtenerEvidenciasPendientes = useCallback(() => {
    const allStudents = obtenerTodosLosEstudiantes()
    return allStudents.flatMap((student) =>
      (student.evidencias || [])
        .filter((e) => e.estado === "pendiente")
        .map((e) => ({ ...e, studentEmail: student.email, studentName: student.nombre, studentId: student.id })),
    )
  }, [obtenerTodosLosEstudiantes])

  const obtenerReportesPendientes = useCallback(() => {
    const allStudents = obtenerTodosLosEstudiantes()
    return allStudents.flatMap((student) =>
      (student.reportes || [])
        .filter((r) => r.estado === "pendiente")
        .map((r) => ({ ...r, studentEmail: student.email, studentName: student.nombre, studentId: student.id })),
    )
  }, [obtenerTodosLosEstudiantes])

  // Function to update the 'user' state in DataContext
  const setUserData = useCallback((userData) => {
    setData((prevData) => ({
      ...prevData,
      user: userData,
    }))
  }, [])

  const value = React.useMemo(
    () => ({
      // Datos compatibles con GestionEstudiantes
      estudiantes: data.students.filter((s) => s.userType === "estudiante"),
      loading,

      // Funciones originales
      data, // Keep data for internal use if needed
      setData, // Keep setData for internal use if needed
      obtenerEstudiante,
      actualizarEstudiante,
      agregarEvidencia,
      actualizarEstadoEvidencia,
      agregarReporte,
      actualizarEstadoReporte,
      marcarNotificacionLeida,
      obtenerTodosLosEstudiantes,
      obtenerEvidenciasPendientes,
      obtenerReportesPendientes,
      // Expose user and setUserData for AuthContext
      user: data.user,
      setUserData,
    }),
    [
      data,
      loading,
      obtenerEstudiante,
      actualizarEstudiante,
      agregarEvidencia,
      actualizarEstadoEvidencia,
      agregarReporte,
      actualizarEstadoReporte,
      marcarNotificacionLeida,
      obtenerTodosLosEstudiantes,
      obtenerEvidenciasPendientes,
      obtenerReportesPendientes,
      setUserData,
    ],
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}
