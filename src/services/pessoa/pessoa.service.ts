import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PessoaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data, tx: any, relation: any) {
    const prisma = tx ?? this.prisma
    const email = await prisma.pessoa.create({
      data: {
        id_email: relation.id_email,
        id_telefone: relation.id_telefone,
        nome: data.nome,
      },
    });

    return email;
  }
}
