import { Module } from '@nestjs/common';
import { DinheiroService } from './dinheiro.service';
import { DinheiroController } from './dinheiro.controller';

@Module({
  controllers: [DinheiroController],
  providers: [DinheiroService]
})
export class DinheiroModule {}
