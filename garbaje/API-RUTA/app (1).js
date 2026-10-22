import { Router } from "express";
import rutasRouter from "./routes/rutas.routes.js";
import unidadesRouter from "./routes/unidades.routes.js";
import paradasRouter from "./routes/paradas.routes.js";

const router = Router();

router.use("/rutas", rutasRouter);
router.use("/unidades", unidadesRouter);
router.use("/paradas", paradasRouter);

export default router;
