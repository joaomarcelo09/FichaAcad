import { PartialType } from '@nestjs/mapped-types';
import { CreateAtletaDto } from './create-atleta.dto';
import { IsNumber } from 'class-validator';
import { PessoaDto } from 'src/services/pessoa/dto/pessoa-dto';

export class UpdateAtletaDto extends PartialType(CreateAtletaDto) {

    @IsNumber()
    id_ficha: number;

    pessoa: PessoaDto
}
