import React, { useState } from 'react';
import Login from './Login';
import ListaTareas from './ListaTareas';
import './App.css';

function App() {
  const [usuario, setUsuario] = useState(null);

  return (
    <div className="app-container">
      <h1 className="app-titulo">Gestor de Tareas</h1>
      
      <Login onLogin={setUsuario} />
      
      {usuario && (
        <div className="tareas-section">
          <ListaTareas />
        </div>
      )}
    </div>
  );
}

export default App;