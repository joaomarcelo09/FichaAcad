import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/services/email/email.service';
import { PessoaService } from 'src/services/pessoa/pessoa.service';
import { TelefoneService } from 'src/services/telefone/telefone.service';
import { PrismaService } from 'src/database/prisma.service';
import { findOneTypes, FichaType, AtletaType } from 'src/types';
import { UpdateAtletaDto } from './dto/update-atleta.dto';
import { PessoaDto } from 'src/services/pessoa/dto/pessoa-dto';

@Injectable()
export class AtletaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly telefone: TelefoneService,
    private readonly email: EmailService,
    private readonly pessoa: PessoaService,
  ) {}

  async create(body: AtletaType, ficha: FichaType) {
    const atleta = await this.prisma.$transaction(
      async (tx) => {
        const email = await this.email.create(body.email, tx);
        const telefone = await this.telefone.create(body.telefone, tx);

        const relationPeople = {
          id_email: email.id,
          id_telefone: telefone.id,
        };

        const pessoa = await this.pessoa.create(body.nome, tx, relationPeople);

        const atleta = await tx.atleta.create({
          data: {
            id_pessoa: pessoa.id,
            peso: body.peso,
            altura: body.altura,
            status: body.status,
            biotipo: body.biotipo,
          },
        });

        if (ficha) {
          const fichaRel = await tx.ficha_atleta.create({
            data: {
              id_atleta: atleta.id,
              id_ficha: ficha.id,
            },
          });
          return { email, telefone, pessoa, atleta, fichaRel, ficha };
        }
        return { email, telefone, pessoa, atleta };
      },
      {
        timeout: 20000,
      },
    );
    return atleta;
  }

  findAll() {
    return `This action returns all atleta`;
  }

  async findOne(opt: findOneTypes) {
    const atleta = await this.prisma.atleta.findFirst({
      where: opt.where,
      select: opt.select,
    });
    return atleta;
  }

  remove(id: number) {
    return `This action removes a #${id} atleta`;
  }

  async update(
    id: number,
    body: {
      pessoa: {
        updateEmail: {
          email: string;
          id: number;
        };
        updateTelefone: {
          tipo: string;
          numero: string;
          id: number;
        };
        data: {
          nome: string;
          id: number;
        };
      };
      ficha: {
        oldFichaAtletaId: number
        newFichaAtletaId: number
      }
      atleta: any
    },
  ) {
    const atletaUpdated = await this.prisma.$transaction(async (tx) => {
      const updatedEmail: any = this.email.update(body.pessoa.updateEmail, tx);
      const updatedTelefone: any = this.telefone.update(
        body.pessoa.updateTelefone,
        tx,
      );

      const pessoa = await this.pessoa.update(body.pessoa.data, tx, {
        id_email: updatedEmail.id,
        id_telefone: updatedTelefone.id,
      })

      const newFichaAtleta = await this.prisma.ficha_atleta.update({
        where: {
          id: body.ficha.oldFichaAtletaId,
        },
        data: {
          id_ficha: body.ficha.newFichaAtletaId,
        },
      });

      const atleta = await this.prisma.atleta.update({
        where: {
          id: id
        },
        data: body.atleta
      })

      return {atleta, newFichaAtleta, pessoa}
    });

    return atletaUpdated;
  }
  async reavaliacao(oldFichaId: number, newFichaId: number) {
    return await this.prisma.ficha_atleta.update({
      where: {
        id: oldFichaId
      },
      data: {
        id_ficha: newFichaId
      }
    })
  }
}
