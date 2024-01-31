import { PrismaClient } from "@prisma/client";


const $prisma = new PrismaClient()

const exercicio = [
    {
        id_seeder: 1,
        titulo: 'Voador Frontal',
        descricao: '',
        status: true
    },
    {
        id_seeder: 2,
        titulo: 'Supino Vertical',
        descricao: '',
        status: true
    },
    {
        id_seeder: 3,
        titulo: 'Supino 30 graus',
        descricao: '',
        status: true
    },
    {
        id_seeder: 4,
        titulo: 'Tríceps no Cross',
        descricao: '',
        status: true
    },

    {
        id_seeder: 5,
        titulo: 'Cadeira Extensora',
        descricao: '',
        status: true
    },
    {
        id_seeder: 6,
        titulo: 'Cadeira Flexora',
        descricao: '',
        status: true
    },

]

export async function exercicioMain(tx?) {

      const prisma = tx ?? $prisma

      const exerSgbd = await prisma.exercicio.findMany()

      const del = exerSgbd.filter(sgdb => !exercicio.some(prog => sgdb.id_seeder === prog.id_seeder))
      const update = exercicio.filter(prog => exerSgbd.some(sgdb => sgdb.id_seeder === prog.id_seeder))
      const add = exercicio.filter(prog => !exerSgbd.some(sgdb => sgdb.id_seeder === prog.id_seeder))


      const idRel = [...del.map(del => del.id), ...update.map(up => { return exerSgbd.find(pg => pg.id_seeder === up.id_seeder)?.id })]
    

      const rel = await prisma.ficha_exercicio.findMany({
        where: {
            id_exercicio: {
                in: idRel
            }
        }
      })

    let requests = []


    if (del?.length) {
        const delRel = rel.filter(rel => del.some(s => s.id === rel.id))?.map(del => {
            return del.id
        })

        await prisma.ficha_exercicio.deleteMany({
            where: {
                id_exercicio: {
                    in: delRel
                }
            }
        })

        await prisma.exercicio.deleteMany({
            where: {
                id: {
                    in: del.map(dl => dl.id)
                }
            }
        })
    }

    if (add?.length) requests.push(prisma.exercicio.createMany({ data: add }))

    if( update?.length) {
        const updateReq = update.map(up => {
            const { id } = exerSgbd.find(pg => pg.id_seeder === up.id_seeder)

            return prisma.exercicio.update({
                where: {
                    id
                },
                data: up
            })
        })
        requests = [...requests, ...updateReq]
    }

    await Promise.all(requests)
    return true
}
