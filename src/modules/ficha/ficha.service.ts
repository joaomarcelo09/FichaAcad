import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { IPagination, Exercicios } from 'src/types';
import { formatOptFindAll } from 'src/helpers';

@Injectable()
export class FichaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: {
    nome: string;
    altura_minima: number;
    altura_maxima: number;
    peso_minimo: number;
    peso_maximo: number;
    biotipo: 'endomorfo' | 'mesomorfo' | 'ectomorfo';
    exercicios: Exercicios[];
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
        await tx.ficha_exercicio.createMany({
          data: body.exercicios.map((exercicio) => ({
            id_exercicio: exercicio.id_exercicio,
            id_intensidade: exercicio.id_intensidade,
            id_ficha: ficha.id,
          })),
        });

        const fichaExercicios = await tx.ficha_exercicio.findMany({
          where: {
            id_ficha: ficha.id,
          },
        });

        return { ficha, fichaExercicios };
      },
      {
        timeout: 20000,
      },
    );
    return { message: 'Ficha criada com sucesso!', ficha };
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

    const [ficha, count] = await Promise.all([
      this.prisma.ficha.findMany(options),
      this.prisma.ficha.count({
        where: options.where || {},
      }),
    ]);
    return {
      message: 'Solicitação de listagem feita com sucesso!',
      rows: ficha,
      count,
    };
  }

  async findOne({ where, include }) {
    const ficha = await this.prisma.ficha.findFirst({
      where: where,
      include: include,
    });

    return ficha;
  }

  async remove(id: number) {
    let msg: string;

    await this.prisma.$transaction(async (tx) => {
      const ficha = await this.prisma.ficha.findFirst({
        where: {
          id: id,
        },
      });

      if (ficha) {
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
        msg = `Ficha de id ${id} excluída com sucesso, `;
      }
      msg = `Ficha de id ${id} não encontrada`;
    });
    return { message: msg };
  }

  async update(
    id: number,
    ficha_atleta: {}[],
    fichaUpdateBody: {
      nome: string;
      altura_minima: number;
      altura_maxima: number;
      peso_minimo: number;
      peso_maximo: number;
      biotipo: 'endomorfo' | 'mesomorfo' | 'ectomorfo';
    },
    exercicios: {
      exerciciosToAdd: Exercicios[],
      idsToDelete: number[]
    },
  ) {
    await this.prisma.$transaction(async (tx) => {
      // can edit your own ficha
      if (!ficha_atleta) {
        await tx.ficha.update({
          where: {
            id: id,
          },
          data: fichaUpdateBody,
        });
      }

      // can edit only the relations
      await tx.ficha_exercicio.deleteMany({
        where: {
          id: {
            in: exercicios.idsToDelete
          }
        }
      })

      await tx.ficha_exercicio.createMany({
        data: exercicios.exerciciosToAdd.map((exercicio) => ({
          id_exercicio: exercicio.id_exercicio,
          id_intensidade: exercicio.id_intensidade,
          id_ficha: id,
        })),
      })

    });

    const fichaUpdated = await this.prisma.ficha.findFirst({
      where: {
        id: id,
      },
      include: {
        ficha_exercicio: true,
        ficha_atleta: true,
      },
    });

    return { message: 'Ficha atualizada com sucesso!', fichaUpdated };
  }
}
