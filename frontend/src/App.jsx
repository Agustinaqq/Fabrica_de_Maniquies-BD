import { useState, useEffect } from 'react';

function App() {
  // 1. ESTADOS (Para manejar la memoria del componente)
  const [maniquies, setManiquies] = useState([]);
  const [nombreModelo, setNombreModelo] = useState('');
  const [estado, setEstado] = useState('Disponible');
  const [material, setMaterial] = useState('Plástico');
  const [color, setColor] = useState('Blanco');

  const API_URL = 'http://localhost:3000/maniquies';

  // 🔄 2. USEEFFECT (Se ejecuta automáticamente cuando carga la pantalla)
  useEffect(() => {
    cargarManiquies();
  }, []);

  // 🔍 3. FUNCIÓN PARA LEER DATOS (GET)
  const cargarManiquies = async () => {
    try {
      const respuesta = await fetch(API_URL);
      const datos = await respuesta.json();
      setManiquies(datos); // Guardamos la lista de MySQL en el estado para renderizar
    } catch (error) {
      console.error('Error al traer los maniquíes de MySQL:', error);
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const respuesta = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Agregamos material y color al body 👇
      body: JSON.stringify({ 
        nombre_modelo: nombreModelo, 
        estado: estado,
        material: material,
        color: color
      })
    });

    if (respuesta.ok) {
      setNombreModelo(''); // Limpiamos solo el nombre del modelo
      cargarManiquies(); // Recargamos la tabla
    } else {
      const errData = await respuesta.json();
      alert(`Error: ${errData.detalle || 'No se pudo crear'}`);
    }
  } catch (error) {
    console.error('Error al crear:', error);
  }
};

  // ❌ 5. FUNCIÓN PARA ELIMINAR (DELETE)
  const handleEliminar = async (id) => {
    if (!confirm('¿Seguro que querés eliminar este maniquí?')) return;
    try {
      const respuesta = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      const resultado = await respuesta.json();

      if (respuesta.ok) {
        cargarManiquies(); // Si se borró, recargamos la lista actualizada
      } else {
        // Muestra el error de MySQL si salta por Clave Foránea (FK)
        alert(`No se pudo eliminar: ${resultado.error || resultado.detalle || resultado.mensaje}`);
      }
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>🏭 Panel React - Fábrica de Maniquíes</h1>
      <p style={{ textAlign: 'center', color: '#666' }}>Conectado dinámicamente a MySQL (Puerto 3000)</p>
      
      <div style={{ display: 'flex', gap: '40px', marginTop: '30px' }}>
        
        {/* COLUMNA IZQUIERDA: FORMULARIO */}
        <div style={{ flex: 1, padding: '20px', border: '1px solid #ccc', borderRadius: '8px', height: 'fit-content', backgroundColor: '#f9f9f9' }}>
          <h3 style={{ marginTop: 0 }}>Nuevo Maniquí</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nombre del Modelo:</label>
              <input 
                type="text" 
                value={nombreModelo} 
                onChange={(e) => setNombreModelo(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                placeholder="Ej: Modelo Slim A1"
                required 
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Estado Inicial:</label>
              <select 
                value={estado} 
                onChange={(e) => setEstado(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              >
                <option value="Disponible">Disponible</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Vendido">Vendido</option>
              </select>
            </div>
            <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#ffffff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              <div style={{ marginBottom: '15px' }}>
  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Material Principal:</label>
  <select 
    value={material} 
    onChange={(e) => setMaterial(e.target.value)}
    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
  >
    <option value="Plástico">Plástico</option>
    <option value="Fibra de Vidrio">Fibra de Vidrio</option>
    <option value="Madera">Madera</option>
    <option value="Metal">Metal</option>
  </select>
</div>

<div style={{ marginBottom: '15px' }}>
  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Color:</label>
  <select 
    value={color} 
    onChange={(e) => setColor(e.target.value)}
    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
  >
    <option value="Blanco">Blanco</option>
    <option value="Negro">Negro</option>
    <option value="Piel">Piel</option>
    <option value="Gris">Gris</option>
    <option value="Azul">Azul</option>
  </select>
</div>
              Guardar
            </button>
          </form>
        </div>

        {/* COLUMNA DERECHA: TABLA CON RENDERIZACIÓN DINÁMICA */}
        <div style={{ flex: 2 }}>
          <h3 style={{ marginTop: 0 }}>Inventario desde Base de Datos</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <tr style={{ backgroundColor: '#333', color: 'white' }}>
  <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Modelo</th>
  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Materiales</th> {/* 👈 Nuevo */}
  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Colores</th>    {/* 👈 Nuevo */}
  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Estado</th>
  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Acciones</th>
</tr>
            <tbody>
              {/* RENDERIZADO DINÁMICO: Mapeamos el array de maniquíes que llenó el useEffect */}
             {maniquies.map((m) => (
  <tr key={m.id_maniqui} style={{ textAlign: 'center' }}>
    <td style={{ padding: '10px', border: '1px solid #ddd', fontWeight: 'bold' }}>#{m.id_maniqui}</td>
    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{m.nombre_modelo}</td>
    
    {/* Celdas Nuevas 👇 */}
    <td style={{ padding: '10px', border: '1px solid #ddd', fontSize: '14px', color: '#555' }}>{m.materiales}</td>
    <td style={{ padding: '10px', border: '1px solid #ddd', fontSize: '14px', color: '#555' }}>{m.colores}</td>
    
    <td style={{ padding: '10px', border: '1px solid #ddd' }}>
      <span style={{
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 'bold',
        backgroundColor: m.estado === 'Disponible' ? '#d4edda' : m.estado === 'En Proceso' ? '#fff3cd' : '#f8d7da',
        color: m.estado === 'Disponible' ? '#155724' : m.estado === 'En Proceso' ? '#856404' : '#721c24'
      }}>
        {m.estado}
      </span>
    </td>
    <td style={{ padding: '10px', border: '1px solid #ddd' }}>
      <button 
        onClick={() => handleEliminar(m.id_maniqui)}
        style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
      >
        Eliminar
      </button>
    </td>
  </tr>
))}
              
              {/* Si la tabla está vacía muestra este aviso */}
              {maniquies.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ padding: '20px', color: '#999', textAlign: 'center' }}>No hay maniquíes registrados en MySQL.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default App;