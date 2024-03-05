import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { IPagination } from 'src/types';
import { formatOptFindAll } from 'src/helpers'

@Injectable()
export class FichaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: {
    nome: string;
    altura_minima: number;
    altura_maxima: number;
    peso_minimo: number;
    peso_maximo: number;
    biotipo: string;
    exercicios: {
      id_exercicio: number;
      id_intensidade: number;
    }[];
  }) {
    const ficha = await this.prisma.$transaction(
      async (tx) => {
        const ficha = await tx.ficha.create({
          data: {
            nome: body.nome,
            altura_minima: body.altura_minima,
            altura_maxima: body.altura_maxima,
            peso_minimo: body.peso_minimo,
            peso_maximo: body.peso_maximo,
            biotipo: body.biotipo,
          },
        });
        const fichaExercicios = await tx.ficha_exercicio.createMany({
          data: body.exercicios.map((exercicio) => ({
            id_exercicio: exercicio.id_exercicio,
            id_intensidade: exercicio.id_intensidade,
            id_ficha: ficha.id,
          })),
        });

        return { ficha, fichaExercicios };
      },
      {
        timeout: 20000,
      },
    );
    return { message: 'Ficha criada com sucesso!', ficha };
  }

  async findAll(
   {page,
    limit,
    where,
    orderBy,
    select,
    include}:IPagination
  ) {
    const options: any = formatOptFindAll({
      page,
      limit,
      where,
      orderBy,
      select,
      include,
    });

    const [ficha, count] = await Promise.all([
      this.prisma.ficha.findMany(options),
      this.prisma.ficha.count({
        where: options.where || {},
      }),
    ]);
    return {message: 'Solicitação de listagem feita com sucesso!', rows: ficha, count };
  }

  async findOne({ where, include }) {
    const ficha = await this.prisma.ficha.findFirst({
      where: where,
      include: include,
    });

    return ficha;
  }

  async remove(id: number) {
    await this.prisma.$transaction(async (tx) => {
      await tx.ficha_atleta.deleteMany({
        where: {
          id_ficha: id,
        },
      });

      await tx.ficha_exercicio.deleteMany({
        where: {
          id_ficha: id,
        },
      });

      await tx.ficha.delete({
        where: {
          id: id,
        },
      });
    });
    return 'Ficha excluída com sucesso';
  }

  async update(
    id: number,
    body: {
      nome: string;
      altura_minima: number;
      altura_maxima: number;
      peso_minimo: number;
      peso_maximo: number;
      biotipo: string;
      exercicios: {
        id_exercicio: number;
        id_intensidade: number;
      }[];
    },
  ) {
    const ficha = await this.prisma.$transaction(async (tx) => {
      // const fichaUpdated = await this.prisma.ficha.update()
      // return fichaUpdated;
    });

    return { message: 'Ficha atualizada com sucesso!', ficha };
  }
}
