import { Router } from "express";
import CategorieMovimentiController from "./categorieMovimenti.controller";

const router = Router();

router.get("/", CategorieMovimentiController.getAll);
router.post("/", CategorieMovimentiController.create);
router.put("/:id", CategorieMovimentiController.update);
router.delete("/:id", CategorieMovimentiController.delete);

export default router;
