import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import Home from './components/Home';

import logo from './logo.svg';
import './App.scss';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Agrega más rutas y componentes según sea necesario */}
      </Routes>
    </Router>
  );
}


export default App;
