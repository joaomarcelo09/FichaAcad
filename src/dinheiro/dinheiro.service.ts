import { Injectable } from '@nestjs/common';
import { CreateDinheiroDto } from './dto/create-dinheiro.dto';
import { UpdateDinheiroDto } from './dto/update-dinheiro.dto';

@Injectable()
export class DinheiroService {
  create(createDinheiroDto: CreateDinheiroDto) {
    return 'This action adds a new dinheiro';
  }

  findAll() {
    return `This action returns all dinheiro`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dinheiro`;
  }

  update(id: number, updateDinheiroDto: UpdateDinheiroDto) {
    return `This action updates a #${id} dinheiro`;
  }

  remove(id: number) {
    return `This action removes a #${id} dinheiro`;
  }
}
