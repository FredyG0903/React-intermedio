import React, { useState, useEffect } from 'react';
import Tablero from './Tablero';
import Banner from './Banner';
import Login from './Login';
import './App.css';

function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuarioActual');
    if (usuarioGuardado) {
      setUsuario(usuarioGuardado);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuarioActual');
    setUsuario(null);
  };

  return (
    <div className="app">
      {!usuario ? (
        <Login onLogin={setUsuario} />
      ) : (
        <>
          <Banner usuario={usuario} onLogout={handleLogout} />
          <Tablero usuarioActual={usuario} />
        </>
      )}
    </div>
  );
}

export default App;