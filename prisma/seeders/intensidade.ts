import { PrismaClient } from "@prisma/client";


const $prisma = new PrismaClient()

const intensidade = [
    {
        id_seeder: 1,
        repeticao: 10,
        serie: 3,
        status: true
        
    },

    {
        id_seeder: 2,
        repeticao: 12,
        serie: 3,
        status: true
    },
    {
        id_seeder: 3,
        repeticao: 15,
        serie: 3,
        status: true
    }
]

export async function intensidadeMain(tx?) {

      const prisma = tx ?? $prisma

      const intenSgbd = await prisma.intensidade.findMany()

      const del = intenSgbd.filter(sgdb => !intensidade.some(prog => sgdb.id_seeder === prog.id_seeder))
      const update = intensidade.filter(prog => intenSgbd.some(sgdb => sgdb.id_seeder === prog.id_seeder))
      const add = intensidade.filter(prog => !intenSgbd.some(sgdb => sgdb.id_seeder === prog.id_seeder))


      const idRel = [...del.map(del => del.id), ...update.map(up => { return intenSgbd.find(pg => pg.id_seeder === up.id_seeder)?.id })]
    

      const rel = await prisma.ficha_exercicio.findMany({
        where: {
            id_intensidade: {
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
                id_intensidade: {
                    in: delRel
                }
            }
        })

        await prisma.intensidade.deleteMany({
            where: {
                id: {
                    in: del.map(dl => dl.id)
                }
            }
        })
    }

    if (add?.length) requests.push(prisma.intensidade.createMany({ data: add }))

    if( update?.length) {
        const updateReq = update.map(up => {
            const { id } = intenSgbd.find(pg => pg.id_seeder === up.id_seeder)

            return prisma.intensidade.update({
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
