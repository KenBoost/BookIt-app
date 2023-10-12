import React, { useState } from 'react'

import { useUser } from '../UserProvider'; 

import { NavLink } from 'react-router-dom'
import Login from '../Login' // Importa el componente de inicio de sesión
import Register from '../Register'
import './index.scss'
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false); // Estado para controlar la visibilidad del formulario de inicio de sesión
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate(); //para redireccionar a otras paginas

  const { isLoggedIn, setUser, setIsLoggedIn } = useUser();

  
  const handleLogout = () => {
    // ...otros pasos de logout...
    setUser(null);
    setIsLoggedIn(false);
    navigate('./');
  };

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
      {isLoggedIn && (
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
          <button className='botonlogout' onClick={handleLogout}>Logout</button>
        ) : (
          <button className='botonlog' onClick={toggleLogin}>Login</button>
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
