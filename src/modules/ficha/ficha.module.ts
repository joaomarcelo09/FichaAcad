import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { FichaService } from './ficha.service';
import { FichaController } from './ficha.controller';
import { ExercicioService } from '../exercicio/exercicio.service';
import { IntensidadeService } from '../intensidade/intensidade.service';

@Module({
  imports: [PrismaModule],
  controllers: [FichaController],
  providers: [FichaService, ExercicioService, IntensidadeService]
})
export class FichaModule { }
