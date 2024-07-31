import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IntensidadeService } from './intensidade.service';
import { CreateIntensidadeDto } from './dto/create-intensidade.dto';
import { UpdateIntensidadeDto } from './dto/update-intensidade.dto';

@Controller('intensidade')
export class IntensidadeController {
  constructor(private readonly intensidadeService: IntensidadeService) { }

  @Post()
  create(@Body() createIntensidadeDto: CreateIntensidadeDto) {
    return this.intensidadeService.create(createIntensidadeDto);
  }

  // @Get()
  // findAll() {
  //   return this.intensidadeService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.intensidadeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIntensidadeDto: UpdateIntensidadeDto) {
    return this.intensidadeService.update(+id, updateIntensidadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.intensidadeService.remove(+id);
  }
}
