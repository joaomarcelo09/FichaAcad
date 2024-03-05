import { IsString, IsNumber, IsArray } from "class-validator";

export class CreateFichaDto {

  @IsString()
  nome: string

  @IsNumber()
  altura_minima: number

  @IsNumber()
  altura_maxima: number

  @IsNumber()
  peso_minimo: number

  @IsNumber()
  peso_maximo: number

  @IsString()
  biotipo: string

  @IsArray()
  exercicios: {
    id_exercicio: number
    id_intensidade: number
  }[]
}
