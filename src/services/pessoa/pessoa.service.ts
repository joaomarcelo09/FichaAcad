import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PessoaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data) {
    const email = await this.prisma.pessoa.create({
      data: {
        nome: data.nome,
      },
    });

    return email;
  }
}
