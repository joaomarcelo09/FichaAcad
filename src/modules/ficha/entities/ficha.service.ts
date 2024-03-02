import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';


@Injectable()
export class FichaService {
  constructor(

    private readonly prisma: PrismaService,
  ) { }

  async create(body: {
    nome: string
    altura_minima: number
    altura_maxima: number
    peso_minimo: number,
    peso_maximo: number,
    biotipo: string
  }) {

    const { ficha } = await this.prisma.$transaction(async (tx) => {

      const ficha = await tx.ficha.create({
        data: {
          nome: body.nome,
          altura_minima: body.altura_minima,
          altura_maxima: body.altura_maxima,
          peso_minimo: body.peso_minimo,
          peso_maximo: body.peso_maximo,
          biotipo: body.biotipo
        }
      })

      return ficha

    }, {
      timeout: 20000
    })

    return ficha;
  }

  findAll() {
    return `This action returns all atleta`;
  }

  async findOne({where, include}: findOneTypes) {

    const atleta = await this.prisma.atleta.findFirst({
      where,
      include
    })
    return atleta;
  }

  remove(id: number) {
    return `This action removes a #${id} atleta`;
  }

  update(id: number) {
    return `This action removes a #${id} atleta`;
  }
}
