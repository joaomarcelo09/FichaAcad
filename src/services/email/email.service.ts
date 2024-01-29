import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class EmailService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data, tx: any) {
    const prisma = tx ?? this.prisma
    const email = await prisma.email.create({
      data: {
        email: data,
      },
    });

    return email;
  }
}
