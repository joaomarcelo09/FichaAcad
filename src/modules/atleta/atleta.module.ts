import { Module } from '@nestjs/common';
import { AtletaService } from './atleta.service';
import { AtletaController } from './atleta.controller';
import { EmailService } from 'src/services/email/email.service';
import { PessoaService } from 'src/services/pessoa/pessoa.service';
import { TelefoneService } from 'src/services/telefone/telefone.service';
import { PrismaModule } from 'src/database/prisma.module';
import { FichaServiceA as FichaService } from 'src/services/ficha/ficha.service';

@Module({
  imports: [PrismaModule],
  controllers: [AtletaController],
  providers: [AtletaService, PessoaService, TelefoneService, EmailService, FichaService]
})
export class AtletaModule {}
