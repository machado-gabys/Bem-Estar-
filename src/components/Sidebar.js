import React from 'react';
import '../styles/Sidebar.css'; // Importe o estilo do Sidebar

function Sidebar({ onLogout }) {
    return (
        <div className="sidebar-content">
            <h3>Menu</h3>
            <ul>
                <li>
                    <button onClick={onLogout} className="logout-button">Sair</button>
                </li>
                {/* Adicione mais opções de menu aqui, se necessário */}
            </ul>
        </div>
    );
}

export default Sidebar;
