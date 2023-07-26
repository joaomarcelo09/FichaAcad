import { PartialType } from '@nestjs/mapped-types';
import { CreateDinheiroDto } from './create-dinheiro.dto';

export class UpdateDinheiroDto extends PartialType(CreateDinheiroDto) {}
