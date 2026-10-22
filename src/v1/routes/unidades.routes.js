import { Router } from "express";
import * as unidadesController from "../controllers/unidades.controller.js";

const router = Router();

router.get("/", unidadesController.listar);
router.get("/:id", unidadesController.obtenerPorId);
router.post("/", unidadesController.crear);
router.put("/:id", unidadesController.actualizar);
router.patch("/:id/desactivar", unidadesController.desactivar);
router.delete("/:id", unidadesController.eliminar);

export default router;
