import { Module } from '@nestjs/common';
import { AtletaModule } from './modules/atleta/atleta.module';
import { PessoaModule } from './modules/pessoa/pessoa.module';
import { ExercicioModule } from './modules/exercicio/exercicio.module';
import { IntensidadeModule } from './modules/intensidade/intensidade.module';

@Module({
  imports: [AtletaModule, PessoaModule, ExercicioModule, IntensidadeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
