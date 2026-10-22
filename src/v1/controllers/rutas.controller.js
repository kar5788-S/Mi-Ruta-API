import * as rutasService from "../services/rutas.services.js";
import { validarRuta } from "../models/rutas.model.js";

function convertirId(valor) {
  const id = Number(valor);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function responderError(err, res, next) {
  if (err.statusCode) {
    return res.status(err.statusCode).json({ mensaje: err.message });
  }
  return next(err);
}

// GET /api/v1/rutas?nombre=&activa=
export async function listar(req, res, next) {
  try {
    let activa;
    if (req.query.activa !== undefined) {
      if (req.query.activa !== "true" && req.query.activa !== "false") {
        return res.status(400).json({ mensaje: "El parámetro 'activa' debe ser 'true' o 'false'." });
      }
      activa = req.query.activa === "true";
    }
    const rutas = await rutasService.listaRutas({ nombre: req.query.nombre, activa });
    return res.status(200).json({ total: rutas.length, datos: rutas });
  } catch (err) {
    return responderError(err, res, next);
  }
}

// GET /api/v1/rutas/:id
export async function obtenerPorId(req, res, next) {
  const id = convertirId(req.params.id);
  if (id === null) {
    return res.status(400).json({ mensaje: "El ID debe ser un entero positivo." });
  }
  try {
    const ruta = await rutasService.obtenerRutaId(id);
    if (!ruta) return res.status(404).json({ mensaje: "Ruta no encontrada." });
    return res.status(200).json(ruta);
  } catch (err) {
    return responderError(err, res, next);
  }
}

// POST /api/v1/rutas
export async function crear(req, res, next) {
  const { errores, datos } = validarRuta(req.body ?? {});
  if (errores.length) {
    return res.status(400).json({ mensaje: "Datos inválidos.", errores });
  }
  try {
    const ruta = await rutasService.crearRuta(datos);
    return res.status(201).json(ruta);
  } catch (err) {
    return responderError(err, res, next);
  }
}

// PUT /api/v1/rutas/:id  (acepta uno o varios campos)
export async function actualizar(req, res, next) {
  const id = convertirId(req.params.id);
  if (id === null) {
    return res.status(400).json({ mensaje: "El ID debe ser un entero positivo." });
  }
  const { errores, datos } = validarRuta(req.body ?? {}, { parcial: true });
  if (errores.length) {
    return res.status(400).json({ mensaje: "Datos inválidos.", errores });
  }
  if (Object.keys(datos).length === 0) {
    return res.status(400).json({ mensaje: "Debe proporcionar al menos un campo válido para actualizar." });
  }
  try {
    const ruta = await rutasService.actualizarRuta(id, datos);
    if (!ruta) return res.status(404).json({ mensaje: "Ruta no encontrada." });
    return res.status(200).json(ruta);
  } catch (err) {
    return responderError(err, res, next);
  }
}

// PATCH /api/v1/rutas/:id/desactivar
export async function desactivar(req, res, next) {
  const id = convertirId(req.params.id);
  if (id === null) {
    return res.status(400).json({ mensaje: "El ID debe ser un entero positivo." });
  }
  try {
    const ruta = await rutasService.desactivarRuta(id);
    if (!ruta) return res.status(404).json({ mensaje: "Ruta no encontrada." });
    return res.status(200).json({ mensaje: "Ruta desactivada correctamente.", ruta });
  } catch (err) {
    return responderError(err, res, next);
  }
}

// DELETE /api/v1/rutas/:id
export async function eliminar(req, res, next) {
  const id = convertirId(req.params.id);
  if (id === null) {
    return res.status(400).json({ mensaje: "El ID debe ser un entero positivo." });
  }
  try {
    const ruta = await rutasService.eliminarRuta(id);
    if (!ruta) return res.status(404).json({ mensaje: "Ruta no encontrada." });
    return res.status(200).json({ mensaje: "Ruta eliminada correctamente.", ruta });
  } catch (err) {
    return responderError(err, res, next);
  }
}
