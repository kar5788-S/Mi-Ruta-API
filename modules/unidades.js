// arreglo simulando la base de datos de las combis o unidades
const unidades = [
  { id: 1, numeroEconomico: "05", placas: "PBA-12-34", modelo: "Toyota Hiace", activa: true },
  { id: 2, numeroEconomico: "12", placas: "PBA-56-78", modelo: "Nissan Urvan", activa: true },
  { id: 3, numeroEconomico: "08", placas: "PBA-90-12", modelo: "Toyota Hiace", activa: true }
];

// crear una nueva unidad
async function crearUnidadAsync(numeroEconomico, placas, modelo) {
  const nuevoId = unidades.length > 0 ? Math.max(...unidades.map((u) => u.id)) + 1 : 1;

  const nuevaUnidad = {
    id: nuevoId,
    numeroEconomico,
    placas,
    modelo,
    activa: true
  };

  unidades.push(nuevaUnidad);
  return nuevaUnidad;
}

// mostrar todas las unidades
async function mostrarUnidadesAsync() {
  // retornamos el arreglo directamente, al ser async se envuelve en promesa
  return unidades;
}

// buscar unidad por su id
async function buscarUnidadAsync(id) {
  const unidad = unidades.find((u) => u.id === id);

  if (!unidad) {
    throw new Error("Unidad no encontrada");
  }
  
  return unidad;
}

// actualizar datos de una unidad
async function actualizarUnidadAsync(id, datos) {
  const indice = unidades.findIndex((u) => u.id === id);

  if (indice === -1) {
    throw new Error("No se pudo actualizar, la unidad no existe");
  }

  // combinamos los datos
  unidades[indice] = {
    ...unidades[indice],
    ...datos,
    id: unidades[indice].id // protegemos el id para que no se sobreescriba
  };

  return unidades[indice];
}

// cambiar el estado a inactiva (por ejemplo si se descompone la combi)
async function desactivarUnidadAsync(id) {
  const indice = unidades.findIndex((u) => u.id === id);

  if (indice === -1) {
    throw new Error("No se pudo desactivar, la unidad no existe");
  }

  unidades[indice].activa = false;
  return true;
}

// eliminar la unidad de la memoria
async function eliminarUnidadAsync(id) {
  const indice = unidades.findIndex((u) => u.id === id);

  if (indice === -1) {
    throw new Error("No se pudo eliminar, la unidad no existe");
  }

  const eliminada = unidades.splice(indice, 1);
  return eliminada[0];
}

export {
  crearUnidadAsync,
  mostrarUnidadesAsync,
  buscarUnidadAsync,
  actualizarUnidadAsync,
  desactivarUnidadAsync,
  eliminarUnidadAsync
};