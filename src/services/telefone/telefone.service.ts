import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TelefoneService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data, tx: any) {
    const prisma = tx ?? this.prisma
    const telefone = await prisma.telefone.create({
      data: {
        numero: data.numero,
        tipo: data.tipo,
      },
    });
    

    return telefone;
  }
  async update(data: {
    tipo: string,
    numero: string
    id: number
  }, tx: any) {
    const prisma = tx ?? this.prisma
    const telefone = await prisma.telefone.update({
      where: {
        id: data.id
      },
      data: {
        tipo: data.tipo,
        numero: data.numero
      }
    })

    return telefone
  }
}
