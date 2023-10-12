import React, {useState} from 'react';
import axios from 'axios';
import './index.scss';
import Swal from 'sweetalert2';
import { useUser } from '../UserProvider'; 
import { useNavigate } from 'react-router-dom';

const Login = ({ onClose, onRegisterClick }) => {
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contrasena, setContrasena] = useState('');
  
  const navigate = useNavigate(); //para redireccionar a otras paginas
  const { setUser, setIsLoggedIn } = useUser(); // Obtiene la función para actualizar el usuario

  
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
        setUser(usuario);
        setIsLoggedIn(true);   
        navigate('./profile');
        onClose();
        Swal.fire('¡Bienvenido!', `Hola, ${usuario.nombre}! Has iniciado sesión exitosamente.`, 'success');

      } else {    
        Swal.fire('Error', 'No se pudo iniciar sesión, revise sus datos.', 'error');
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
          <label htmlFor="username">Correo:</label>
          <input
            placeholder="Email..."
            type="text"
            id="username"
            name="username"
            value={correoElectronico}
            onChange={(e) => setCorreoElectronico(e.target.value)}
          />
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            placeholder="Contraseña..."
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


