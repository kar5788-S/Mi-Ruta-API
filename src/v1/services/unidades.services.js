import { readFile, writeFile } from "node:fs/promises";
import { obtenerRutaId } from "./rutas.services.js";

const rutaArchivo = new URL("../../data/unidades.json", import.meta.url);

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

async function leerUnidades() {
  return JSON.parse(await readFile(rutaArchivo, "utf-8"));
}

async function guardarUnidades(unidades) {
  await writeFile(rutaArchivo, JSON.stringify(unidades, null, 2), "utf-8");
}

// Regla de negocio: una unidad solo puede asignarse a una ruta que exista
async function verificarRuta(rutaId) {
  const ruta = await obtenerRutaId(rutaId);
  if (!ruta) throw crearError("La ruta indicada no existe.", 404);
}

export async function listaUnidades({ placa, rutaId, activa } = {}) {
  let unidades = await leerUnidades();
  if (placa) {
    const buscada = normalizarTexto(placa);
    unidades = unidades.filter((u) => normalizarTexto(u.placa).includes(buscada));
  }
  if (rutaId !== undefined) unidades = unidades.filter((u) => u.rutaId === rutaId);
  if (activa !== undefined) unidades = unidades.filter((u) => u.activa === activa);
  return unidades;
}

export async function obtenerUnidadId(id) {
  const unidades = await leerUnidades();
  return unidades.find((u) => u.id === id) ?? null;
}

export async function crearUnidad(datos) {
  await verificarRuta(datos.rutaId);
  const unidades = await leerUnidades();
  if (unidades.some((u) => normalizarTexto(u.placa) === normalizarTexto(datos.placa))) {
    throw crearError("Ya existe una unidad con esa placa.", 409);
  }
  const nuevoId = unidades.length ? Math.max(...unidades.map((u) => u.id)) + 1 : 1;
  const nueva = { id: nuevoId, ...datos };
  unidades.push(nueva);
  await guardarUnidades(unidades);
  return nueva;
}

export async function actualizarUnidad(id, datos) {
  const unidades = await leerUnidades();
  const indice = unidades.findIndex((u) => u.id === id);
  if (indice === -1) return null;
  if (datos.rutaId !== undefined) await verificarRuta(datos.rutaId);
  if (
    datos.placa &&
    unidades.some((u) => u.id !== id && normalizarTexto(u.placa) === normalizarTexto(datos.placa))
  ) {
    throw crearError("Ya existe una unidad con esa placa.", 409);
  }
  unidades[indice] = { ...unidades[indice], ...datos };
  await guardarUnidades(unidades);
  return unidades[indice];
}

export async function desactivarUnidad(id) {
  return actualizarUnidad(id, { activa: false });
}

export async function eliminarUnidad(id) {
  const unidades = await leerUnidades();
  const indice = unidades.findIndex((u) => u.id === id);
  if (indice === -1) return null;
  const [eliminada] = unidades.splice(indice, 1);
  await guardarUnidades(unidades);
  return eliminada;
}
