import React from 'react';
import './Banner.css';

function Banner({ usuario, onLogout }) {
  return (
    <header className="banner">
      <div className="banner-content">
        <h1 className="banner-title">Gestor de Tareas</h1>
        <div className="banner-actions">
          <span className="usuario-nombre">¡Hola, {usuario}!</span>
          <button onClick={onLogout} className="logout-button">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
}

export default Banner;