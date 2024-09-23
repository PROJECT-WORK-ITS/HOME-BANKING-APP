import { Router } from 'express';
import logController from './log.controller';

// Crea un router per gestire le rotte relative ai log
const router = Router();

// Definisce la rotta POST per creare un nuovo log
router.post('/', logController.createLog);


// Esporta il router per essere utilizzato in altre parti dell'app
export default router;
