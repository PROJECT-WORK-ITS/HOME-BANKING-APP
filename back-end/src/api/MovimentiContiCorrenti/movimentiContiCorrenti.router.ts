import { Router } from "express";
import MovimentiContiCorrentiController from "./movimentiContiCorrenti.controller";

const router = Router();

router.post("/bonifico", MovimentiContiCorrentiController.effettuaBonifico);

export default router;
