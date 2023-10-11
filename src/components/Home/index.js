
import React, { useState, useEffect } from "react";
import axios from "axios";
import './index.scss'

const Home = () => {
  const [libros, setLibros] = useState([]);

  // Función para cargar la lista de libros desde la API
  const cargarLibros = async () => {
    try {
      const response = await axios.get("http://localhost:5000/obtener_libros"); // Ajusta la URL de la API
      setLibros(response.data);
    } catch (error) {
      console.error("Error al cargar la lista de libros:", error);
    }
  };

  // Cargar la lista de libros cuando el componente se monta
  useEffect(() => {
    cargarLibros();
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Libros disponibles en BookIt</h1>
      <div className="card-container">
        {libros.map((libro) => (
          <div key={libro._id} className="card">
            <h3>{libro.titulo}</h3>
            <p>Autor: {libro.autor}</p>
            <p>Género: {libro.genero}</p>
            <p>Año de Publicación: {libro.ano_publicacion}</p>
            <p>Estado: {libro.estado}</p>
            <button className="reservar-button">Reservar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;