
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class PessoaDto {

   @IsString()
   nome: string

   @IsNumber()
   id_telefone: number

   @IsEmail()
   id_email: number
}
