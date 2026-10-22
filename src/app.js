import express from "express";
import rutasRouter from "./v1/routes/rutas.routes.js";
import unidadesRouter from "./v1/routes/unidades.routes.js";
import paradasRouter from "./v1/routes/paradas.routes.js";

export const app = express();

// Permite leer el cuerpo (body) de las peticiones en formato JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API MI-RUTA FUNCIONANDO", version: "1.0" });
});

// Montar las rutas de la versión 1 en la URL
app.use("/api/v1/rutas", rutasRouter);
app.use("/api/v1/unidades", unidadesRouter);
app.use("/api/v1/paradas", paradasRouter);

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ mensaje: "Ruta no encontrada." });
});

// Manejador global de errores (siempre después de las rutas)
app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || err.status || 500;
  res.status(statusCode).json({ mensaje: err.message || "Error interno del servidor" });
});

export default app;
