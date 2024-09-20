import { Router } from "express";
import { validate } from "../../utils/validation-middleware";
import { CheckOtpDto, SendOtpDto } from "./otp.dto";
import { sendOtp } from "./otp.controller";


const router = Router();

router.post('/ckeck', validate(CheckOtpDto), );
router.post('/send', validate(SendOtpDto), sendOtp);

export default router;