import React from 'react';
import './index.scss';


import './index.scss';
import { Link } from 'react-router-dom';

const UnAuthorized = () => {
  return (
    <div className="acceso-no-autorizado">
      <div className="contenido">
        <h1>Acceso No Autorizado</h1>
        <p>Lo siento, no tienes permiso para acceder a esta página.</p>
        <Link to="/">Ir a la página de inicio</Link>
      </div>
    </div>
  );
};

export default UnAuthorized;
