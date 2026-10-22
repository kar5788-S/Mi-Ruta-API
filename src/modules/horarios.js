// arreglo simulando la base de datos de las frecuencias y horarios
const horarios = [
  { id: 1, rutaId: 1, horaSalida: "06:00 AM", dia: "Lunes a Viernes", activa: true },
  { id: 2, rutaId: 1, horaSalida: "06:30 AM", dia: "Lunes a Viernes", activa: true },
  { id: 3, rutaId: 3, horaSalida: "07:00 AM", dia: "Fines de semana", activa: true }
];

// crear un nuevo horario asignado a una ruta
async function crearHorarioAsync(rutaId, horaSalida, dia) {
  const nuevoId = horarios.length > 0 ? Math.max(...horarios.map((h) => h.id)) + 1 : 1;

  const nuevoHorario = {
    id: nuevoId,
    rutaId,
    horaSalida,
    dia,
    activa: true
  };

  horarios.push(nuevoHorario);
  return nuevoHorario;
}

// mostrar todos los horarios
async function mostrarHorariosAsync() {
  return horarios;
}

// buscar horario por su id
async function buscarHorarioAsync(id) {
  const horario = horarios.find((h) => h.id === id);

  if (!horario) {
    throw new Error("Horario no encontrado");
  }
  
  return horario;
}

// buscar todos los horarios que le pertenecen a una ruta en especifico
async function buscarHorariosPorRutaAsync(rutaId) {
  const horariosRuta = horarios.filter((h) => h.rutaId === rutaId);
  return horariosRuta; // Retorna un arreglo (puede estar vacio si no hay horarios)
}

// actualizar datos de un horario (por si cambia la hora de salida)
async function actualizarHorarioAsync(id, datos) {
  const indice = horarios.findIndex((h) => h.id === id);

  if (indice === -1) {
    throw new Error("No se pudo actualizar, el horario no existe");
  }

  horarios[indice] = {
    ...horarios[indice],
    ...datos,
    id: horarios[indice].id 
  };

  return horarios[indice];
}

// suspender un horario temporalmente
async function desactivarHorarioAsync(id) {
  const indice = horarios.findIndex((h) => h.id === id);

  if (indice === -1) {
    throw new Error("No se pudo desactivar, el horario no existe");
  }

  horarios[indice].activa = false;
  return true;
}

// eliminar el horario de la memoria
async function eliminarHorarioAsync(id) {
  const indice = horarios.findIndex((h) => h.id === id);

  if (indice === -1) {
    throw new Error("No se pudo eliminar, el horario no existe");
  }

  const eliminado = horarios.splice(indice, 1);
  return eliminado[0];
}

export {
  crearHorarioAsync,
  mostrarHorariosAsync,
  buscarHorarioAsync,
  buscarHorariosPorRutaAsync,
  actualizarHorarioAsync,
  desactivarHorarioAsync,
  eliminarHorarioAsync
};