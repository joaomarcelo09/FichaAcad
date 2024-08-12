import { PartialType } from '@nestjs/mapped-types';
import { CreateAtletaDto } from './create-atleta.dto';
import { IsNumber, IsObject, IsOptional } from 'class-validator';
import { PessoaDto } from 'src/services/pessoa/dto/pessoa-dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAtletaDto extends PartialType(CreateAtletaDto) {

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    id_ficha: number;

}
