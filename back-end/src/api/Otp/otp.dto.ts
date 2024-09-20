import { IsEmail, IsString } from "class-validator";

export class CheckOtpDto {

    @IsEmail()
    email: string;
  
    @IsString()
    otp: string;

  }

export class SendOtpDto {

  @IsEmail()
  email: string;

}