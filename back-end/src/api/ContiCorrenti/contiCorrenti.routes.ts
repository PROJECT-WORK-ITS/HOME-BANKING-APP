import { Router } from "express";
import { me } from "./contiCorrenti.controller";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";


const router = Router();

router.patch("/me", isAuthenticated, me);

export default router;
