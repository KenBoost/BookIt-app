import React, { useState, useEffect } from "react";
import { useUser } from '../UserProvider'; 
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import EditarLibroModal from './updatemodal';
import "./index.scss";

const CRUD = () => {
  const [libros, setLibros] = useState([]);
  const [nuevoLibro, setNuevoLibro] = useState({ titulo: '', autor: '', genero: '', ano_publicacion:'', estado: '' });
  const [modalVisible, setModalVisible] = useState(false);
  const [bookToEdit, setBookToEdit] = useState(null);

  const { user } = useUser();
  const navigate = useNavigate();

  // Función para cargar la lista de libros desde la API
  const cargarLibros = async () => {
    try {
      const response = await axios.get("http://localhost:5000/obtener_libros"); // Ajusta la URL de la API
      setLibros(response.data);
    } catch (error) {
      console.error("Error al cargar la lista de libros:", error);
    }
  };

  // Función para manejar el envío de un nuevo libro
  const enviarNuevoLibro = async () => {
    try {
      await axios.post("http://localhost:5000/crear_libro", nuevoLibro); // Ajusta la URL de la API
      cargarLibros(); // Recarga la lista de libros después de agregar uno nuevo
    } catch (error) {
      console.error("Error al agregar un nuevo libro:", error);
    }
    setNuevoLibro({ titulo: '', autor: '', genero: '', ano_publicacion: '', estado: '' });
  };

  //Eliminar libro
  const eliminarLibro = async (libroId) => {
    try {
      await axios.delete(`http://localhost:5000/borrar_libro/${libroId}`);
      cargarLibros();
    } catch (error) {
      console.error('Error al eliminar el libro:', error);
    }
  };

  // Cargar la lista de libros cuando el componente se monta
  useEffect(() => {
    cargarLibros();
  }, []);
 
  //---------------------------------------------------------------------------
  //TODO LO DE EDITAR ----------------------------------
  //----------------------------------------------------------------------------

  const handleSaveEdit = (editedBook) => {
    const { _id, ...editedBookWithoutId } = editedBook; // Quita el campo _id
  
    axios
      .put(`http://localhost:5000/actualizar_libro/${bookToEdit}`, editedBookWithoutId)
      .then((response) => {
        setModalVisible(false);
        cargarLibros(); // Recarga la lista después de editar
      })
      .catch((error) => {
        console.error('Error al actualizar el libro:', error);
      });
  };

  const handleEditClick = (bookId) => {
    setBookToEdit(bookId);
    setModalVisible(true);
  };

  if (user && user.rol === 1) {  
  return (
    <div>
      <h2>Lista de Libros</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Género</th>
              <th>Año de Publicación</th>
              <th>Disponibilidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {libros.map((libro) => (
              <tr key={libro._id}>
                <td>{libro.titulo}</td>
                <td>{libro.autor}</td>
                <td>{libro.genero}</td>
                <td>{libro.ano_publicacion}</td>
                <td>{libro.estado}</td>
                <td>
                  <button
                    className="botonescrud"
                    onClick={() => handleEditClick(libro._id)}
                  >
                    <FontAwesomeIcon icon={faEdit} /> {/* Ícono de lápiz */}
                  </button>
                  <button
                    className="botonescrud eliminar"
                    onClick={() => eliminarLibro(libro._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} /> {/* Ícono de basurero */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalVisible && (
         <EditarLibroModal
         libroId={bookToEdit}
         onSave={handleSaveEdit}
         onClose={() => setModalVisible(false)}
        />
      )}
      <div className="nuevolibro">
      <h2>Agregar Nuevo Libro</h2>
      <input
        type="text"
        placeholder="Título"
        value={nuevoLibro.titulo}
        onChange={(e) =>
          setNuevoLibro({ ...nuevoLibro, titulo: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Autor"
        value={nuevoLibro.autor}
        onChange={(e) =>
          setNuevoLibro({ ...nuevoLibro, autor: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Género"
        value={nuevoLibro.genero}
        onChange={(e) =>
          setNuevoLibro({ ...nuevoLibro, genero: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Año"
        value={nuevoLibro.ano_publicacion}
        onChange={(e) =>
          setNuevoLibro({ ...nuevoLibro, ano_publicacion: e.target.value })
        }
      />
      <button className="agregar" onClick={enviarNuevoLibro}>Agregar Libro</button>
      </div>
    </div>
  );
  } else {
    // Redirigir a una página de acceso no autorizado u otra acción
    navigate('/unauthorized');
    //return null;
  }

};

export default CRUD;
