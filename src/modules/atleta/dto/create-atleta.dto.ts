import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsEnum, IsNumber, IsObject, IsString } from "class-validator";
import { biotipoEnum } from "src/enums/biotipo/biotipo";

export class CreateAtletaDto {

  @ApiProperty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsObject()
  telefone: {
    tipo: 'TEL' | 'CEL',
    numero: string
  }

  @ApiProperty()
  @IsNumber()
  peso: number

  @ApiProperty()
  @IsNumber()
  altura: number

  @ApiProperty()
  @IsEnum(biotipoEnum)
  biotipo: 'endomorfo' | 'mesomorfo' | 'ectomorfo'

  @ApiProperty()
  @IsBoolean()
  status: boolean
}
