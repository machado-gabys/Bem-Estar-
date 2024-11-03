import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Psychologist from './components/Psychologist'; // Importar a página do psicólogo
import Cadastro from './components/Register'; // Importar o Cadastro
import './styles/App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/home" element={<Home />} />
                <Route path="/calendar" element={<Home />} />
                <Route path="/psychologist" element={<Psychologist />} />
            </Routes>
        </Router>
    );
}

export default App;
