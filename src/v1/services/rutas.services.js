import { readFile, writeFile } from "node:fs/promises";

const rutaArchivo = new URL("../../data/rutas.json", import.meta.url);

// Utilidades
function crearError(mensaje, statusCode) {
  const error = new Error(mensaje);
  error.statusCode = statusCode;
  return error;
}

function normalizarTexto(valor = "") {
  return String(valor)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es-MX")
    .trim();
}

async function leerRutas() {
  return JSON.parse(await readFile(rutaArchivo, "utf-8"));
}

async function guardarRutas(rutas) {
  await writeFile(rutaArchivo, JSON.stringify(rutas, null, 2), "utf-8");
}

// Operaciones
export async function listaRutas({ nombre, activa } = {}) {
  let rutas = await leerRutas();
  if (nombre) {
    const buscado = normalizarTexto(nombre);
    rutas = rutas.filter((r) => normalizarTexto(r.nombre).includes(buscado));
  }
  if (activa !== undefined) rutas = rutas.filter((r) => r.activa === activa);
  return rutas;
}

export async function obtenerRutaId(id) {
  const rutas = await leerRutas();
  return rutas.find((r) => r.id === id) ?? null;
}

export async function crearRuta(datos) {
  const rutas = await leerRutas();
  if (rutas.some((r) => normalizarTexto(r.nombre) === normalizarTexto(datos.nombre))) {
    throw crearError("Ya existe una ruta con ese nombre.", 409);
  }
  const nuevoId = rutas.length ? Math.max(...rutas.map((r) => r.id)) + 1 : 1;
  const nueva = { id: nuevoId, ...datos };
  rutas.push(nueva);
  await guardarRutas(rutas);
  return nueva;
}

export async function actualizarRuta(id, datos) {
  const rutas = await leerRutas();
  const indice = rutas.findIndex((r) => r.id === id);
  if (indice === -1) return null;
  if (
    datos.nombre &&
    rutas.some((r) => r.id !== id && normalizarTexto(r.nombre) === normalizarTexto(datos.nombre))
  ) {
    throw crearError("Ya existe una ruta con ese nombre.", 409);
  }
  rutas[indice] = { ...rutas[indice], ...datos };
  await guardarRutas(rutas);
  return rutas[indice];
}

export async function desactivarRuta(id) {
  return actualizarRuta(id, { activa: false });
}

export async function eliminarRuta(id) {
  const rutas = await leerRutas();
  const indice = rutas.findIndex((r) => r.id === id);
  if (indice === -1) return null;
  const [eliminada] = rutas.splice(indice, 1);
  await guardarRutas(rutas);
  return eliminada;
}
