export interface AtletaType {
    nome: string;
    email: string;
    telefone: object;
    peso: number
    altura: number
    biotipo: 'endomorfo' | 'mesomorfo' |'ectomorfo'
    status: boolean
}