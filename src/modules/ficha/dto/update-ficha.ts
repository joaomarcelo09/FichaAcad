import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsArray } from "class-validator";
export class UpdateFichaDto {

  @ApiProperty()
  @IsString()
  nome: string

  @ApiProperty()
  @IsNumber()
  altura_minima: number

  @ApiProperty()
  @IsNumber()
  altura_maxima: number

  @ApiProperty()
  @IsNumber()
  peso_minimo: number

  @ApiProperty()
  @IsNumber()
  peso_maximo: number

  @ApiProperty()
  @IsString()
  biotipo: 'endomorfo' | 'mesomorfo' | 'ectomorfo'

  @ApiProperty()
  @IsArray()
  exercicios: {
    id_exercicio: number
    id_intensidade: number
  }[]
}
