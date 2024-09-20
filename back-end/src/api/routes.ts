import express from "express";
import CategorieMovimentiRouter from "./CategorieMovimenti/categorieMovimenti.router";
import MovimentiContiCorrentiRouter from "./MovimentiContiCorrenti/movimentiContiCorrenti.router";
import authRoute from "./Auth/auth.routes";

const router = express.Router();

router.use("/categorie-movimenti", CategorieMovimentiRouter);
router.use("/movimenti-conti-correnti", MovimentiContiCorrentiRouter);
router.use("/conti-correnti", CategorieMovimentiRouter);
router.use(authRoute)

export default router;
