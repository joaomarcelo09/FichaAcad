export async function optFindFicha(altura, peso) {
    return {
        altura_minima: {
            lte: altura,
          },
          altura_maxima: {
            gte: altura,
          },
          peso_minimo: {
            lte: peso,
          },
          peso_maximo: {
            gte: peso,
          },
    }
} 