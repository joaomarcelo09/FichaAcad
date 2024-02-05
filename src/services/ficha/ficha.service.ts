import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class FichaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data, atleta) {

    const createFicha = await this.prisma.ficha.create({
        data: {
        nome: `ficha de ${atleta.pessoa.nome}`
        }
    })

    data.exercicio.map(async (x) => {
        return await this.prisma.ficha_exercicio.create({
            data: {
                id_intensidade: data.intensidade,
                id_exercicio: x,
                id_ficha: createFicha.id
            }
        })
    }) 

    await this.prisma.ficha_atleta.create({
        data: {
            id_atleta: atleta.id,
            id_ficha: createFicha.id
        }
    })

    const exercicios = await this.prisma.exercicio.findMany({
        where: {
            id: {in: data.exercicio}
        },
    })

    const intensidade = await this.prisma.intensidade.findMany({
        where: {
            id: data.intensidade
        },
    })

    return {nome: createFicha.nome, exercicios, intensidade};
  }
}
