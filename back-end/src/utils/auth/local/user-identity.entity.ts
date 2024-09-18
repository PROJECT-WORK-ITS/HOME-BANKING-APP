import { contiCorrente } from "../../../api/ContiCorrenti/contiCorrente.entity";

export interface UserIdentity {
    id: string;
    provider: string;
    credentials: {
        username: string;
        hashedPassword: string;
    };
    contoCorrente: contiCorrente;
}
