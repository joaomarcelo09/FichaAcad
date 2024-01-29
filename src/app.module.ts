import { Module } from '@nestjs/common';
import { AtletaModule } from './modules/atleta/atleta.module';
import { ExercicioModule } from './modules/exercicio/exercicio.module';
import { IntensidadeModule } from './modules/intensidade/intensidade.module';
import { PessoaService } from './services/pessoa/pessoa.service';
import { TelefoneService } from './services/telefone/telefone.service';
import { EmailService } from './services/email/email.service';

@Module({
  imports: [AtletaModule, ExercicioModule, IntensidadeModule],
  controllers: [],
  providers: [PessoaService, TelefoneService, EmailService],
})
export class AppModule {}
