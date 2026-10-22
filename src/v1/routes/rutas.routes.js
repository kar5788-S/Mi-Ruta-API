import { Router } from "express";
import * as rutasController from "../controllers/rutas.controller.js";

const router = Router();

router.get("/", rutasController.listar);
router.get("/:id", rutasController.obtenerPorId);
router.post("/", rutasController.crear);
router.put("/:id", rutasController.actualizar);
router.patch("/:id/desactivar", rutasController.desactivar);
router.delete("/:id", rutasController.eliminar);

export default router;
