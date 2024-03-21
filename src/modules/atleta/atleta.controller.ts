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
import { FichaService } from 'src/modules/ficha/ficha.service';
import { FichaType } from 'src/types';

@Controller('atleta')
export class AtletaController {
  constructor(
    private readonly atletaService: AtletaService,
    private readonly fichaService: FichaService,
  ) {}

  @Post()
  async create(@Body() body: CreateAtletaDto) {
    const opt = {
      include: {},
      where: {
        altura_minima: {
          lte: body.altura,
        },
        altura_maxima: {
          gte: body.altura,
        },
        peso_minimo: {
          lte: body.peso,
        },
        peso_maximo: {
          gte: body.peso,
        },
      },
    };

    let ficha: null | FichaType = null;
    ficha = await this.fichaService.findOne(opt);
    const atleta = await this.atletaService.create(body, ficha);
    if (!atleta)
      throw new HttpException(
        'Algo deu errado no resgistro do atleta',
        HttpStatus.BAD_REQUEST,
      );
    return { atleta };
  }

  @Get()
  findAll() {
    return this.atletaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const opt: any = {};

    opt.where = {
      id: +id,
    };

    return this.atletaService.findOne(opt);
  }

  @Patch('reavalicao/:id')
  async reavaliacao(
    @Param('id') id: string,
    @Body() updateAtletaDto: UpdateAtletaDto,
  ) {
    
    return 'oi';
  }
  @Patch('byId/:id')
  async update(@Param('id') id: string, @Body() updateAtletaDto: UpdateAtletaDto) {
    const idFicha = updateAtletaDto.id_ficha;
    const pessoa = {
      nome: updateAtletaDto.nome,
      email: updateAtletaDto.email,
      telefone: updateAtletaDto.telefone,
    };

    delete updateAtletaDto.id_ficha;
    delete updateAtletaDto.nome
    delete updateAtletaDto.email
    delete updateAtletaDto.telefone
    delete updateAtletaDto.pessoa

    const body = {
      atleta: updateAtletaDto,
      idFicha,
      pessoa
    };
    return await this.atletaService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.atletaService.remove(+id);
  }
}
