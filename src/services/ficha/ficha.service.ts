import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class FichaServiceA {
  constructor(private readonly prisma: PrismaService) {}

//   async create(data, atleta) {

//     const createFicha = await this.prisma.ficha.create({
//         data: {
//         nome: `ficha de ${atleta.pessoa.nome}`
//         }
//     })

//     data.exercicio.map(async (x) => {
//         return await this.prisma.ficha_exercicio.create({
//             data: {
//                 id_intensidade: data.intensidade,
//                 id_exercicio: x,
//                 id_ficha: createFicha.id
//             }
//         })
//     }) 

//     await this.prisma.ficha_atleta.create({
//         data: {
//             id_atleta: atleta.id,
//             id_ficha: createFicha.id
//         }
//     })

//     const exercicios = await this.prisma.exercicio.findMany({
//         where: {
//             id: {in: data.exercicio}
//         },
//     })

//     const intensidade = await this.prisma.intensidade.findMany({
//         where: {
//             id: data.intensidade
//         },
//     })

//     return {nome: createFicha.nome, exercicios, intensidade};
//   }

  async remove(id: number) {

    const fichaDel = await this.prisma.ficha_atleta.findFirst({
        where: {
            id_ficha: id
        }
    })

    await this.prisma.ficha_atleta.delete({
        where: {
            id: fichaDel.id
        }
    })

    await this.prisma.ficha_exercicio.deleteMany({
        where: {
            id_ficha: id
        }
    })

    await this.prisma.ficha.delete({
        where: {
            id: id
        }
    })

    return 
  }

}
