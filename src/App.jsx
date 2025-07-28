import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { DataProvider } from "./contexts/DataContext" // Importar DataProvider
import ProtectedRoute from "./components/ProtectedRoute"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Login from "./pages/Login"
import EstudianteDashboard from "./pages/EstudianteDashboard"
import CoordinadorDashboard from "./pages/CoordinadorDashboard"
import GestionEstudiantes from "./pages/GestionEstudiantes"
import RegistroEmpresa from "./pages/RegistroEmpresa"
import Evidencias from "./pages/Evidencias"
import Reportes from "./pages/Reportes"
import PanelEstudiante from "./pages/PanelEstudiante"
import "./App.css"

function App() {
  return (
    // Proveedor de contexto de autenticación para toda la app
    <AuthProvider>
      {/* Proveedor de contexto de datos para toda la app */}
      <DataProvider>
        <Router>
          <div className="App">
            {/* Header que se muestra en todas las páginas */}
            <Header />

            {/* Definición de todas las rutas de la aplicación */}
            <Routes>
              {/* Ruta pública - Página de inicio */}
              <Route path="/" element={<Home />} />

              {/* Ruta pública - Login */}
              <Route path="/login" element={<Login />} />

              {/* Rutas protegidas - Solo accesibles si el usuario está autenticado */}
              <Route
                path="/estudiante"
                element={
                  <ProtectedRoute>
                    <EstudianteDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Ruta alternativa para estudiante-dashboard */}
              <Route
                path="/estudiante-dashboard"
                element={
                  <ProtectedRoute>
                    <EstudianteDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/coordinador"
                element={
                  <ProtectedRoute>
                    <CoordinadorDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Nueva ruta para gestión de estudiantes */}
              <Route
                path="/gestion-estudiantes"
                element={
                  <ProtectedRoute>
                    <GestionEstudiantes />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/panel-estudiante"
                element={
                  <ProtectedRoute>
                    <PanelEstudiante />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/registro-empresa"
                element={
                  <ProtectedRoute>
                    <RegistroEmpresa />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/evidencias"
                element={
                  <ProtectedRoute>
                    <Evidencias />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/reportes"
                element={
                  <ProtectedRoute>
                    <Reportes />
                  </ProtectedRoute>
                }
              />
            </Routes>

            {/* Footer que se muestra en todas las páginas */}
            <Footer />
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  )
}

export default App
