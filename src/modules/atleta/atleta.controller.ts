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

@Controller('atleta')
export class AtletaController {
  constructor(
    private readonly atletaService: AtletaService,
    private readonly fichaService: FichaService,
  ) {}

  @Post()
  async create(@Body() body: CreateAtletaDto) {
    const opt = {
      where: {
        altura_minima: {
          gte: body.altura,
        },
        altura_maxima: {
          lte: body.altura,
        },
        peso_minimo: {
          gte: body.peso,
        },
        peso_maximo: {
          lte: body.peso,
        },
      },
      include: {},
    };
    const ficha = await this.fichaService.findOne(opt);
    const atleta = await this.atletaService.create(body, ficha.id);
    if (!atleta)
      throw new HttpException(
        'Algo deu errado no resgistro do atleta',
        HttpStatus.BAD_REQUEST,
    );
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

  @Patch(':id')
  async reavaliacao(
    @Param('id') id: string,
    @Body() updateAtletaDto: UpdateAtletaDto,
  ) {
    const { peso } = updateAtletaDto;
    const opt: any = {};

    opt.where = {
      id: +id,
    };
    opt.include = {
      ficha_atleta: true,
      pessoa: true,
    };
    const atleta: any = await this.atletaService.findOne(opt);

    if (atleta.peso !== +peso) {
      await this.ficha.remove(atleta.ficha_atleta[0].id_ficha);
    }

    await this.atletaService.update(+id);

    const atletRel: any = await this.atletaService.findOne(opt);

    return atletRel;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAtletaDto: UpdateAtletaDto) {
    return this.atletaService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.atletaService.remove(+id);
  }
}
