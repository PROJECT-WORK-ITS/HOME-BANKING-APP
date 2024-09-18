import { Type } from "class-transformer";
import { IsDate, IsMongoId, IsOptional } from "class-validator";

export class contiCorrenteDto {
    @Type(() => String)
    lastName: string;
    
    @Type(() => String)
    firstName: string;

    @Type(() => Date)
    @IsDate()
    openingDate: Date;

    @IsMongoId()
    @Type(() => String)
    IBAN: string;
}