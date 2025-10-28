import { useState } from 'react';
import './NuevaTarea.css';

function NuevaTarea({ setColumnas, columnaInicial }) {
  const [texto, setTexto] = useState('');
  const [fechaLimite, setFechaLimite] = useState('');

  const obtenerFechaMinima = () => {
    const hoy = new Date();
    return hoy.toISOString().split('T')[0];
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return '';
    const opciones = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    // Ajustamos la fecha para que sea a las 12:00 del mediodía para evitar problemas de zona horaria
    const fechaAjustada = new Date(fecha + 'T12:00:00');
    return fechaAjustada.toLocaleDateString('es-ES', opciones);
  };

  const agregar = () => {
    if (texto.trim() !== '') {
      const nuevaTarea = {
        id: Date.now().toString(),
        texto: texto.trim(),
        fechaCreacion: new Date().toISOString(),
        // Ajustamos la fecha límite para que sea a las 12:00 del mediodía
        fechaLimite: fechaLimite ? new Date(fechaLimite + 'T12:00:00').toISOString() : null,
        completada: false
      };

      setColumnas(prevColumnas => {
        const nuevasColumnas = { ...prevColumnas };
        nuevasColumnas[columnaInicial] = {
          ...nuevasColumnas[columnaInicial],
          tareas: [...nuevasColumnas[columnaInicial].tareas, nuevaTarea]
        };
        return nuevasColumnas;
      });

      setTexto('');
      setFechaLimite('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      agregar();
    }
  };

  const handleLimpiar = () => {
    setTexto('');
    setFechaLimite('');
  };

  return (
    <div className="nueva-tarea-container">
      <div className="input-wrapper">
        <span className="input-icon">✏️</span>
        <input
          type="text"
          placeholder="Añadir una nueva tarea..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyPress={handleKeyPress}
          className="nueva-tarea-input"
        />
        {texto && (
          <button 
            onClick={handleLimpiar} 
            className="limpiar-input-button"
            title="Limpiar"
          >
            ❌
          </button>
        )}
      </div>
      <div className="fecha-limite-wrapper">
        <span className="fecha-icon">📅</span>
        <input
          type="date"
          value={fechaLimite}
          min={obtenerFechaMinima()}
          onChange={(e) => setFechaLimite(e.target.value)}
          className="fecha-input"
        />
        {fechaLimite && (
          <span className="fecha-texto">
            Fecha límite: {formatearFecha(fechaLimite)}
          </span>
        )}
      </div>
      <button 
        onClick={agregar}
        className="agregar-tarea-button"
        disabled={!texto.trim()}
      >
        Agregar Tarea
      </button>
      <p className="ayuda-texto">Presiona Enter para agregar rápidamente</p>
    </div>
  );
}

export default NuevaTarea;