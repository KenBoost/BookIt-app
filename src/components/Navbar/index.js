import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub, faInstagram, } from '@fortawesome/free-brands-svg-icons'
import { faHome, faUser, faRightToBracket, faCog} from '@fortawesome/free-solid-svg-icons';

import { Link, NavLink } from 'react-router-dom'
import Login from '../Login' // Importa el componente de inicio de sesión
import './index.scss'

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false); // Estado para controlar la visibilidad del formulario de inicio de sesión

  const toggleLogin = () => {
    setShowLogin(!showLogin); // Alternar la visibilidad del formulario de inicio de sesión
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <NavLink to="/" activeClassName="active" exact>
            <FontAwesomeIcon icon={faHome} />
            Inicio
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/perfil" activeClassName="active">
            <FontAwesomeIcon icon={faCog} />
            Mantenimientos
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/perfil" activeClassName="active">
            <FontAwesomeIcon icon={faUser} />
            Perfil
          </NavLink>
        </li>
        <li className="navbar-item">
          <button onClick={toggleLogin}>
            <FontAwesomeIcon icon={faRightToBracket} />
            Login
          </button>
        </li>
      </ul>
      {showLogin && <Login onClose={toggleLogin} />} {/* Muestra el formulario de inicio de sesión si showLogin es true */}
    </nav>
  );
};

export default Navbar;
