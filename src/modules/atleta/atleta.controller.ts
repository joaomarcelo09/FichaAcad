import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AtletaService } from './atleta.service';
import { CreateAtletaDto } from './dto/create-atleta.dto';
import { UpdateAtletaDto } from './dto/update-atleta.dto';
import { TelefoneService } from 'src/services/telefone/telefone.service';
import { EmailService } from 'src/services/email/email.service';
import { PessoaService } from 'src/services/pessoa/pessoa.service';
import { pegarTipo } from 'src/helpers/atleta/pegarTipo';
import { criarFicha } from 'src/helpers/atleta/criarFicha';
import { FichaService } from 'src/services/ficha/ficha.service';

@Controller('atleta')
export class AtletaController {
  constructor(
    private readonly atletaService: AtletaService,
    private readonly telefone: TelefoneService,
    private readonly email: EmailService,
    private readonly pessoa: PessoaService,
    private readonly ficha: FichaService,
  ) { }

  @Post()
  async create(@Body() body: CreateAtletaDto) {

    const atleta = await this.atletaService.create(body)
    if(!atleta) throw new HttpException('Algo deu errado no resgistro do atleta', HttpStatus.BAD_REQUEST)

    const tipo = await pegarTipo(atleta)
    const ficha = await criarFicha(tipo, atleta.biotipo)
    
    const findAtleta = await this.atletaService.findOne(+atleta.id)

    const {nome, exercicios, intensidade} = await this.ficha.create(ficha, findAtleta)

    return {atleta, ficha: {nome, exercicios, intensidade}};
  }

  @Get()
  findAll() {
    return this.atletaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.atletaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAtletaDto: UpdateAtletaDto) {
    return this.atletaService.update(+id, updateAtletaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.atletaService.remove(+id);
  }
}
