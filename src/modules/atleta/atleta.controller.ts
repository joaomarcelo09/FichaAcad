import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AtletaService } from './atleta.service';
import { CreateAtletaDto } from './dto/create-atleta.dto';
import { UpdateAtletaDto } from './dto/update-atleta.dto';
import { TelefoneService } from 'src/services/telefone/telefone.service';
import { EmailService } from 'src/services/email/email.service';
import { PessoaService } from 'src/services/pessoa/pessoa.service';

@Controller('atleta')
export class AtletaController {
  constructor(
    private readonly atletaService: AtletaService,
    private readonly telefone: TelefoneService,
    private readonly email: EmailService,
    private readonly pessoa: PessoaService,
  ) { }

  @Post()
  async create(@Body() body: CreateAtletaDto) {

    const email = await this.email.create(body.email)
    const telefone = await this.telefone.create(body)

    const pessoa = await this.pessoa.create(body)

    const atleta = await this.atletaService.create(body)

    return atleta;
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
