import { Router } from "express";
import { validate } from "../../utils/validation-middleware";
import { AddUserDTO, LoginDTO } from "./auth.dto";
import { add, changePassword, login } from "./auth.controller";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";


const router = Router();

router.post('/login', validate(LoginDTO), login);
router.post('/register', validate(AddUserDTO, 'body'), add);
router.post('/change-password', isAuthenticated, changePassword)

export default router;