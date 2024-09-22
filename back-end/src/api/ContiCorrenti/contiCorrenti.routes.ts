import { Router } from "express";
import { checkCompleted } from "./contiCorrenti.controller";


const router = Router();

router.patch("/IBAN", checkCompleted);

export default router;
