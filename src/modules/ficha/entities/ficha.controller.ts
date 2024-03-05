import { Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { FichaService } from './ficha.service';
import { CreateFichaDto } from '../dto/create-ficha';
import { UpdateFichaDto } from '../dto/update-ficha';
import { formatFindAllQuery, paginationHelper } from 'src/helpers';

@Controller('ficha')
export class FichaController {
  constructor(private readonly fichaService: FichaService) {}

  @Post()
  create(@Body() createFichaDto: CreateFichaDto) {
    return this.fichaService.create(createFichaDto);
  }

  @Get()
  async findAll(
    @Query() query,
  ) {
    const opt = formatFindAllQuery(query)
    const data = await this.fichaService.findAll(opt);
    if (opt.page && opt.limit) {
      const pagination = await paginationHelper(query.page, query.limit, data.count);
      return { data, pagination };
    }
    return data
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const opt: any = {}

    opt.where = {
      id: +id,
    }

    opt.include = {
      ficha_exercicio: true,
      ficha_atleta: true
    }
    return this.fichaService.findOne(opt);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFichaDto: UpdateFichaDto) {
    return this.fichaService.update(+id, updateFichaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fichaService.remove(+id);
  }
}


