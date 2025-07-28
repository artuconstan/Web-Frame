"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"

const DataContext = createContext(null)

export const DataProvider = ({ children }) => {
  const [estudiantes, setEstudiantes] = useState(() => {
    // Cargar datos iniciales desde localStorage o un mock
    const savedEstudiantes = localStorage.getItem("estudiantes")
    return savedEstudiantes
      ? JSON.parse(savedEstudiantes)
      : [
          {
            id: "est1",
            email: "estudiante@example.com",
            password: "password",
            rol: "estudiante",
            nombre: "Estudiante Demo",
            carrera: "Ingeniería en Software",
            institucion: "Universidad XYZ",
            progresoGeneral: 33,
            horasCompletadas: 156,
            horasRequeridas: 480,
            evidenciasSubidas: 8,
            evidenciasAprobadas: 6,
            calificacionPromedio: 17.5,
            actividadesRecientes: [
              {
                id: "act1",
                descripcion: "Subida de evidencia de informe mensual",
                fecha: "2024-07-20",
                estado: "completado",
              },
              {
                id: "act2",
                descripcion: "Revisión de progreso con coordinador",
                fecha: "2024-07-15",
                estado: "completado",
              },
              {
                id: "act3",
                descripcion: "Inicio de proyecto final de práctica",
                fecha: "2024-07-01",
                estado: "completado",
              },
            ],
            proximasActividades: [
              {
                id: "prox1",
                descripcion: "Entrega de informe final",
                fecha: "2024-08-30",
                estado: "pendiente",
              },
              {
                id: "prox2",
                descripcion: "Presentación de proyecto",
                fecha: "2024-09-10",
                estado: "pendiente",
              },
            ],
            notificaciones: [
              {
                id: "notif1",
                mensaje: "Tu evidencia 'Informe Semanal 3' ha sido aprobada.",
                fecha: "2024-07-22",
                tipo: "aprobacion",
                leida: false,
              },
              {
                id: "notif2",
                mensaje: "Recordatorio: Entrega de informe mensual pendiente.",
                fecha: "2024-07-25",
                tipo: "recordatorio",
                leida: false,
              },
              {
                id: "notif3",
                mensaje: "Nueva actividad asignada: Preparar presentación final.",
                fecha: "2024-07-18",
                tipo: "info",
                leida: true,
              },
            ],
            // Datos para Mi Panel
            informacionPersonal: {
              cedula: "1234567890",
              fechaNacimiento: "2000-01-15",
              telefono: "0987654321",
              direccion: "Av. Principal 123, Ciudad",
            },
            informacionAcademica: {
              nivel: "Pregrado",
              semestre: "8vo",
              fechaInicioPractica: "2024-03-01",
              fechaFinPractica: "2024-08-30",
            },
            informacionEmpresa: {
              nombreEmpresa: "Tech Solutions S.A.",
              ruc: "1792123456001",
              direccionEmpresa: "Calle Ficticia 456, Ciudad",
              telefonoEmpresa: "022555666",
              nombreContacto: "Ing. Ana García",
              cargoContacto: "Gerente de Proyectos",
              emailContacto: "ana.garcia@techsolutions.com",
            },
            documentos: [
              { id: "doc1", nombre: "Carta de Compromiso", url: "#", fechaSubida: "2024-03-05" },
              { id: "doc2", nombre: "Convenio de Prácticas", url: "#", fechaSubida: "2024-03-10" },
            ],
            notas: [
              {
                id: "nota1",
                titulo: "Reunión con tutor",
                contenido: "Discutir avances del proyecto.",
                fecha: "2024-07-20",
              },
            ],
            evidencias: [
              // Añadimos datos de evidencias de ejemplo aquí
              {
                id: "e1",
                nombre: "Informe de Avance - Semana 1",
                tipo: "informe",
                fechaSubida: "2024-07-01",
                estado: "aprobado",
                comentarios: "Excelente detalle en el progreso.",
                url: "#",
              },
              {
                id: "e2",
                nombre: "Bitácora Semanal - Julio 1",
                tipo: "informe",
                fechaSubida: "2024-07-08",
                estado: "pendiente",
                comentarios: "",
                url: "#",
              },
              {
                id: "e3",
                nombre: "Presentación de Proyecto - Fase Inicial",
                tipo: "presentacion",
                fechaSubida: "2024-07-15",
                estado: "rechazado",
                comentarios: "Falta incluir el cronograma actualizado.",
                url: "#",
              },
            ],
          },
          {
            id: "est2",
            email: "otroestudiante@example.com",
            nombre: "Otro Estudiante",
            carrera: "Diseño Gráfico",
            institucion: "Instituto Creativo",
            progresoGeneral: 50,
            horasCompletadas: 240,
            horasRequeridas: 480,
            evidenciasSubidas: 10,
            evidenciasAprobadas: 8,
            calificacionPromedio: 18.0,
            actividadesRecientes: [],
            proximasActividades: [],
            notificaciones: [],
            informacionPersonal: {
              cedula: "0987654321",
              fechaNacimiento: "1999-05-20",
              telefono: "0912345678",
              direccion: "Av. Secundaria 789, Pueblo",
            },
            informacionAcademica: {
              nivel: "Pregrado",
              semestre: "7mo",
              fechaInicioPractica: "2024-02-15",
              fechaFinPractica: "2024-07-15",
            },
            informacionEmpresa: {
              nombreEmpresa: "Creative Studio",
              ruc: "0987654321001",
              direccionEmpresa: "Calle del Arte 10, Pueblo",
              telefonoEmpresa: "042111222",
              nombreContacto: "Sra. Laura Pérez",
              cargoContacto: "Directora de Arte",
              emailContacto: "laura.perez@creativestudio.com",
            },
            documentos: [],
            notas: [],
            evidencias: [], // Aseguramos que también tenga un array de evidencias
          },
        ]
  })

  const [coordinadores, setCoordinadores] = useState(() => {
    const savedCoordinadores = localStorage.getItem("coordinadores")
    return savedCoordinadores
      ? JSON.parse(savedCoordinadores)
      : [
          {
            id: "coord1",
            email: "coordinador@example.com",
            password: "password",
            rol: "coordinador",
            nombre: "Dr. Carlos Ruiz",
            departamento: "Vinculación con la Sociedad",
          },
        ]
  })

  const [empresas, setEmpresas] = useState(() => {
    const savedEmpresas = localStorage.getItem("empresas")
    return savedEmpresas
      ? JSON.parse(savedEmpresas)
      : [
          {
            id: "emp1",
            nombre: "Innovatech",
            ruc: "1790000000001",
            direccion: "Calle Falsa 123",
            contacto: "Maria Lopez",
            telefono: "0987654321",
            email: "info@innovatech.com",
          },
        ]
  })

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    localStorage.setItem("estudiantes", JSON.stringify(estudiantes))
  }, [estudiantes])

  useEffect(() => {
    localStorage.setItem("coordinadores", JSON.stringify(coordinadores))
  }, [coordinadores])

  useEffect(() => {
    localStorage.setItem("empresas", JSON.stringify(empresas))
  }, [empresas])

  const obtenerEstudiante = useCallback(
    (email) => {
      setIsLoading(true)
      return new Promise((resolve) => {
        setTimeout(() => {
          const estudiante = estudiantes.find((est) => est.email === email)
          setIsLoading(false)
          resolve(estudiante)
        }, 500)
      })
    },
    [estudiantes],
  )

  const obtenerTodosEstudiantes = useCallback(() => {
    setIsLoading(true)
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(false)
        resolve(estudiantes)
      }, 500)
    })
  }, [estudiantes])

  const obtenerCoordinador = useCallback(
    (email) => {
      setIsLoading(true)
      return new Promise((resolve) => {
        setTimeout(() => {
          const coordinador = coordinadores.find((coord) => coord.email === email)
          setIsLoading(false)
          resolve(coordinador)
        }, 500)
      })
    },
    [coordinadores],
  )

  const registrarEmpresa = useCallback((estudianteEmail, empresaData) => {
    setEstudiantes((prevEstudiantes) =>
      prevEstudiantes.map((est) =>
        est.email === estudianteEmail ? { ...est, empresaRegistrada: { ...empresaData, estado: "pendiente" } } : est,
      ),
    )
  }, [])

  const actualizarEstadoEmpresa = useCallback((estudianteEmail, nuevoEstado) => {
    setEstudiantes((prevEstudiantes) =>
      prevEstudiantes.map((est) =>
        est.email === estudianteEmail
          ? { ...est, empresaRegistrada: { ...est.empresaRegistrada, estado: nuevoEstado } }
          : est,
      ),
    )
  }, [])

  const actualizarEstudiante = useCallback((email, newData) => {
    setEstudiantes((prevEstudiantes) =>
      prevEstudiantes.map((est) =>
        est.email === email
          ? {
              ...est,
              ...newData,
              informacionPersonal: { ...est.informacionPersonal, ...newData.informacionPersonal },
              informacionAcademica: { ...est.informacionAcademica, ...newData.informacionAcademica },
              informacionEmpresa: { ...est.informacionEmpresa, ...newData.informacionEmpresa },
              // Manejo específico para arrays que deben ser fusionados o sobrescritos
              documentos: newData.documentos !== undefined ? newData.documentos : est.documentos,
              notas: newData.notas !== undefined ? newData.notas : est.notas,
              evidencias: newData.evidencias !== undefined ? newData.evidencias : est.evidencias,
              actividadesRecientes:
                newData.actividadesRecientes !== undefined ? newData.actividadesRecientes : est.actividadesRecientes,
              proximasActividades:
                newData.proximasActividades !== undefined ? newData.proximasActividades : est.proximasActividades,
              notificaciones: newData.notificaciones !== undefined ? newData.notificaciones : est.notificaciones,
            }
          : est,
      ),
    )
  }, [])

  const marcarNotificacionLeida = useCallback((email, notificationId) => {
    setEstudiantes((prevEstudiantes) =>
      prevEstudiantes.map((est) =>
        est.email === email
          ? {
              ...est,
              notificaciones: est.notificaciones.map((notif) =>
                notif.id === notificationId ? { ...notif, leida: true } : notif,
              ),
            }
          : est,
      ),
    )
  }, [])

  const value = {
    estudiantes,
    coordinadores,
    empresas,
    isLoading,
    obtenerEstudiante,
    obtenerTodosEstudiantes,
    obtenerCoordinador,
    registrarEmpresa,
    actualizarEstadoEmpresa,
    actualizarEstudiante, // <-- Aseguramos que esté disponible
    marcarNotificacionLeida,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}
