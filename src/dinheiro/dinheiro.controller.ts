import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DinheiroService } from './dinheiro.service';
import { CreateDinheiroDto } from './dto/create-dinheiro.dto';
import { UpdateDinheiroDto } from './dto/update-dinheiro.dto';

@Controller('dinheiro')
export class DinheiroController {
  constructor(private readonly dinheiroService: DinheiroService) {}

  @Post()
  create(@Body() createDinheiroDto: CreateDinheiroDto) {
    return this.dinheiroService.create(createDinheiroDto);
  }

  @Get()
  findAll() {
    return this.dinheiroService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dinheiroService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDinheiroDto: UpdateDinheiroDto,
  ) {
    return this.dinheiroService.update(+id, updateDinheiroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dinheiroService.remove(+id);
  }
}
