import React, { useState, useEffect } from 'react';
import Tarea from './Tarea';
import './ListaTareas.css';

function ListaTareas() {
  // Cargar tareas del localStorage al iniciar
  const tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || [];
  const [tareas, setTareas] = useState(tareasGuardadas);
  const [nuevaTarea, setNuevaTarea] = useState('');

  // Guardar tareas en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);

  const agregarTarea = () => {
    if (nuevaTarea.trim() !== '') {
      const nuevaTareaObj = {
        id: Date.now(),
        texto: nuevaTarea,
        completada: false,
        fechaCreacion: new Date().toLocaleString()
      };
      
      setTareas([...tareas, nuevaTareaObj]);
      setNuevaTarea('');
    }
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter(tarea => tarea.id !== id));
  };

  const toggleCompletada = (id) => {
    setTareas(tareas.map(tarea => 
      tarea.id === id 
        ? { ...tarea, completada: !tarea.completada }
        : tarea
    ));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      agregarTarea();
    }
  };

  return (
    <div className="lista-tareas">
      <div className="agregar-tarea">
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Agregar nueva tarea..."
          className="input-tarea"
        />
        <button 
          onClick={agregarTarea}
          className="boton-agregar"
        >
          Agregar
        </button>
      </div>

      {tareas.length === 0 ? (
        <p className="no-tareas">No tienes tareas pendientes</p>
      ) : (
        <ul className="tareas-lista">
          {tareas.map(tarea => (
            <Tarea
              key={tarea.id}
              texto={`${tarea.texto} (${tarea.fechaCreacion})`}
              completada={tarea.completada}
              eliminarTarea={() => eliminarTarea(tarea.id)}
              toggleCompletada={() => toggleCompletada(tarea.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListaTareas;