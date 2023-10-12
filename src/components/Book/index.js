import React, { useState } from 'react';
import './index.scss'; // Estilo para el modal

const Book = ({ bookTitle, onClose, onReserve }) => {
  const [selectedDate, setSelectedDate] = useState(''); // Estado para almacenar la fecha seleccionada
 

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleReserve = () => {
    // Realiza la reserva del libro con la fecha seleccionada
    onReserve(selectedDate);
    onClose();
  };

  return (
    <div className="reserve-book-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Reservar Libro: {bookTitle}</h2>
        <p>Selecciona la fecha de entrega:</p>
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
