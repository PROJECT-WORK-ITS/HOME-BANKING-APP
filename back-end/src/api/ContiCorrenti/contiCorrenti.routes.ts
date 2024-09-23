import { Router } from "express";
import { updIBAN } from "./contiCorrenti.controller";


const router = Router();

router.patch("/IBAN", updIBAN);

export default router;
