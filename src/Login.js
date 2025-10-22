import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [logueado, setLogueado] = useState(false);

  const handleLogin = () => {
    if (usuario.trim() !== '') {
      setLogueado(true);
      if (onLogin) onLogin(usuario);
    }
  };

  const handleLogout = () => {
    setLogueado(false);
    setUsuario('');
    if (onLogin) onLogin(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && usuario.trim() !== '') {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      {logueado ? (
        <div className="logged-in">
          <h2>Bienvenido, {usuario}! 👋</h2>
          <button 
            onClick={handleLogout}
            className="boton-logout"
          >
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <div className="login-form">
          <h2>Por favor inicia sesión</h2>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ingresa tu nombre"
            className="input-login"
          />
          <button 
            onClick={handleLogin}
            disabled={usuario.trim() === ''}
            className="boton-login"
          >
            Iniciar Sesión
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
