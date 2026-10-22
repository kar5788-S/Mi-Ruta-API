// arreglo simulando la base de datos de las paradas
const paradas = [
  { id: 1, nombre: "Mercado Municipal", referencia: "Frente a la farmacia", activa: true },
  { id: 2, nombre: "Terminal de Autobuses", referencia: "Entrada principal", activa: true },
  { id: 3, nombre: "Zócalo", referencia: "Frente a la iglesia", activa: true }
];

// crear una nueva parada
async function crearParadaAsync(nombre, referencia) {
  const nuevoId = paradas.length > 0 ? Math.max(...paradas.map((p) => p.id)) + 1 : 1;

  const nuevaParada = {
    id: nuevoId,
    nombre,
    referencia,
    activa: true
  };

  paradas.push(nuevaParada);
  return nuevaParada;
}

// mostrar todas las paradas
async function mostrarParadasAsync() {
  return paradas;
}

// buscar parada por su id
async function buscarParadaAsync(id) {
  const parada = paradas.find((p) => p.id === id);

  if (!parada) {
    throw new Error("Parada no encontrada");
  }
  
  return parada;
}

// actualizar datos de una parada
async function actualizarParadaAsync(id, datos) {
  const indice = paradas.findIndex((p) => p.id === id);

  if (indice === -1) {
    throw new Error("No se pudo actualizar, la parada no existe");
  }

  paradas[indice] = {
    ...paradas[indice],
    ...datos,
    id: paradas[indice].id 
  };

  return paradas[indice];
}

// cambiar el estado a inactiva (por ejemplo si una calle esta cerrada)
async function desactivarParadaAsync(id) {
  const indice = paradas.findIndex((p) => p.id === id);

  if (indice === -1) {
    throw new Error("No se pudo desactivar, la parada no existe");
  }

  paradas[indice].activa = false;
  return true;
}

// eliminar la parada de la memoria
async function eliminarParadaAsync(id) {
  const indice = paradas.findIndex((p) => p.id === id);

  if (indice === -1) {
    throw new Error("No se pudo eliminar, la parada no existe");
  }

  const eliminada = paradas.splice(indice, 1);
  return eliminada[0];
}

export {
  crearParadaAsync,
  mostrarParadasAsync,
  buscarParadaAsync,
  actualizarParadaAsync,
  desactivarParadaAsync,
  eliminarParadaAsync
};