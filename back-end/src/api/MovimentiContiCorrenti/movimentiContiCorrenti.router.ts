import { Router } from "express";
import MovimentiContiCorrentiController from "./movimentiContiCorrenti.controller";
import movimentiContiCorrentiController from "./movimentiContiCorrenti.controller";
import movimentiContiCorrentiModel from "./movimentiContiCorrenti.model";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";

const router = Router();
router.use(isAuthenticated);
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
