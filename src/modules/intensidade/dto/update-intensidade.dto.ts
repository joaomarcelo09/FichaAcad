import { PartialType } from '@nestjs/mapped-types';
import { CreateIntensidadeDto } from './create-intensidade.dto';

export class UpdateIntensidadeDto extends PartialType(CreateIntensidadeDto) {}
