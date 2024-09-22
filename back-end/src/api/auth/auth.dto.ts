import { Type } from "class-transformer";
import { IsDate, IsEmail, IsMongoId, IsOptional, IsString, IsUrl, Matches, MinLength } from "class-validator";

export class AddUserDTO {
  @IsString()
  lastName: string;

  @IsString()
  firstName: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  openingDate: Date;

  @IsString()
  @Type(() => String)
  @IsOptional()
  IBAN: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  @Matches(
    new RegExp('^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$'),
    {
      message: 'password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and a special character'
    }
  )
  password: string;

}


export class LoginDTO {

    @IsEmail()
    email: string;
  
    @IsString()
    password: string;
  }