import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AtletaService } from './atleta.service';
import { CreateAtletaDto } from './dto/create-atleta.dto';
import { UpdateAtletaDto } from './dto/update-atleta.dto';

@Controller('atleta')
export class AtletaController {
  constructor(private readonly atletaService: AtletaService) {}

  @Post()
  create(@Body() createAtletaDto: CreateAtletaDto) {
    return this.atletaService.create(createAtletaDto);
  }

  @Get()
  findAll() {
    return this.atletaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.atletaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAtletaDto: UpdateAtletaDto) {
    return this.atletaService.update(+id, updateAtletaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.atletaService.remove(+id);
  }
}
