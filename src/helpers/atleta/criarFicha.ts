export async function criarFicha(tipo: string, biotipo: string) {
    
    if(tipo === 'A') {

        const ficha = {
            exercicio: [1,2,3,4,5,6],
            intensidade: 3
        }
        return ficha
    }

    else if(tipo === 'B') {
        const ficha = {
            exercicio: [1,2,3,4,5,6],
            intensidade: 1
        }
        return ficha
    }

    else return ''
}