// Esquema de validación de una Ruta.
// parcial = true  -> solo se validan los campos enviados (para actualizar)
// parcial = false -> todos los campos obligatorios deben venir (para crear)
export function validarRuta(body = {}, { parcial = false } = {}) {
  const errores = [];
  const datos = {};
  const { nombre, origen, destino, tarifa, activa } = body;

  for (const [campo, valor] of Object.entries({ nombre, origen, destino })) {
    if (valor === undefined) {
      if (!parcial) errores.push(`${campo} es obligatorio.`);
      continue;
    }
    if (typeof valor !== "string" || !valor.trim()) {
      errores.push(`${campo} debe ser un texto no vacío.`);
    } else {
      datos[campo] = valor.trim();
    }
  }

  if (tarifa === undefined) {
    if (!parcial) errores.push("tarifa es obligatoria.");
  } else if (typeof tarifa !== "number" || Number.isNaN(tarifa) || tarifa < 0) {
    errores.push("tarifa debe ser un número mayor o igual a 0.");
  } else {
    datos.tarifa = tarifa;
  }

  if (activa === undefined) {
    if (!parcial) datos.activa = true; // por defecto activa
  } else if (typeof activa !== "boolean") {
    errores.push("activa debe ser true o false.");
  } else {
    datos.activa = activa;
  }

  return { errores, datos };
}
