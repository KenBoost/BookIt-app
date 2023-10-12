import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser debe ser utilizado dentro de un UserProvider');
  }

  return context;
};

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Agrega el estado de inicio de sesión

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn  }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider; // Exporta el componente UserProvider como valor predeterminado
