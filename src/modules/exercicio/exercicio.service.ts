import { Injectable } from '@nestjs/common';
import { CreateExercicioDto } from './dto/create-exercicio.dto';
import { UpdateExercicioDto } from './dto/update-exercicio.dto';
import { PrismaService } from 'src/database/prisma.service';
import { formatOptFindAll } from 'src/helpers';
import { IPagination } from 'src/types';

@Injectable()
export class ExercicioService {
  constructor(private readonly prisma: PrismaService) { }

  create(createExercicioDto: CreateExercicioDto) {
    return 'This action adds a new exercicio';
  }

  async findAll({ page, limit, where, orderBy, select, include }: IPagination) {
    const options: any = formatOptFindAll({
      page,
      limit,
      where,
      orderBy,
      select,
      include,
    });

    const [exercises, count] = await Promise.all([
      this.prisma.exercicio.findMany(options),
      this.prisma.exercicio.count({
        where: options.where || {},
      }),
    ]);
    return {
      message: 'Solicitação de listagem feita com sucesso!',
      rows: exercises,
      count,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} exercicio`;
  }

  update(id: number, updateExercicioDto: UpdateExercicioDto) {
    return `This action updates a #${id} exercicio`;
  }

  remove(id: number) {
    return `This action removes a #${id} exercicio`;
  }
}
