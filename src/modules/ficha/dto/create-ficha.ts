import { IsString, IsNumber } from "class-validator";

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
  peso_maxima: number

  @IsString()
  biotipo: string
}
