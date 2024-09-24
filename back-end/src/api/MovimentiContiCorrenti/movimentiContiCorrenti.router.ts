import { Router } from "express";
import MovimentiContiCorrentiController from "./movimentiContiCorrenti.controller";
import movimentiContiCorrentiController from "./movimentiContiCorrenti.controller";

const router = Router();

router.post("/bonifico", MovimentiContiCorrentiController.effettuaBonifico);
router.get(
  "/allUserMovimenti/:id",
  MovimentiContiCorrentiController.getAllUSerMovimenti
);
router.post("/ricarica", MovimentiContiCorrentiController.ricaricaTelefonica);
router.get(
  "/saldoUser/:contoCorrenteId",
  movimentiContiCorrentiController.getSaldoCorrente
);

export default router;
