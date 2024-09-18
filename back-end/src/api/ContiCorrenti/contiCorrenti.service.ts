import { contiCorrenti } from "./contiCorrenti.entity";
import { UserIdentity as UserIdentityModel } from "../../utils/auth/local/user-identity.model";
import { contoCorrente as contoCorrenteModel } from "./contiCorrenti.model";
import * as bcrypt from 'bcrypt';

export class ContiCorrentiService {
    async add(contoCorrente: contiCorrenti, credentials: {email: string, password: string}): Promise<contiCorrenti> {
        const existingIdentity = await UserIdentityModel.findOne({'credentials.username': credentials.email});
        if (existingIdentity) {
          //throw new UserExistsError();
        }
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
    
        const newUser = await contoCorrenteModel.create(contoCorrente);
    
        await UserIdentityModel.create({
          provider: 'local',
          user: newUser._id,
          credentials: {
            username: credentials.email,
            hashedPassword
          }
        })
    
        return newUser;
      }
}

