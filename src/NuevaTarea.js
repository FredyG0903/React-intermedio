import { useState } from 'react';
import './NuevaTarea.css';

function NuevaTarea({ setTareas }) {
  const [texto, setTexto] = useState('');

  const agregar = () => {
    if (texto.trim() !== '') {
      setTareas((prev) => ({ 
        ...prev, 
        pendiente: [...prev.pendiente, texto.trim()]
      }));
      setTexto('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      agregar();
    }
  };

  return (
    <div className="nueva-tarea-container">
      <div className="input-group">
        <input
          type="text"
          placeholder="Nueva tarea..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyPress={handleKeyPress}
          className="nueva-tarea-input"
        />
        <button 
          onClick={agregar}
          className="agregar-button"
          disabled={!texto.trim()}
        >
          Agregar
        </button>
      </div>
      <p className="help-text">Presiona Enter para agregar rápidamente</p>
    </div>
  );
}

export default NuevaTarea;
