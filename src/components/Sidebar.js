// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/calendar">Calendário</Link></li>
        <li><button onClick={() => window.location.href = '/'}>Sair</button></li>
      </ul>
    </div>
  );
}

export default Sidebar;
