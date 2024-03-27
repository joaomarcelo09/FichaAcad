export interface FichaType {
    id?: number;
    nome: string;
    altura_minima: number;
    altura_maxima: number;
    peso_minimo: number;
    peso_maximo: number;
    biotipo: 'endomorfo' | 'mesomorfo' | 'ectomorfo';
    ficha_exercicio?: {
        id: number,
        id_exercicio: number,
        id_intensidade: number,
        id_ficha: number
    }[]
    exercicios?: {
        id_exercicio: number;
        id_intensidade: number;
    }[];
}