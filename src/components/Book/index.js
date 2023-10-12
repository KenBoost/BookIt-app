import React, { useState } from 'react';
import { useUser } from '../UserProvider';
import axios from "axios";
import './index.scss'; 

const Book = ({ bookTitle, bookId, onClose, onReserve, reloadBooks }) => {
  const [selectedDate, setSelectedDate] = useState(''); // Estado para almacenar la fecha seleccionada
  const { user } = useUser();


  const handleDateChange = (e) => {
    
    setSelectedDate(e.target.value);
  };
  

  const clearBookData = () => {
    // Reinicia los datos del libro en el modal
    setSelectedDate('');
    // Otros datos del libro en el modal se pueden reiniciar aquí si es necesario
  };
  
  const handleReserve = async () => {
    // Obtener la fecha actual
    const currentDate = new Date().toLocaleDateString('es-ES');

    
    // Llamar al método en Python para crear la reserva
    try {
      const response = await axios.post("http://localhost:5000/crear_reserva", {
        id_libro: bookId,
        id_usuario: user._id, // Supongo que user.id contiene el ID del usuario
        fecha_reserva: currentDate,
        fecha_devolucion: selectedDate,
      });

      // Manejar la respuesta de la creación de la reserva
      if (response.data.success) {
        // Si la reserva se crea exitosamente, puedes realizar alguna acción, como mostrar un mensaje al usuario.
        console.log('Reserva exitosa');
        clearBookData();
        reloadBooks();
        onClose();
      } else {
        console.error('Error al crear la reserva');
      }
    } catch (error) {
      console.error('Error al comunicarse con el servidor', error);
    }
  };
  

  return (
    <div className="reserve-book-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Reservar Libro:</h2>
        <h3>{bookTitle}</h3>
       
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
        />
        <div className="modal-buttons">
          <button onClick={handleReserve}>Reservar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default Book;
