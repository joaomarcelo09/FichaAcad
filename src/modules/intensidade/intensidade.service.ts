import { Injectable } from '@nestjs/common';
import { CreateIntensidadeDto } from './dto/create-intensidade.dto';
import { UpdateIntensidadeDto } from './dto/update-intensidade.dto';
import { PrismaService } from 'src/database/prisma.service';
import { formatOptFindAll } from 'src/helpers';
import { IPagination } from 'src/types';

@Injectable()
export class IntensidadeService {
  constructor(private readonly prisma: PrismaService) { }

  create(createIntensidadeDto: CreateIntensidadeDto) {
    return 'This action adds a new intensidade';
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

    const [intensity, count] = await Promise.all([
      this.prisma.intensidade.findMany(options),
      this.prisma.intensidade.count({
        where: options.where || {},
      }),
    ]);
    return {
      message: 'Solicitação de listagem feita com sucesso!',
      rows: intensity,
      count,
    };
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
