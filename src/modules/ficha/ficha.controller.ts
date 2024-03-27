import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FichaService } from './ficha.service';
import { CreateFichaDto } from './dto/create-ficha';
import { UpdateFichaDto } from './dto/update-ficha';
import { formatFindAllQuery, paginationHelper } from 'src/helpers';
import { Exercicios } from 'src/types';

@Controller('ficha')
export class FichaController {
  constructor(private readonly fichaService: FichaService) {}

  @Post()
  async create(@Body() createFichaDto: CreateFichaDto) {
    return await this.fichaService.create(createFichaDto);
  }

  @Get()
  async findAll(@Query() query) {
    const opt = formatFindAllQuery(query);
    const data = await this.fichaService.findAll(opt);
    if (opt.page && opt.limit) {
      const pagination = await paginationHelper(
        query.page,
        query.limit,
        data.count,
      );
      return { data, pagination };
    }
    return data;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const opt: any = {};

    opt.where = {
      id: +id,
    };

    opt.include = {
      ficha_exercicio: true,
      ficha_atleta: true,
    };
    return this.fichaService.findOne(opt);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFichaDto: UpdateFichaDto,
  ) {
    const opt: any = {};
    opt.where = {
      id: +id,
    };
    opt.include = {
      ficha_exercicio: true,
      ficha_atleta: true,
    };

    const { ficha_atleta, ficha_exercicio }: any =
      await this.fichaService.findOne(opt);

    if (updateFichaDto.exercicios) {
      const exerciciosToBeCreated = updateFichaDto.exercicios;
      delete updateFichaDto.exercicios;

      const exerciciosToAdd: Exercicios[] = exerciciosToBeCreated.filter(
        (exercicio) =>
          !ficha_exercicio.some(
            (existingExercicio) =>
              existingExercicio.id_exercicio === exercicio.id_exercicio &&
              existingExercicio.id_intensidade === exercicio.id_intensidade,
          ),
      );

      const exerciciosToDelete: Exercicios[] = ficha_exercicio.filter(
        (existingExercicio) =>
          !exerciciosToBeCreated.some(
            (newExercicio) =>
              newExercicio.id_exercicio === existingExercicio.id_exercicio &&
              newExercicio.id_intensidade === existingExercicio.id_intensidade,
          ),
      );

      const idsToDelete: number[] = exerciciosToDelete.map(
        (exercicio) => exercicio.id,
      );
      var exercicios = {
        exerciciosToAdd,
        idsToDelete,
      };
    }

    return await this.fichaService.update(
      +id,
      ficha_atleta,
      updateFichaDto,
      exercicios,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.fichaService.remove(+id);
  }
}
