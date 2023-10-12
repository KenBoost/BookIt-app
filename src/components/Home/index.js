
import React, { useState, useEffect } from "react";
import { useUser } from '../UserProvider'; 
import axios from "axios";
import './index.scss'
import Book from '../Book' 

const Home = () => {
  const [libros, setLibros] = useState([]);
  const [showBook, setShowBook] = useState(false); 
  const [selectedBook, setSelectedBook] = useState({ title: '', id: '' }); // Estado para almacenar el libro seleccionado

  const { isLoggedIn } = useUser();
 
  // Función para cargar la lista de libros desde la API
  const cargarLibros = async () => {
    try {
      const response = await axios.get("http://localhost:5000/obtener_libros"); // Ajusta la URL de la API
      setLibros(response.data);
    } catch (error) {
      console.error("Error al cargar la lista de libros:", error);
    }
  };


  const toggleBook = (bookTitle, bookId) => {
    setShowBook(!showBook);
    setSelectedBook({ title: bookTitle, id: bookId });

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
          <div key={libro._id} className="card ">
  
            <h3>{libro.titulo}</h3>
            <p>Autor: {libro.autor}</p>
            <p>Género: {libro.genero}</p>
            <p>Año de Publicación: {libro.ano_publicacion}</p>
            <p>Estado: {libro.estado}</p>
            <br></br>        
              <button  onClick={() => toggleBook(libro.titulo, libro._id)} className="reservar-button">Reservar</button>
              <p>Inicie sesión para reservar!</p>
              {showBook && (
              <Book bookTitle={selectedBook.title} bookId={selectedBook.id} onClose={toggleBook} />

              )} 
          </div>      
        ))}
      </div>
    </div>
  );
};

export default Home;