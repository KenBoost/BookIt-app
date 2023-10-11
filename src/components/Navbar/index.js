import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLinkedin,
  faGithub,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons'
import {
  faHome,
  faUser,
  faRightToBracket,
  faCog,

} from '@fortawesome/free-solid-svg-icons'
import { Link, NavLink } from 'react-router-dom'

import './index.scss'

const Navbar = () => {
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
          <NavLink to="/" activeClassName="active" exact>
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
          <NavLink to="/contacto" activeClassName="active">
            <FontAwesomeIcon icon={faRightToBracket} />
            Login
          </NavLink>
        </li>
      </ul>

      <div className="social-icons">
        <a href="tu-link-de-LinkedIn">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a href="tu-link-de-GitHub">
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a href="tu-link-de-Instagram">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>
    </nav>
  )
}

export default Navbar
