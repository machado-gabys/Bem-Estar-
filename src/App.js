// src/App.js
import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Psychologist from './components/Psychologist';
import Cadastro from './components/Register';
import './styles/App.css';

function App() {
    const [users, setUsers] = useState([
        { username: 'psicologo1', password: 'senha1', userType: 'psicologo' },
        { username: 'paciente1', password: 'senha1', userType: 'paciente' },
    ]);

    const handleRegister = (newUser) => {
        setUsers([...users, newUser]);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login users={users} />} />
                <Route path="/cadastro" element={<Cadastro onRegister={handleRegister} />} />
                <Route path="/home" element={<Home />} />
                <Route path="/psychologist" element={<Psychologist />} />
            </Routes>
        </Router>
    );
}

export default App;
