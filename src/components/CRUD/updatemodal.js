import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './update.scss'

const EditarLibroModal = ({ libroId, onSave, onClose }) => {
  const [editedBook, setEditedBook] = useState({
    titulo: '',
    autor: '',
    genero: '',
    ano_publicacion: '',
    estado: '',
  });

  useEffect(() => {
    // Cargar los datos del libro que se va a editar al abrir el modal
    cargarDatosLibro();
  }, [libroId]);

  const cargarDatosLibro = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/obtener_libro/${libroId}`);
      setEditedBook(response.data); // Cargar datos del libro a editar
    } catch (error) {
      console.error('Error al cargar los datos del libro:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBook({ ...editedBook, [name]: value });
  };

  const handleSave = () => {
    onSave(editedBook); // Guardar los cambios del libro
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Editar Libro</h2>
        <label>Título:</label>
        <input
          type="text"
          value={editedBook.titulo}
          onChange={(e) => setEditedBook({ ...editedBook, titulo: e.target.value })}
        />
        <label>Autor:</label>
        <input
          type="text"
          value={editedBook.autor}
          onChange={(e) => setEditedBook({ ...editedBook, autor: e.target.value })}
        />
        <label>Género:</label>
        <input
          type="text"
          value={editedBook.genero}
          onChange={(e) => setEditedBook({ ...editedBook, genero: e.target.value })}
        />
        <label>Año de Publicación:</label>
        <input
          type="text"
          value={editedBook.ano_publicacion}
          onChange={(e) => setEditedBook({ ...editedBook, ano_publicacion: e.target.value })}
        />
        <label>Estado:</label>
        <input
          type="text"
          value={editedBook.estado}
          onChange={(e) => setEditedBook({ ...editedBook, estado: e.target.value })}
        />
        <button onClick={handleSave}>Guardar</button>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default EditarLibroModal;
