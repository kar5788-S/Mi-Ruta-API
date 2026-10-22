import { Router } from "express";
import * as paradasController from "../controllers/paradas.controller.js";

const router = Router();

router.get("/", paradasController.listar);
router.get("/:id", paradasController.obtenerPorId);
router.post("/", paradasController.crear);
router.put("/:id", paradasController.actualizar);
router.patch("/:id/desactivar", paradasController.desactivar);
router.delete("/:id", paradasController.eliminar);

export default router;
