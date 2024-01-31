import { PrismaService } from "../src/database/prisma.service"
import { exercicioMain } from "./seeders/exercicio"
import { intensidadeMain } from "./seeders/intensidade"

const $prisma = new PrismaService

async function main() {

  
        console.log('iniciar seeder')

        intensidadeMain()
        exercicioMain()

        console.log('finalizar seeder')
    }

main()