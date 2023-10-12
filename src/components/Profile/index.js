import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useUser } from "../UserProvider"; // Asegúrate de importar el contexto adecuado
import './index.scss'

const Profile = () => {
  const { user } = useUser();
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    if (user) {
      // Realizar una solicitud para obtener las reservas del usuario
      axios
        .get(`http://localhost:5000/obtener_reservas/${user._id}`)
        .then((response) => {
          setReservas(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener las reservas", error);
        });
    }
  }, [user]); // Asegúrate de incluir user como dependencia para volver a cargar las reservas cuando cambia el usuario

  return (
    <div className="profile-container">
      <h2>Reservas del Usuario</h2>
      <div className="reserva-cards">
        {reservas.map((reserva) => (
          <div key={reserva._id} className="reserva-card">
            <p>ID de Reserva: {reserva._id}</p>
            <p>Fecha de Reserva: {reserva.fecha_reserva}</p>
            <p>Fecha de Devolución: {reserva.fecha_devolucion}</p>
            {reserva.libro_info && (
              <div className="libro-info">
                <p>Información del Libro:</p>
                <p>Título: {reserva.libro_info.titulo}</p>
                <p>Autor: {reserva.libro_info.autor}</p>
                <p>Género: {reserva.libro_info.genero}</p>
                {/* Otros campos de información del libro */}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


export default Profile;
