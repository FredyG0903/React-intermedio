import { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import Columna from './Columna';
import NuevaTarea from './NuevaTarea';
import './Tablero.css';

function Tablero() {
  const [columnas, setColumnas] = useState({
    pendiente: {
      id: 'pendiente',
      titulo: 'Pendiente',
      tareas: ['Diseñar logo', 'Configurar entorno React']
    },
    progreso: {
      id: 'progreso',
      titulo: 'En progreso',
      tareas: ['Crear componentes base']
    },
    completada: {
      id: 'completada',
      titulo: 'Completada',
      tareas: ['Inicializar repositorio']
    }
  });

  const [mostrarFormNuevaColumna, setMostrarFormNuevaColumna] = useState(false);
  const [nuevaColumnaTitulo, setNuevaColumnaTitulo] = useState('');

  const eliminarTarea = (columnaId, index) => {
    setColumnas(prevColumnas => {
      const nuevasColumnas = { ...prevColumnas };
      nuevasColumnas[columnaId].tareas = [
        ...nuevasColumnas[columnaId].tareas.slice(0, index),
        ...nuevasColumnas[columnaId].tareas.slice(index + 1)
      ];
      return nuevasColumnas;
    });
  };

  const eliminarColumna = (columnaId) => {
    if (Object.keys(columnas).length <= 1) {
      alert('No puedes eliminar la última columna');
      return;
    }
    setColumnas(prevColumnas => {
      const nuevasColumnas = { ...prevColumnas };
      delete nuevasColumnas[columnaId];
      return nuevasColumnas;
    });
  };

  const agregarColumna = () => {
    if (!nuevaColumnaTitulo.trim()) return;
    
    const nuevoId = `columna-${Date.now()}`;
    setColumnas(prevColumnas => ({
      ...prevColumnas,
      [nuevoId]: {
        id: nuevoId,
        titulo: nuevaColumnaTitulo,
        tareas: []
      }
    }));
    setNuevaColumnaTitulo('');
    setMostrarFormNuevaColumna(false);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const columnaInicio = source.droppableId;
    const columnaFin = destination.droppableId;

    const nuevasColumnas = { ...columnas };
    const tareasInicio = [...nuevasColumnas[columnaInicio].tareas];
    const tareasFin = [...nuevasColumnas[columnaFin].tareas];

    if (columnaInicio === columnaFin) {
      const [tareaMovida] = tareasInicio.splice(source.index, 1);
      tareasInicio.splice(destination.index, 0, tareaMovida);
      nuevasColumnas[columnaInicio].tareas = tareasInicio;
    } else {
      const [tareaMovida] = tareasInicio.splice(source.index, 1);
      tareasFin.splice(destination.index, 0, tareaMovida);
      nuevasColumnas[columnaInicio].tareas = tareasInicio;
      nuevasColumnas[columnaFin].tareas = tareasFin;
    }

    setColumnas(nuevasColumnas);
  };

  return (
    <div className="tablero">
      <div className="tablero-header">
        <NuevaTarea setColumnas={setColumnas} columnaInicial="pendiente" />
        <button 
          className="boton-nueva-columna"
          onClick={() => setMostrarFormNuevaColumna(true)}
        >
          + Nueva Columna
        </button>
      </div>

      {mostrarFormNuevaColumna && (
        <div className="form-nueva-columna">
          <input
            type="text"
            value={nuevaColumnaTitulo}
            onChange={(e) => setNuevaColumnaTitulo(e.target.value)}
            placeholder="Nombre de la columna"
            className="input-nueva-columna"
          />
          <div className="botones-nueva-columna">
            <button 
              onClick={agregarColumna}
              disabled={!nuevaColumnaTitulo.trim()}
              className="boton-agregar"
            >
              Agregar
            </button>
            <button 
              onClick={() => {
                setMostrarFormNuevaColumna(false);
                setNuevaColumnaTitulo('');
              }}
              className="boton-cancelar"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="columnas-container">
          {Object.values(columnas).map(columna => (
            <Columna 
              key={columna.id}
              id={columna.id}
              titulo={columna.titulo}
              tareas={columna.tareas}
              onEliminarTarea={eliminarTarea}
              onEliminarColumna={eliminarColumna}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default Tablero;