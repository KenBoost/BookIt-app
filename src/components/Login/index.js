import React from 'react';
import './index.scss';


const Login = ({ onClose, onRegisterClick }) => {
  return (
    <div className="login-modal">
      <div className="login-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Iniciar Sesión</h2>
        <form>
          <label htmlFor="username">Usuario:</label>
          <input type="text" id="username" name="username" />
          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" name="password" />
          <button type="submit">Iniciar Sesión</button>
        </form>
        <p>No tienes cuenta? <button className='register-button' onClick={onRegisterClick}>Regístrate</button></p>
      </div>
    </div>
  );
};

export default Login;


