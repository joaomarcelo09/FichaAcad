import { IsBoolean, IsEmail, IsEnum, IsNumber, IsObject, IsString } from "class-validator";
import { biotipoEnum } from "src/enums/biotipo/biotipo";

export class CreateAtletaDto {

  @IsString()
  nome: string;

  @IsString()
  @IsEmail()
  email: string

  @IsObject()
  telefone: {
    tipo: 'TEL' | 'CEL',
    numero: number
  }

  @IsNumber()
  peso: number

  @IsNumber()
  altura: number

  @IsEnum(biotipoEnum)
  biotipo: 'endomorfo' | 'mesomorfo' |'ectomorfo'

  @IsBoolean()
  status: boolean
}
