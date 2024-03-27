import { PartialType } from '@nestjs/mapped-types';
import { CreateAtletaDto } from './create-atleta.dto';
import { IsNumber, IsObject, IsOptional } from 'class-validator';
import { PessoaDto } from 'src/services/pessoa/dto/pessoa-dto';

export class UpdateAtletaDto extends PartialType(CreateAtletaDto) {

    @IsOptional()
    @IsNumber()
    id_ficha: number;

}
