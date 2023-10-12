import React, { useState } from 'react'

import { useUser } from '../UserProvider'; 
import { NavLink } from 'react-router-dom'
import Login from '../Login' // Importa el componente de inicio de sesión
import Register from '../Register'
import './index.scss'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import LogoS from '../../assets/images/logo.png'


const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false); // Estado para controlar la visibilidad del formulario de inicio de sesión
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate(); //para redireccionar a otras paginas

  const { user, isLoggedIn, setUser, setIsLoggedIn } = useUser();


  const handleLogout = () => {
    // ...otros pasos de logout...
    setUser(null);
    setIsLoggedIn(false);
    navigate('./');
    Swal.fire('¡Aviso!', `Su sesión ha finalizado.`, 'info');
  };

  const toggleLogin = () => {
    setShowLogin(!showLogin); // Alternar la visibilidad del formulario de inicio de sesión
  };
  
  const toggleRegister = () => {
    setShowRegister(!showRegister); // Alternar la visibilidad del formulario de registro
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src= {LogoS} alt="Logo de tu marca" />
        
      </div>
      <li className="navbar-item">
          <NavLink to="/" activeclassname="active">
            BookIt
          </NavLink>
        </li>
      <ul className="navbar-list">
        {isLoggedIn && user.rol === 1 && (
          <li className="navbar-item nav-link-ltr">
            <NavLink to="/crud" activeclassname="active">
              Mantenimientos
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li className="navbar-item">
            <NavLink to="/profile" activeclassname="active">
              Perfil
            </NavLink>
          </li>
        )}
        <li className="navbar-item">
          {isLoggedIn ? (
            <button className="botonlogout" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="botonlog" onClick={toggleLogin}>
              Login
            </button>
          )}
        </li>
      </ul>
      {showLogin && (
        <Login onClose={toggleLogin} onRegisterClick={toggleRegister} />
      )}
      {showRegister && <Register onClose={toggleRegister} />}
    </nav>
  );
};

export default Navbar;
