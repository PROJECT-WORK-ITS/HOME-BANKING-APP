import { Otp as OtpEntity} from "./otp.entity";
import nodemailer from "nodemailer";
import { getEnvVariable } from "../../utils/db/envVariableControl";
import * as bcrypt from 'bcrypt';
import { OtpModel } from "./otp.model";

export class OtpService {

    async sendOtp(email: string, otp: string): Promise<OtpEntity> {

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: getEnvVariable("AUTH_EMAIL"),
                pass: getEnvVariable("AUTH_PASSWORD"),
            },
        });

        const htmlOtp = `
        <h2>Benvenuto su homebanking!</h2>
        <p>Inserire il seguente codice per completare la registrazione:</p>
        <h4>${otp}</h4><br>
        <p>Una volta attivato l'account puoi accedere alle informazioni sul tuo conto tramite il sito. Se la persona che ha provato a registrarsi non sei tu, per favore ignora il messaggio</p>`;

        const mailOptions = {
            from: getEnvVariable("AUTH_EMAIL"),
            to: email,
            subject: "Verify your email",
            html: htmlOtp
        };

        const saltFactor = 10
        const hashedOtp = await bcrypt.hash(otp, saltFactor)

        await transporter.sendMail(mailOptions);
        const newOtp = await OtpModel.create({email: email, otp: hashedOtp});
        return newOtp;
    }
}

export default new OtpService();