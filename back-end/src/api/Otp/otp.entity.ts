export interface Otp {
    id?: string;
    email: string;
    otp: string;
    createdAt?: Date;
    validate?: Boolean
  }
  