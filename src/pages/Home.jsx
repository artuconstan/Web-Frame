"use client"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import "./Home.css"

const Home = () => {
  const { user } = useAuth()

  return (
    <div className="home-container">
      {/* Sección hero principal */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Sistema de Gestión de Prácticas Profesionales</h1>
          <p className="hero-description">
            Plataforma integral para la gestión y seguimiento de prácticas profesionales estudiantiles. Conecta
            estudiantes, coordinadores y empresas en un solo lugar.
          </p>

          {/* Botones de acción según el estado de autenticación */}

        </div>
      </section>

      {/* Sección de características */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Características Principales</h2>

          <div className="features-grid">
            {/* Característica 1 */}
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Dashboard Intuitivo</h3>
              <p>Visualiza estadísticas, progreso y información importante de manera clara y organizada.</p>
            </div>

            {/* Característica 2 */}
            <div className="feature-card">
              <div className="feature-icon">📁</div>
              <h3>Gestión de Evidencias</h3>
              <p>Sube y organiza evidencias de tu práctica profesional de forma segura y estructurada.</p>
            </div>

            {/* Característica 3 */}
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Reportes Detallados</h3>
              <p>Genera reportes completos sobre el progreso y desempeño de las prácticas profesionales.</p>
            </div>

            {/* Característica 4 */}
            <div className="feature-card">
              <div className="feature-icon">🏢</div>
              <h3>Registro de Empresas</h3>
              <p>Registra y gestiona información de empresas donde se realizan las prácticas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de información adicional */}
      <section className="info-section">
        <div className="container">
          <div className="info-content">
            <h2>¿Cómo funciona?</h2>
            <div className="steps-grid">
              <div className="step">
                <div className="step-number">1</div>
                <h3>Registro</h3>
                <p>Los estudiantes se registran en el sistema con sus credenciales institucionales.</p>
              </div>

              <div className="step">
                <div className="step-number">2</div>
                <h3>Asignación</h3>
                <p>Se asignan a empresas y coordinadores para el seguimiento de sus prácticas.</p>
              </div>

              <div className="step">
                <div className="step-number">3</div>
                <h3>Seguimiento</h3>
                <p>Suben evidencias y reciben retroalimentación continua de sus actividades.</p>
              </div>

              <div className="step">
                <div className="step-number">4</div>
                <h3>Evaluación</h3>
                <p>Se genera la evaluación final basada en el desempeño y evidencias presentadas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
