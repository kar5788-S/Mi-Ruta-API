// arreglo simulando la base de datos de los reportes o quejas
const reportes = [
  { id: 1, usuarioId: 3, rutaId: 1, tipo: "Retraso", descripcion: "La combi lleva 20 minutos sin pasar", estado: "Pendiente" },
  { id: 2, usuarioId: 3, rutaId: 4, tipo: "Queja", descripcion: "El chofer no respeto la parada", estado: "Resuelto" },
  { id: 3, usuarioId: 3, rutaId: 2, tipo: "Incidente", descripcion: "Calle cerrada por obras, se desvio la ruta", estado: "Pendiente" }
];

// crear un nuevo reporte
async function crearReporteAsync(usuarioId, rutaId, tipo, descripcion) {
  const nuevoId = reportes.length > 0 ? Math.max(...reportes.map((r) => r.id)) + 1 : 1;

  const nuevoReporte = {
    id: nuevoId,
    usuarioId,
    rutaId,
    tipo,
    descripcion,
    estado: "Pendiente" // por defecto un reporte nuevo entra como pendiente
  };

  reportes.push(nuevoReporte);
  return nuevoReporte;
}

// mostrar todos los reportes
async function mostrarReportesAsync() {
  return reportes;
}

// buscar reporte por su id
async function buscarReporteAsync(id) {
  const reporte = reportes.find((r) => r.id === id);

  if (!reporte) {
    throw new Error("Reporte no encontrado");
  }
  
  return reporte;
}

// actualizar datos de un reporte (ej. si el usuario quiere agregar mas detalles)
async function actualizarReporteAsync(id, datos) {
  const indice = reportes.findIndex((r) => r.id === id);

  if (indice === -1) {
    throw new Error("No se pudo actualizar, el reporte no existe");
  }

  reportes[indice] = {
    ...reportes[indice],
    ...datos,
    id: reportes[indice].id 
  };

  return reportes[indice];
}

// cambiar el estado a resuelto (en lugar de desactivarlo, en este modulo tiene mas sentido resolverlo)
async function resolverReporteAsync(id) {
  const indice = reportes.findIndex((r) => r.id === id);

  if (indice === -1) {
    throw new Error("No se pudo resolver, el reporte no existe");
  }

  reportes[indice].estado = "Resuelto";
  return true;
}

// eliminar el reporte de la memoria
async function eliminarReporteAsync(id) {
  const indice = reportes.findIndex((r) => r.id === id);

  if (indice === -1) {
    throw new Error("No se pudo eliminar, el reporte no existe");
  }

  const eliminado = reportes.splice(indice, 1);
  return eliminado[0];
}

export {
  crearReporteAsync,
  mostrarReportesAsync,
  buscarReporteAsync,
  actualizarReporteAsync,
  resolverReporteAsync,
  eliminarReporteAsync
};