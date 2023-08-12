import { Injectable } from '@nestjs/common';
import { CreateIntensidadeDto } from './dto/create-intensidade.dto';
import { UpdateIntensidadeDto } from './dto/update-intensidade.dto';

@Injectable()
export class IntensidadeService {
  create(createIntensidadeDto: CreateIntensidadeDto) {
    return 'This action adds a new intensidade';
  }

  findAll() {
    return `This action returns all intensidade`;
  }

  findOne(id: number) {
    return `This action returns a #${id} intensidade`;
  }

  update(id: number, updateIntensidadeDto: UpdateIntensidadeDto) {
    return `This action updates a #${id} intensidade`;
  }

  remove(id: number) {
    return `This action removes a #${id} intensidade`;
  }
}
