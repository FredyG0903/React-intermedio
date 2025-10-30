# 🎨 Instrucciones para cambiar la imagen de fondo

## Cambio rápido de imagen

Para cambiar la imagen de fondo de la aplicación, solo necesitas hacer **UNA** de estas opciones:

### Opción 1: Reemplazar la imagen actual (MÁS FÁCIL)
1. Guarda tu nueva imagen como `bg.jpg` (o el formato que prefieras)
2. Reemplaza el archivo en: `src/images/bg.jpg`
3. ¡Listo! La aplicación usará automáticamente la nueva imagen

### Opción 2: Usar un nombre diferente
1. Guarda tu imagen en: `src/images/` con cualquier nombre
2. Abre el archivo: `src/config/backgroundConfig.js`
3. Cambia la línea: `import bgImage from '../images/tu-nueva-imagen.jpg';`
4. Guarda el archivo

## Formatos de imagen recomendados
- ✅ **JPG/JPEG**: Para fotografías
- ✅ **PNG**: Para imágenes con transparencia
- ✅ **SVG**: Para gráficos vectoriales
- ✅ **WebP**: Para mejor compresión

## Tamaños recomendados
- **Mínimo**: 1366x768
- **Recomendado**: 1920x1080
- **Óptimo**: 2560x1440

## Configuraciones adicionales

En `src/config/backgroundConfig.js` también puedes modificar:

```javascript
backgroundSize: 'cover',        // 'cover', 'contain', 'auto'
backgroundPosition: 'center',   // 'center', 'top', 'bottom', etc.
backgroundAttachment: 'fixed',  // 'fixed', 'scroll'
backgroundColor: '#1a1f35'      // Color de respaldo
```

## Ejemplos de uso

```javascript
// Para una imagen que se repita
backgroundImage: 'pattern.png',
backgroundSize: 'auto',
backgroundRepeat: 'repeat'

// Para una imagen centrada sin repetir
backgroundImage: 'logo.png',
backgroundSize: 'contain',
backgroundRepeat: 'no-repeat'
```
