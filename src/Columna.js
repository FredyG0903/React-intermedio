import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import './Columna.css';

function Columna({ id, titulo, tareas, onEliminarTarea, onEliminarColumna }) {
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
                key={`${id}-tarea-${index}`}
                draggableId={`${id}-tarea-${index}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`tarea-card ${snapshot.isDragging ? 'dragging' : ''}`}
                  >
                    <p className="tarea-texto">{tarea}</p>
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