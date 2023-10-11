import React, {useState} from 'react';
import axios from 'axios';
import './index.scss';
import Swal from 'sweetalert2';
import { useUser } from '../UserProvider'; 
import { useHistory } from 'react-router-dom'; // Importa useHistory



const Login = ({ onClose, onRegisterClick }) => {
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contrasena, setContrasena] = useState('');
  
  const history = useHistory(); // Obtiene el objeto history para redirección
  const { setUser } = useUser(); // Obtiene la función para actualizar el usuario

  
  //Metodo que llama al Login del Backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos de inicio de sesión
    const data = {
      correo_electronico: correoElectronico,
      contrasena: contrasena,
    };

    try {
      const response = await axios.post('http://localhost:5000/login', data);

      if (response.status === 200) {
        const usuario = response.data;
        // Hacer algo con el usuario, como almacenarlo en el estado de tu aplicación
        setUser(usuario);
        history.push('/profile');
      } else {    
        Swal('Error', 'No se pudo iniciar sesión, revise sus datos!', 'error');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };
  
  return (
    <div className="login-modal">
      <div className="login-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={correoElectronico}
            onChange={(e) => setCorreoElectronico(e.target.value)}
          />
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
          <button type="submit">Iniciar Sesión</button>
        </form>
        <p>No tienes cuenta? <button className='register-button' onClick={onRegisterClick}>Regístrate</button></p>
      </div>
    </div>
  );
};

export default Login;


