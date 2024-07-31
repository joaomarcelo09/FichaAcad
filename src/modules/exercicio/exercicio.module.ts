import { Module } from '@nestjs/common';
import { ExercicioService } from './exercicio.service';
import { ExercicioController } from './exercicio.controller';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ExercicioController],
  providers: [ExercicioService]
})
export class ExercicioModule { }
