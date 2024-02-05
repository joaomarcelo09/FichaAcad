import { IsBoolean, IsEmail, IsEnum, IsObject, IsString } from "class-validator";
import { biotipoEnum } from "src/enums/biotipo/biotipo";

export class CreateAtletaDto {

  @IsString()
  nome: string;

  @IsString()
  @IsEmail()
  email: string

  @IsObject()
  telefone: object

  @IsString()
  peso: string

  @IsString()
  altura: string

  @IsEnum(biotipoEnum)
  biotipo: string

  @IsBoolean()
  status: boolean
}
