import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.scss";

const CRUD = () => {
  const [libros, setLibros] = useState([]);
  const [nuevoLibro, setNuevoLibro] = useState({ titulo: "", autor: "" });

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
  };

  // Cargar la lista de libros cuando el componente se monta
  useEffect(() => {
    cargarLibros();
  }, []);

  return (
    <div>
      <h2>Lista de Libros</h2>
      <ul>
        {libros.map((libro) => (
          <li key={libro.id}>
            Título: {libro.titulo} - Autor: {libro.autor} - Género:
            {libro.genero} - Año de Publicación: {libro.ano_publicacion} -
            Estado: {libro.estado}
          </li>
        ))}
      </ul>

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
      <button onClick={enviarNuevoLibro}>Agregar Libro</button>
    </div>
  );
};

export default CRUD;
