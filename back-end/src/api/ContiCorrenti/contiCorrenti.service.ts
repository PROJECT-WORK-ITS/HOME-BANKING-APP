import { ContoCorrente, ContoCorrente as ContoCorrenteModel } from "./contiCorrenti.model";
import { UserIdentity as UserIdentityModel } from "../../utils/auth/local/user-identity.model";
import { ContiCorrenti } from "./contiCorrenti.entity";
import { UserExistsError } from "../../errors/user-exists";
import * as bcrypt from 'bcrypt';
import { OtpModel } from "../Otp/otp.model";
import { NotFoundError } from "../../errors/not-found";


export class ContiCorrentiService {

  async add(contoCorrente: ContiCorrenti, credentials: {email: string, password: string}): Promise<ContiCorrenti> {
    const existingIdentity = await UserIdentityModel.findOne({'credentials.email': credentials.email});
    if (existingIdentity) {
      throw new UserExistsError();
    }

    const validEmail = await OtpModel.findOne({'email': credentials.email, 'valid': true});
    if (!validEmail) {
      throw new Error("Email non verificata");
    }

    const hashedPassword = await bcrypt.hash(credentials.password, 10);

    const newConto = await ContoCorrenteModel.create(contoCorrente);

    await UserIdentityModel.create({
      provider: 'local',
      contoCorrente: newConto._id,
      credentials: {
        email: credentials.email,
        hashedPassword
      }
    })

    return newConto;
  }

  async updIBAN(id: string, IBAN: string): Promise<ContiCorrenti> {
      
      const existing = await ContoCorrente.findOne({_id: id});
      if (!existing) {
        throw new NotFoundError();
      }
      
      const filter = { _id: id };
      const update = { IBAN: IBAN };
  
      const updConto = await ContoCorrente.findOneAndUpdate(filter, update, { new: true });
      
      return updConto!;

  }

}




export default new ContiCorrentiService();
