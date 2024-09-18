import { Router } from "express";
import MovimentiContiCorrentiController from "./movimentiContiCorrenti.controller";

const router = Router();

router.post("/", MovimentiContiCorrentiController.createMovimento);

export default router;
