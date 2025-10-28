import React, { useState } from 'react';
import './Registro.css';

function Registro({ onRegistroExitoso, onCancelar }) {
  const [nuevoUsuario, setNuevoUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [error, setError] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarConfirmarPassword, setMostrarConfirmarPassword] = useState(false);

  const handleRegistro = () => {
    setError('');
    if (!nuevoUsuario.trim() || !password.trim() || !confirmarPassword.trim()) {
      setError('Por favor complete todos los campos');
      return;
    }

    if (password !== confirmarPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    if (usuarios.some(u => u.usuario === nuevoUsuario)) {
      setError('Este nombre de usuario ya está en uso');
      return;
    }

    const nuevoRegistro = {
      usuario: nuevoUsuario,
      password: password,
      fechaRegistro: new Date().toISOString()
    };

    localStorage.setItem('usuarios', JSON.stringify([...usuarios, nuevoRegistro]));
    
    // Inicializar el tablero vacío para el nuevo usuario
    localStorage.setItem(`columnas_${nuevoUsuario}`, JSON.stringify({}));
    
    onRegistroExitoso(nuevoUsuario);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-titulo">Crear Cuenta</h1>
        <div className="login-form">
          <div className="input-group">
            <input
              type="text"
              value={nuevoUsuario}
              onChange={(e) => setNuevoUsuario(e.target.value)}
              placeholder="Nombre de usuario"
              className="login-input"
            />
          </div>
          <div className="input-group password-group">
            <input
              type={mostrarPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <div className="input-group password-group">
            <input
              type={mostrarConfirmarPassword ? "text" : "password"}
              value={confirmarPassword}
              onChange={(e) => setConfirmarPassword(e.target.value)}
              placeholder="Confirmar contraseña"
              className="login-input"
            />
            <button
              type="button"
              onClick={() => setMostrarConfirmarPassword(!mostrarConfirmarPassword)}
              className="toggle-password"
              title={mostrarConfirmarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {mostrarConfirmarPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          {error && <p className="error-mensaje">{error}</p>}
          <button 
            onClick={handleRegistro}
            className="login-button"
            disabled={!nuevoUsuario.trim() || !password.trim() || !confirmarPassword.trim()}
          >
            Registrarse
          </button>
          <button 
            onClick={onCancelar}
            className="registro-button"
          >
            Volver al Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Registro;
