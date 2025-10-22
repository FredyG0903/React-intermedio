import React from 'react';
import './Tarea.css';

function Tarea({ texto, completada, eliminarTarea, toggleCompletada }) {
  return (
    <li className="tarea-item">
      <span 
        className={`tarea-texto ${completada ? 'completada' : ''}`}
        onClick={toggleCompletada}
      >
        {texto}
      </span>
      <div className="tarea-botones">
        <button 
          className="boton-completar"
          onClick={toggleCompletada}
        >
          ✔
        </button>
        <button 
          className="boton-eliminar"
          onClick={eliminarTarea}
        >
          ❌
        </button>
      </div>
    </li>
  );
}

export default Tarea;
