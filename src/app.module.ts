import { Module } from '@nestjs/common';
import { DinheiroModule } from './dinheiro/dinheiro.module';

@Module({
  imports: [DinheiroModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
