import express from "express";
import CategorieMovimentiRouter from "./CategorieMovimenti/categorieMovimenti.router";
import MovimentiContiCorrentiRouter from "./MovimentiContiCorrenti/movimentiContiCorrenti.router";

const router = express.Router();

router.use("/categorie-movimenti", CategorieMovimentiRouter);
router.use("/movimenti-conti-correnti", MovimentiContiCorrentiRouter);

export default router;
