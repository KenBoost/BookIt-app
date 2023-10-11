import React from 'react';
import './index.scss';


const Login = ({ onClose }) => {
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
      </div>
    </div>
  );
};

export default Login;


