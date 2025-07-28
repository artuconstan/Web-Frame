import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>AUTÓNOMO</h3>
            <p>Sistema de Gestión de Prácticas Profesionales</p>
          </div>

          <div className="footer-section">
            <h4>Enlaces</h4>
            <ul>
              <li>
                <a href="/">Inicio</a>
              </li>
              <li>
                <a href="/login">Iniciar Sesión</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contacto</h4>
            <p>Email: info@autonomo.edu</p>
            <p>Teléfono: (123) 456-7890</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 AUTÓNOMO. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
