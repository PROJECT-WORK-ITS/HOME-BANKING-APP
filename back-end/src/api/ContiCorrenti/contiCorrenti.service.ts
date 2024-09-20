import { ContoCorrente as ContoCorrenteModel } from "./contiCorrenti.model";
import { UserIdentity as UserIdentityModel } from "../../utils/auth/local/user-identity.model";
import { ContiCorrenti } from "./contiCorrenti.entity";
import { UserExistsError } from "../../errors/user-exists";
import * as bcrypt from 'bcrypt';


export class ContiCorrentiService {

  async add(contoCorrente: ContiCorrenti, credentials: {email: string, password: string}): Promise<ContiCorrenti> {
    const existingIdentity = await UserIdentityModel.findOne({'credentials.email': credentials.email});
    if (existingIdentity) {
      throw new UserExistsError();
    }
    const hashedPassword = await bcrypt.hash(credentials.password, 10);

    const newUser = await ContoCorrenteModel.create(contoCorrente);

    await UserIdentityModel.create({
      provider: 'local',
      user: newUser._id,
      credentials: {
        email: credentials.email,
        hashedPassword
      }
    })

    return newUser;
  }

}

export default new ContiCorrentiService();
