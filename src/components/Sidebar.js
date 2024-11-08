import React from "react";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import '../styles/Sidebar.css';

function Sidebar({ onLogout }) {
  return (
    <div className="sidebar-container">
      <div className="sidebar-item">
        <Link to="/profile" className="sidebar-link">
          <FaUser className="sidebar-icon" /> Perfil
        </Link>
      </div>
      <div className="sidebar-item">
        <Link to="/" onClick={onLogout} className="sidebar-link">
          <FaSignOutAlt className="sidebar-icon" /> Sair
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
