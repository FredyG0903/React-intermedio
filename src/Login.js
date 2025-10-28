import React, { useState } from 'react';
import Registro from './Registro';
import './Login.css';

function Login({ onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const handleLogin = () => {
    setError('');
    if (!usuario.trim() || !password.trim()) {
      setError('Por favor complete todos los campos');
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioEncontrado = usuarios.find(
      u => u.usuario === usuario && u.password === password
    );

    if (usuarioEncontrado) {
      localStorage.setItem('usuarioActual', usuario);
      onLogin(usuario);
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleRegistroExitoso = (nuevoUsuario) => {
    setMostrarRegistro(false);
    setUsuario(nuevoUsuario);
  };

  if (mostrarRegistro) {
    return (
      <Registro 
        onRegistroExitoso={handleRegistroExitoso}
        onCancelar={() => setMostrarRegistro(false)}
      />
    );
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-titulo">Gestor de Tareas</h1>
        <div className="login-form">
          <div className="input-group">
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Usuario"
              className="login-input"
            />
          </div>
          <div className="input-group password-group">
            <input
              type={mostrarPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Contraseña"
              className="login-input"
            />
            <button
              type="button"
              onClick={() => setMostrarPassword(!mostrarPassword)}
              className="toggle-password"
              title={mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {mostrarPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          {error && <p className="error-mensaje">{error}</p>}
          <button 
            onClick={handleLogin}
            className="login-button"
            disabled={!usuario.trim() || !password.trim()}
          >
            Iniciar Sesión
          </button>
          <button 
            onClick={() => setMostrarRegistro(true)}
            className="registro-button"
          >
            Crear Cuenta
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;