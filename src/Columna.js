import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import './Columna.css';

function Columna({ id, titulo, tareas, onEliminarTarea, onEliminarColumna }) {
  const formatearFecha = (fecha) => {
    if (!fecha) return '';
    const opciones = { 
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    };
    // Creamos un nuevo objeto Date con la fecha ISO
    const fechaObj = new Date(fecha);
    // Ajustamos la zona horaria local
    const fechaLocal = new Date(fechaObj.getTime() + fechaObj.getTimezoneOffset() * 60000);
    return fechaLocal.toLocaleDateString('es-ES', opciones);
  };

  const calcularEstadoFecha = (fechaLimite) => {
    if (!fechaLimite) return '';
    
    const hoy = new Date();
    // Ajustamos la zona horaria de la fecha límite
    const fechaObj = new Date(fechaLimite);
    const fechaLocal = new Date(fechaObj.getTime() + fechaObj.getTimezoneOffset() * 60000);
    
    // Comparamos solo las fechas, ignorando las horas
    const fechaHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    const fechaLimiteAjustada = new Date(fechaLocal.getFullYear(), fechaLocal.getMonth(), fechaLocal.getDate());
    
    const diferenciaDias = Math.ceil((fechaLimiteAjustada - fechaHoy) / (1000 * 60 * 60 * 24));

    if (diferenciaDias < 0) return 'vencida';
    if (diferenciaDias === 0) return 'hoy';
    if (diferenciaDias === 1) return 'mañana';
    if (diferenciaDias <= 3) return 'proxima';
    return '';
  };

  return (
    <div className="columna">
      <div className="columna-header">
        <h2 className="columna-titulo">{titulo} ({tareas.length})</h2>
        <button
          onClick={() => onEliminarColumna(id)}
          className="boton-eliminar-columna"
          title="Eliminar columna"
        >
          ×
        </button>
      </div>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`tareas-lista ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
          >
            {tareas.length === 0 && (
              <p className="no-tareas">No hay tareas aquí</p>
            )}
            {tareas.map((tarea, index) => (
              <Draggable
                key={tarea.id || `${id}-tarea-${index}`}
                draggableId={tarea.id || `${id}-tarea-${index}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`tarea-card ${snapshot.isDragging ? 'dragging' : ''}`}
                  >
                    <p className="tarea-texto">{tarea.texto}</p>
                    {tarea.fechaLimite && (
                      <div className={`tarea-fecha ${calcularEstadoFecha(tarea.fechaLimite)}`}>
                        <span className="fecha-icon">📅</span>
                        {formatearFecha(tarea.fechaLimite)}
                      </div>
                    )}
                    <div className="tarea-acciones">
                      <button
                        onClick={() => onEliminarTarea(id, index)}
                        className="boton-eliminar"
                        title="Eliminar tarea"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Columna;