import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import CRUD from './components/CRUD';
import Home from './components/Home';
import Profile from './components/Profile';
import UserProvider from './components/UserProvider'; 
import UnAuthorized from './components/UnAuthorized';

import "./App.scss";

function App() {
  return (
    <UserProvider>
    <Router>
      <Routes>     
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/crud" element={<CRUD />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/unauthorized" element={<UnAuthorized />} />
            {/* Otras rutas y componentes según sea necesario */}
          </Route>
      
      </Routes>
    </Router>
    </UserProvider>
  );
}


export default App;
