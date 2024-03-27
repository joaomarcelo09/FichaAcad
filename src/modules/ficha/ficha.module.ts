import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { FichaService } from './ficha.service';
import { FichaController } from './ficha.controller';

@Module({
  imports: [PrismaModule],
  controllers: [FichaController],
  providers: [FichaService]
})
export class FichaModule {}
