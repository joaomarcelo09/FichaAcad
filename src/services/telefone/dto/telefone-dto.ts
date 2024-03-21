
import { IsObject, IsString } from 'class-validator';

export class TelefoneDto {

   @IsString()
   nome: string

   @IsObject()
   telefone: {
     tipo: 'TEL' | 'CEL',
     numero: number
   }
 
}
