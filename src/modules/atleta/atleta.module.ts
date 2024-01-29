import { Module } from '@nestjs/common';
import { AtletaService } from './atleta.service';
import { AtletaController } from './atleta.controller';
import { EmailService } from 'src/services/email/email.service';
import { PessoaService } from 'src/services/pessoa/pessoa.service';
import { TelefoneService } from 'src/services/telefone/telefone.service';
import { PrismaService } from 'src/database/prisma.service';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AtletaController],
  providers: [AtletaService, PessoaService, TelefoneService, EmailService]
})
export class AtletaModule {}
