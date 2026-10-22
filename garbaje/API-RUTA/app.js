import express from "express";
import v1Router from "./v1/app.js";

export const app = express();

// Permite leer el cuerpo (body) de las peticiones en formato JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API MI-RUTA FUNCIONANDO", version: "1.0" });
});

// Versión 1 de la API
app.use("/api/v1", v1Router);

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
