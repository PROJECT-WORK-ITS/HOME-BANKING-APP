import { Router } from "express";
import MovimentiContiCorrentiController from "./movimentiContiCorrenti.controller";
import movimentiContiCorrentiController from "./movimentiContiCorrenti.controller";
import movimentiContiCorrentiModel from "./movimentiContiCorrenti.model";

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
router.get(
  "/ultimoMovimento/:contoCorrenteId",
  MovimentiContiCorrentiController.getUltimoMovimento
);

export default router;
