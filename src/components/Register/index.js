import './index.scss'

import React, { useState } from 'react';


const Register = ({ onClose }) => {
  const [formData, setFormData] = useState({
    newUsername: '',
    newEmail: '',
    newPassword: '',
  });
  
  const [passwordError, setPasswordError] = useState('');



  const handleSubmit = async (e) => {
    
    console.log("probando")
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/crear_usuario',  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.newUsername,
          correo_electronico: formData.newEmail,
          contrasena: formData.newPassword,
        }),
      });

      if (response.status === 201) {
        // El usuario se creó con éxito, puedes mostrar un mensaje de éxito o cerrar el modal
        onClose();
      } else {
        // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="register-modal">
      <div className="register-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Registro</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="newUsername">Nombre de Usuario:</label>
          <input
           placeholder="Su nombre..."
            type="text"
            id="newUsername"
            name="newUsername"
            value={formData.newUsername}
            onChange={(e) => setFormData({ ...formData, newUsername: e.target.value })}
          />
          <label htmlFor="newEmail">Correo Electrónico:</label>
          <input
            placeholder="Su Email..."
            type="text"
            id="newEmail"
            name="newEmail"
            value={formData.newEmail}
            onChange={(e) => setFormData({ ...formData, newEmail: e.target.value })}
          />
          <label htmlFor="newPassword">Nueva Contraseña:</label>
          <input
            placeholder="Su Contraseña..."
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
          />
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
