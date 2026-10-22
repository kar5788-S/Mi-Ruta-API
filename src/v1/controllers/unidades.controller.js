import * as unidadesService from "../services/unidades.services.js";

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

// Valida los campos de una unidad. parcial = true solo revisa los enviados.
function validarUnidad(body = {}, parcial = false) {
  const errores = [];
  const datos = {};
  const { placa, modelo, capacidad, rutaId, activa } = body;

  for (const [campo, valor] of Object.entries({ placa, modelo })) {
    if (valor === undefined) {
      if (!parcial) errores.push(`${campo} es obligatorio.`);
    } else if (typeof valor !== "string" || !valor.trim()) {
      errores.push(`${campo} debe ser un texto no vacío.`);
    } else {
      datos[campo] = valor.trim();
    }
  }

  for (const [campo, valor] of Object.entries({ capacidad, rutaId })) {
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

// GET /api/v1/unidades?placa=&rutaId=&activa=
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
    const unidades = await unidadesService.listaUnidades({ placa: req.query.placa, rutaId, activa });
    return res.status(200).json({ total: unidades.length, datos: unidades });
  } catch (err) {
    return responderError(err, res, next);
  }
}

// GET /api/v1/unidades/:id
export async function obtenerPorId(req, res, next) {
  const id = convertirId(req.params.id);
  if (id === null) {
    return res.status(400).json({ mensaje: "El ID debe ser un entero positivo." });
  }
  try {
    const unidad = await unidadesService.obtenerUnidadId(id);
    if (!unidad) return res.status(404).json({ mensaje: "Unidad no encontrada." });
    return res.status(200).json(unidad);
  } catch (err) {
    return responderError(err, res, next);
  }
}

// POST /api/v1/unidades
export async function crear(req, res, next) {
  const { errores, datos } = validarUnidad(req.body ?? {});
  if (errores.length) {
    return res.status(400).json({ mensaje: "Datos inválidos.", errores });
  }
  try {
    const unidad = await unidadesService.crearUnidad(datos);
    return res.status(201).json(unidad);
  } catch (err) {
    return responderError(err, res, next);
  }
}

// PUT /api/v1/unidades/:id
export async function actualizar(req, res, next) {
  const id = convertirId(req.params.id);
  if (id === null) {
    return res.status(400).json({ mensaje: "El ID debe ser un entero positivo." });
  }
  const { errores, datos } = validarUnidad(req.body ?? {}, true);
  if (errores.length) {
    return res.status(400).json({ mensaje: "Datos inválidos.", errores });
  }
  if (Object.keys(datos).length === 0) {
    return res.status(400).json({ mensaje: "Debe proporcionar al menos un campo válido para actualizar." });
  }
  try {
    const unidad = await unidadesService.actualizarUnidad(id, datos);
    if (!unidad) return res.status(404).json({ mensaje: "Unidad no encontrada." });
    return res.status(200).json(unidad);
  } catch (err) {
    return responderError(err, res, next);
  }
}

// PATCH /api/v1/unidades/:id/desactivar
export async function desactivar(req, res, next) {
  const id = convertirId(req.params.id);
  if (id === null) {
    return res.status(400).json({ mensaje: "El ID debe ser un entero positivo." });
  }
  try {
    const unidad = await unidadesService.desactivarUnidad(id);
    if (!unidad) return res.status(404).json({ mensaje: "Unidad no encontrada." });
    return res.status(200).json({ mensaje: "Unidad desactivada correctamente.", unidad });
  } catch (err) {
    return responderError(err, res, next);
  }
}

// DELETE /api/v1/unidades/:id
export async function eliminar(req, res, next) {
  const id = convertirId(req.params.id);
  if (id === null) {
    return res.status(400).json({ mensaje: "El ID debe ser un entero positivo." });
  }
  try {
    const unidad = await unidadesService.eliminarUnidad(id);
    if (!unidad) return res.status(404).json({ mensaje: "Unidad no encontrada." });
    return res.status(200).json({ mensaje: "Unidad eliminada correctamente.", unidad });
  } catch (err) {
    return responderError(err, res, next);
  }
}
