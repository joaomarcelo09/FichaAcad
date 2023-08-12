import { Module } from '@nestjs/common';
import { IntensidadeService } from './intensidade.service';
import { IntensidadeController } from './intensidade.controller';

@Module({
  controllers: [IntensidadeController],
  providers: [IntensidadeService]
})
export class IntensidadeModule {}
