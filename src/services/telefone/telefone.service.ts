import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TelefoneService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data) {
    const telefone = await this.prisma.telefone.create({
      data: {
        numero: data.numero,
        tipo: data.tipo,
      },
    });

    return telefone;
  }
}
