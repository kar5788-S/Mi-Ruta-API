import { readFile, writeFile } from "node:fs/promises";
import { obtenerRutaId } from "./rutas.services.js";

const rutaArchivo = new URL("../../data/paradas.json", import.meta.url);

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

async function leerParadas() {
  return JSON.parse(await readFile(rutaArchivo, "utf-8"));
}

async function guardarParadas(paradas) {
  await writeFile(rutaArchivo, JSON.stringify(paradas, null, 2), "utf-8");
}

async function verificarRuta(rutaId) {
  const ruta = await obtenerRutaId(rutaId);
  if (!ruta) throw crearError("La ruta indicada no existe.", 404);
}

// Las paradas se devuelven en el orden en que se recorren dentro de su ruta
export async function listaParadas({ nombre, rutaId, activa } = {}) {
  let paradas = await leerParadas();
  if (nombre) {
    const buscado = normalizarTexto(nombre);
    paradas = paradas.filter((p) => normalizarTexto(p.nombre).includes(buscado));
  }
  if (rutaId !== undefined) paradas = paradas.filter((p) => p.rutaId === rutaId);
  if (activa !== undefined) paradas = paradas.filter((p) => p.activa === activa);
  return paradas.sort((a, b) => a.rutaId - b.rutaId || a.orden - b.orden);
}

export async function obtenerParadaId(id) {
  const paradas = await leerParadas();
  return paradas.find((p) => p.id === id) ?? null;
}

export async function crearParada(datos) {
  await verificarRuta(datos.rutaId);
  const paradas = await leerParadas();
  if (paradas.some((p) => p.rutaId === datos.rutaId && p.orden === datos.orden)) {
    throw crearError("Ya existe una parada con ese orden en la ruta.", 409);
  }
  const nuevoId = paradas.length ? Math.max(...paradas.map((p) => p.id)) + 1 : 1;
  const nueva = { id: nuevoId, ...datos };
  paradas.push(nueva);
  await guardarParadas(paradas);
  return nueva;
}

export async function actualizarParada(id, datos) {
  const paradas = await leerParadas();
  const indice = paradas.findIndex((p) => p.id === id);
  if (indice === -1) return null;
  if (datos.rutaId !== undefined) await verificarRuta(datos.rutaId);
  const resultado = { ...paradas[indice], ...datos };
  if (paradas.some((p) => p.id !== id && p.rutaId === resultado.rutaId && p.orden === resultado.orden)) {
    throw crearError("Ya existe una parada con ese orden en la ruta.", 409);
  }
  paradas[indice] = resultado;
  await guardarParadas(paradas);
  return resultado;
}

export async function desactivarParada(id) {
  return actualizarParada(id, { activa: false });
}

export async function eliminarParada(id) {
  const paradas = await leerParadas();
  const indice = paradas.findIndex((p) => p.id === id);
  if (indice === -1) return null;
  const [eliminada] = paradas.splice(indice, 1);
  await guardarParadas(paradas);
  return eliminada;
}
