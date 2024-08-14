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
  Query,
} from '@nestjs/common';
import { AtletaService } from './atleta.service';
import { CreateAtletaDto } from './dto/create-atleta.dto';
import { UpdateAtletaDto } from './dto/update-atleta.dto';
import { FichaService } from 'src/modules/ficha/ficha.service';
import { FichaType } from 'src/types';
import { PrismaService } from 'src/database/prisma.service';
import { optFindFicha, formatFindAllQuery, paginationHelper } from 'src/helpers';


@Controller('atleta')
export class AtletaController {
  constructor(
    private readonly atletaService: AtletaService,
    private readonly fichaService: FichaService,
    private readonly prisma: PrismaService,
  ) { }

  @Post()
  async create(@Body() body: CreateAtletaDto) {

    const where = optFindFicha(body.altura, body.peso)
    const opt = {
      include: {},
      where: where
    };

    const ficha = await this.fichaService.findOne(opt);
    const atleta = await this.atletaService.create(body, ficha);
    if (!atleta)
      throw new HttpException(
        'Algo deu errado no resgistro do atleta',
        HttpStatus.BAD_REQUEST,
      );
    return { atleta };
  }

  @Get()
  async findAll(
    @Query() query,
  ) {
    const opt = formatFindAllQuery(query)
    const data = await this.atletaService.findAll(opt);

    if (opt.page && opt.limit) {
      const pagination = await paginationHelper(query.page, query.limit, data.count);
      return { data, pagination };
    }

    return data
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const opt: any = {};
    opt.where = {
      id: +id,
    };

    opt.include = {
      pessoa: {
        include: {
          email: true,
          telefone: true
        }
      }
    }

    return this.atletaService.findOne(opt);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAtletaDto: UpdateAtletaDto) {

    const existingRelations: any = await this.atletaService.findOne({
      where: {
        id: +id
      },
      include: {
        ficha_atleta: true,
        pessoa: true
      }
    })

    const updateEmail = {
      email: updateAtletaDto.email,
      id: existingRelations.pessoa.id_email
    }
    const updateTelefone = {
      tipo: updateAtletaDto.telefone.tipo,
      numero: updateAtletaDto.telefone.numero,
      id: existingRelations.pessoa.id_telefone
    }

    const { id: oldFichaAtletaId } = await this.prisma.ficha_atleta.findFirst({
      where: {
        id_atleta: +id
      }
    })
    const body = {
      pessoa: {
        updateTelefone,
        updateEmail,
        data: {
          nome: updateAtletaDto.nome,
          id: existingRelations.pessoa.id
        }
      },
      ficha: {
        oldFichaAtletaId: oldFichaAtletaId,
        newFichaAtletaId: updateAtletaDto.id_ficha
      },
      atleta: updateAtletaDto
    }

    delete updateAtletaDto.id_ficha
    delete updateAtletaDto.nome
    delete updateAtletaDto.email
    delete updateAtletaDto.telefone

    return await this.atletaService.update(+id, body)
  }

  @Patch('reavaliacao/:id')
  async reavaliacao(
    @Param('id') id: string,
    @Body() updateAtletaDto: UpdateAtletaDto,
  ) {
    const where = optFindFicha(updateAtletaDto.altura, updateAtletaDto.peso)
    const opt = {
      include: {},
      where: where
    };

    const atleta: any = await this.atletaService.findOne({
      where: {
        id: +id
      },
      select: {
        ficha_atleta: true
      }
    })

    if (!atleta) {
      throw new HttpException(
        'Não foi possível encontrar esse atleta',
        HttpStatus.BAD_REQUEST,
      );
    }

    const fichaAtletaId = atleta.ficha_atleta[0].id
    const oldFicha = atleta.ficha_atleta[0]
    const newFicha = await this.fichaService.findOne(opt);

    if (!newFicha.id) {
      throw new HttpException(
        'Não foi encontrada nenhuma ficha para esse caso',
        HttpStatus.NOT_FOUND,
      );
    }

    if (newFicha.id !== oldFicha.id_ficha) {
      var newFichaUpdated = await this.atletaService.reavaliacao(fichaAtletaId, newFicha.id)
    }

    return {
      msg: newFichaUpdated ? 'Ficha atualizada com sucesso' : 'Mesma ficha encontrada',
      ficha_antiga: atleta.ficha_atleta[0],
      nova_ficha: newFichaUpdated ? newFichaUpdated : oldFicha
    }


  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.atletaService.remove(+id);
  }
}
