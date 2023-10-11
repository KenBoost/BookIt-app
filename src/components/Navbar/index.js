import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUser, faRightToBracket, faCog} from '@fortawesome/free-solid-svg-icons';

import { Link, NavLink } from 'react-router-dom'
import Login from '../Login' // Importa el componente de inicio de sesión
import Register from '../Register'
import Profile from '../Profile'
import './index.scss'

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false); // Estado para controlar la visibilidad del formulario de inicio de sesión
  const [showRegister, setShowRegister] = useState(false);

  const toggleLogin = () => {
    setShowLogin(!showLogin); // Alternar la visibilidad del formulario de inicio de sesión
  };
  
  const toggleRegister = () => {
    setShowRegister(!showRegister); // Alternar la visibilidad del formulario de registro
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <NavLink to="/" activeclassname="active">
            Inicio
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/crud" activeclassname="active">      
            Mantenimientos
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/profile" activeclassname="active">  
            Perfil
          </NavLink>
        </li>
        <li className="navbar-item">
          <button onClick={toggleLogin}>         
            Login
          </button>
        </li>
      </ul>
      {showLogin && <Login onClose={toggleLogin} onRegisterClick={toggleRegister} />}
      {showRegister && <Register onClose={toggleRegister} />}
    </nav>
  );
};

export default Navbar;
