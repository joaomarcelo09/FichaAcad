import { Module } from '@nestjs/common';
import { IntensidadeService } from './intensidade.service';
import { IntensidadeController } from './intensidade.controller';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [IntensidadeController],
  providers: [IntensidadeService]
})
export class IntensidadeModule { }
