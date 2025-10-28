import { useState, useEffect } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import Columna from './Columna';
import NuevaTarea from './NuevaTarea';
import './Tablero.css';

function Tablero({ usuarioActual }) {
  const [columnas, setColumnas] = useState({});
  const [mostrarFormNuevaColumna, setMostrarFormNuevaColumna] = useState(false);
  const [nuevaColumnaTitulo, setNuevaColumnaTitulo] = useState('');
  
  // Cargar columnas del usuario actual desde localStorage
  useEffect(() => {
    const columnasGuardadas = localStorage.getItem(`columnas_${usuarioActual}`);
    if (columnasGuardadas) {
      setColumnas(JSON.parse(columnasGuardadas));
    }
  }, [usuarioActual]);

  const eliminarTarea = (columnaId, index) => {
    setColumnas(prevColumnas => {
      const nuevasColumnas = { ...prevColumnas };
      nuevasColumnas[columnaId].tareas = [
        ...nuevasColumnas[columnaId].tareas.slice(0, index),
        ...nuevasColumnas[columnaId].tareas.slice(index + 1)
      ];
      
      // Guardar en localStorage después de eliminar tarea
      localStorage.setItem(`columnas_${usuarioActual}`, JSON.stringify(nuevasColumnas));
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
      
      // Guardar en localStorage después de eliminar columna
      localStorage.setItem(`columnas_${usuarioActual}`, JSON.stringify(nuevasColumnas));
      return nuevasColumnas;
    });
  };

  const agregarColumna = () => {
    if (!nuevaColumnaTitulo.trim()) return;
    
    const nuevoId = `columna-${Date.now()}`;
    setColumnas(prevColumnas => {
      const nuevasColumnas = {
        ...prevColumnas,
        [nuevoId]: {
          id: nuevoId,
          titulo: nuevaColumnaTitulo,
          tareas: []
        }
      };
      
      // Guardar en localStorage después de agregar columna
      localStorage.setItem(`columnas_${usuarioActual}`, JSON.stringify(nuevasColumnas));
      return nuevasColumnas;
    });
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
    
    // Guardar en localStorage después de cada cambio
    localStorage.setItem(`columnas_${usuarioActual}`, JSON.stringify(nuevasColumnas));
  };

  return (
    <div className="tablero">
      <div className="tablero-header">
        {Object.keys(columnas).length > 0 ? (
          <NuevaTarea setColumnas={setColumnas} columnaInicial={Object.keys(columnas)[0]} />
        ) : (
          <div className="mensaje-inicial">
            Comienza creando una columna para tu tablero
          </div>
        )}
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
            autoFocus
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
          {Object.keys(columnas).length === 0 ? (
            <div className="tablero-vacio">
              <h2>¡Bienvenido a tu Tablero!</h2>
              <p>Haz clic en "+ Nueva Columna" para comenzar</p>
            </div>
          ) : (
            Object.values(columnas).map(columna => (
              <Columna 
                key={columna.id}
                id={columna.id}
                titulo={columna.titulo}
                tareas={columna.tareas}
                onEliminarTarea={eliminarTarea}
                onEliminarColumna={eliminarColumna}
              />
            ))
          )}
        </div>
      </DragDropContext>
    </div>
  );
}

export default Tablero;