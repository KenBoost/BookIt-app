import './index.scss'

const Register = ({ onClose }) => {
    return (
      <div className="register-modal">
        <div className="register-content">
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
          <h2>Registro</h2>
          <form>
            <label htmlFor="newUsername">Nombre Usuario:</label>
            <input type="text" id="newUsername" name="newUsername" />
            <label htmlFor="newUsername">Correo Electrónico:</label>
            <input type="text" id="newEmail" name="newEmail" />
            <label htmlFor="newPassword">Nueva Contraseña:</label>
            <input type="password" id="newPassword" name="newPassword" />
            <button type="submit">Registrarse</button>
          </form>
        </div>
      </div>
    );
  };
  
  export default Register;
  