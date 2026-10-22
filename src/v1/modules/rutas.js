// arreglo simulando la base de datos de rutas
const rutas = [
  { id: 1, nombre: "Centro - Catalina", costo: 10, base: "Mercado", activa: true },
  { id: 2, nombre: "Centro - Chapultepec", costo: 10, base: "Mercado", activa: true },
  { id: 3, nombre: "Huauchinango - Ahuazotepec", costo: 18, base: "Terminal", activa: true },
  { id: 4, nombre: "Centro - La Mesita", costo: 10, base: "Terminal", activa: true },
  { id: 5, nombre: "Centro - Texcapa", costo: 12, base: "Base Texcapa", activa: true }
];

// funcion normal para crear
function crearRuta(nombre, costo, base) {
  // busca el id mas alto y le suma 1, si no hay empieza en 1
  const nuevoId = rutas.length > 0 ? Math.max(...rutas.map((r) => r.id)) + 1 : 1;

  const nuevaRuta = {
    id: nuevoId,
    nombre,
    costo,
    base,
    activa: true,
  };

  rutas.push(nuevaRuta);
  return nuevaRuta;
}

// funcion con callback simulando que tarda 2 segundos
function mostrarRutasCallback(callback) {
  setTimeout(() => {
    callback(rutas);
  }, 2000);
}

// funcion con promesa simulando que tarda 2 segundos
function mostrarRutasPromesa() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(rutas);
    }, 2000);
  });
}

// funcion asincrona para leer todo
async function mostrarRutasAsync() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(rutas);
    }, 2000);
  });
}

// busca normal
function buscarRutaId(id) {
  return rutas.find((ruta) => ruta.id === id);
}

// busca con promesa
function buscarRutaPromesa(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const ruta = rutas.find((ruta) => ruta.id === id);

      if (!ruta) {
        reject(new Error("Ruta no encontrada"));
        return;
      }

      resolve(ruta);
    }, 500);
  });
}

// busca con async await
async function buscarRutaAsync(id) {
  const ruta = rutas.find((ruta) => ruta.id === id);

  if (!ruta) {
    throw new Error("Ruta no encontrada");
  }
  return ruta;
}

// actualizar datos de una ruta
function actualizarRuta(id, datos) {
  const indice = rutas.findIndex((ruta) => ruta.id === id);

  if (indice === -1) {
    return null;
  }

  // combina los datos viejos con los nuevos
  rutas[indice] = {
    ...rutas[indice],
    ...datos,
    id: rutas[indice].id,
  };

  return rutas[indice];
}

// eliminar definitivamente
function eliminarRuta(id) {
  const indice = rutas.findIndex((ruta) => ruta.id === id);

  if (indice === -1) {
    return null;
  }

  const eliminada = rutas.splice(indice, 1);

  return eliminada[0];
}

// cambiar el estado a inactiva
function desactivarRuta(id) {
  const indice = rutas.findIndex((ruta) => ruta.id === id);

  if (indice === -1) {
    return null;
  }

  rutas[indice].activa = false;

  return true;
}

export {
  crearRuta,
  mostrarRutasCallback,
  mostrarRutasPromesa,
  mostrarRutasAsync,
  buscarRutaId,
  buscarRutaPromesa,
  buscarRutaAsync,
  actualizarRuta,
  eliminarRuta,
  desactivarRuta
};