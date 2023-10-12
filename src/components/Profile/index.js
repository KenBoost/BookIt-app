import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useUser } from "../UserProvider"; // Asegúrate de importar el contexto adecuado
import "./index.scss";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useUser();
  const [reservas, setReservas] = useState([]);

  const navigate = useNavigate();

  const handleCancelarReserva = (reservaId) => {
    // Realiza una solicitud para actualizar el estado de la reserva a "cancelada"
    axios
      .put(`http://localhost:5000/actualizar_estado/${reservaId}/cancelada`)
      .then((response) => {
        if (response.status === 200) {
          // La reserva se canceló con éxito, puedes realizar alguna acción si es necesario.
          console.log("Reserva cancelada con éxito");
          // Actualiza la lista de reservas para reflejar el nuevo estado
          cargarReservas();
        } else {
          console.error("Error al cancelar la reserva");
        }
      })
      .catch((error) => {
        console.error("Error al comunicarse con el servidor", error);
      });
  };

  const handleFinalizarReserva = (reservaId) => {
    // Realiza una solicitud para actualizar el estado de la reserva a "finalizada"
    axios
      .put(`http://localhost:5000/actualizar_estado/${reservaId}/finalizada`)
      .then((response) => {
        if (response.status === 200) {
          // La reserva se finalizó con éxito, puedes realizar alguna acción si es necesario.
          console.log("Reserva finalizada con éxito");
          // Actualiza la lista de reservas para reflejar el nuevo estado
          cargarReservas();
        } else {
          console.error("Error al finalizar la reserva");
        }
      })
      .catch((error) => {
        console.error("Error al comunicarse con el servidor", error);
      });
  };

  const cargarReservas = () => {
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
  };
  
  const formatFecha = (fecha) => {
    const fechaDate = new Date(fecha);
    return fechaDate.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };


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

  if (user && (user.rol === 1 || user.rol === 2)) {
    return (
      <div className="profile-container">
        <h2>Registro de sus Libros</h2>
        <div className="reserva-cards">
          {reservas.map((reserva) => (
            <div key={reserva._id} className="reserva-card">
              <p>Reservado el {reserva.fecha_reserva}</p>
              <p>Devolver antes del {formatFecha(reserva.fecha_devolucion)}</p>
              {reserva.libro_info && (
                <div className="libro-info">
                  <p>Libro seleccionado</p>
                  <p style={{ fontSize: "1.6rem", fontWeight: "bold" }}>
                    {reserva.libro_info.titulo}
                  </p>
                  <p>Autor: {reserva.libro_info.autor}</p>
                  <p>Género: {reserva.libro_info.genero}</p>
                  {/* Otros campos de información del libro */}
                </div>
              )}
              <p
                style={{
                  color: "#00b398",
                  fontSize: "1.6rem",
                  fontWeight: "bold",
                }}
              >
                Esta reserva está {reserva.estado}
              </p>
              <div className="botones-estado">
                {reserva.estado === "activa" && (
                  <>
                    <button
                      onClick={() => handleCancelarReserva(reserva._id)}
                      className="cancelar-button"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => handleFinalizarReserva(reserva._id)}
                      className="finalizar-button"
                    >
                      Finalizar
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    // Redirigir a una página de acceso no autorizado u otra acción
    navigate("/unauthorized");
    return null;
  }
};

export default Profile;
