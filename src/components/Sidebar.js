// src/components/Sidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Aqui você pode adicionar lógica para limpar dados de autenticação, se necessário
        navigate('/'); // Redireciona para a página de login
    };

    return (
        <div className="sidebar">
            <h2>Menu</h2>
            <ul>
                <button onClick={handleLogout}>Sair</button>
            </ul>
        </div>
    );
}

export default Sidebar;
