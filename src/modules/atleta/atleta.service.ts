import { Injectable } from '@nestjs/common';
import { CreateAtletaDto } from './dto/create-atleta.dto';
import { UpdateAtletaDto } from './dto/update-atleta.dto';
import { EmailService } from 'src/services/email/email.service';
import { PessoaService } from 'src/services/pessoa/pessoa.service';
import { TelefoneService } from 'src/services/telefone/telefone.service';
import { PrismaService } from 'src/database/prisma.service';
import { findOneTypes } from 'src/types/findOne';

@Injectable()
export class AtletaService {
  constructor(

    private readonly prisma: PrismaService,
    private readonly telefone: TelefoneService,
    private readonly email: EmailService,
    private readonly pessoa: PessoaService,
  ) { }

  async create(body: any) {

    const {atleta} = await this.prisma.$transaction(async (tx) => {

      const email = await this.email.create(body.email, tx)
      const telefone = await this.telefone.create(body.telefone, tx)

      const relationPeople: any = {
        id_email: email.id,
        id_telefone: telefone.id
      }

      const pessoa = await this.pessoa.create(body, tx, relationPeople)

      const atleta = await tx.atleta.create({
        data: {
          id_pessoa: pessoa.id,
          peso: body.peso,
          altura: body.altura,
          status: body.status,
          biotipo: body.biotipo
        }
      })

      
      return {email, telefone, pessoa, atleta}
    }, {
      timeout: 20000
    })

    return atleta;
  }

  findAll() {
    return `This action returns all atleta`;
  }

  async findOne({where, include}: findOneTypes) {

    const atleta = await this.prisma.atleta.findFirst({
      where,
      include
    })
    return atleta;
  }

  remove(id: number) {
    return `This action removes a #${id} atleta`;
  }

  update(id: number) {
    return `This action removes a #${id} atleta`;
  }
}
