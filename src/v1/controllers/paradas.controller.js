import * as paradasService from "../services/paradas.services.js";

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

function validarParada(body = {}, parcial = false) {
  const errores = [];
  const datos = {};
  const { nombre, rutaId, orden, activa } = body;

  if (nombre === undefined) {
    if (!parcial) errores.push("nombre es obligatorio.");
  } else if (typeof nombre !== "string" || !nombre.trim()) {
    errores.push("nombre debe ser un texto no vacío.");
  } else {
    datos.nombre = nombre.trim();
  }

  for (const [campo, valor] of Object.entries({ rutaId, orden })) {
    if (valor === undefined) {
      if (!parcial) errores.push(`${campo} es obligatorio.`);
    } else if (!Number.isInteger(valor) || valor < 1) {
      errores.push(`${campo} debe ser un entero positivo.`);
    } else {
      datos[campo] = valor;
    }
  }

  if (activa === undefined) {
    if (!parcial) datos.activa = true;
  } else if (typeof activa !== "boolean") {
    errores.push("activa debe ser true o false.");
  } else {
    datos.activa = activa;
  }
  return { errores, datos };
}

// GET /api/v1/paradas?nombre=&rutaId=&activa=
export async function listar(req, res, next) {
  try {
    let activa;
    if (req.query.activa !== undefined) {
      if (req.query.activa !== "true" && req.query.activa !== "false") {
        return res.status(400).json({ mensaje: "El parámetro 'activa' debe ser 'true' o 'false'." });
      }
      activa = req.query.activa === "true";
    }
    let rutaId;
    if (req.query.rutaId !== undefined) {
      rutaId = convertirId(req.query.rutaId);
      if (rutaId === null) {
        return res.status(400).json({ mensaje: "rutaId debe ser un entero positivo." });
      }
    }
    const paradas = await paradasService.listaParadas({ nombre: req.query.nombre, rutaId, activa });
    return res.status(200).json({ total: paradas.length, datos: paradas });
  } catch (err) {
    return responderError(err, res, next);
  }
}

// GET /api/v1/paradas/:id
export async function obtenerPorId(req, res, next) {
  const id = convertirId(req.params.id);
  if (id === null) {
    return res.status(400).json({ mensaje: "El ID debe ser un entero positivo." });
  }
  try {
    const parada = await paradasService.obtenerParadaId(id);
    if (!parada) return res.status(404).json({ mensaje: "Parada no encontrada." });
    return res.status(200).json(parada);
  } catch (err) {
    return responderError(err, res, next);
  }
}

// POST /api/v1/paradas
export async function crear(req, res, next) {
  const { errores, datos } = validarParada(req.body ?? {});
  if (errores.length) {
    return res.status(400).json({ mensaje: "Datos inválidos.", errores });
  }
  try {
    const parada = await paradasService.crearParada(datos);
    return res.status(201).json(parada);
  } catch (err) {
    return responderError(err, res, next);
  }
}

// PUT /api/v1/paradas/:id
export async function actualizar(req, res, next) {
  const id = convertirId(req.params.id);
  if (id === null) {
    return res.status(400).json({ mensaje: "El ID debe ser un entero positivo." });
  }
  const { errores, datos } = validarParada(req.body ?? {}, true);
  if (errores.length) {
    return res.status(400).json({ mensaje: "Datos inválidos.", errores });
  }
  if (Object.keys(datos).length === 0) {
    return res.status(400).json({ mensaje: "Debe proporcionar al menos un campo válido para actualizar." });
  }
  try {
    const parada = await paradasService.actualizarParada(id, datos);
    if (!parada) return res.status(404).json({ mensaje: "Parada no encontrada." });
    return res.status(200).json(parada);
  } catch (err) {
    return responderError(err, res, next);
  }
}

// PATCH /api/v1/paradas/:id/desactivar
export async function desactivar(req, res, next) {
  const id = convertirId(req.params.id);
  if (id === null) {
    return res.status(400).json({ mensaje: "El ID debe ser un entero positivo." });
  }
  try {
    const parada = await paradasService.desactivarParada(id);
    if (!parada) return res.status(404).json({ mensaje: "Parada no encontrada." });
    return res.status(200).json({ mensaje: "Parada desactivada correctamente.", parada });
  } catch (err) {
    return responderError(err, res, next);
  }
}

// DELETE /api/v1/paradas/:id
export async function eliminar(req, res, next) {
  const id = convertirId(req.params.id);
  if (id === null) {
    return res.status(400).json({ mensaje: "El ID debe ser un entero positivo." });
  }
  try {
    const parada = await paradasService.eliminarParada(id);
    if (!parada) return res.status(404).json({ mensaje: "Parada no encontrada." });
    return res.status(200).json({ mensaje: "Parada eliminada correctamente.", parada });
  } catch (err) {
    return responderError(err, res, next);
  }
}
