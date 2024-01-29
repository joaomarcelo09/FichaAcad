import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class EmailService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data) {
    const email = await this.prisma.email.create({
      data: {
        email: data,
      },
    });

    return email;
  }
}
