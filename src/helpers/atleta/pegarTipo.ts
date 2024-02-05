export async function pegarTipo(body:any) {
    
    if(body.altura >= 180 && body.peso >= 60) {
        return 'A'
    }

    else if(body.altura < 180 && body.peso < 60) {
        return 'B'
    }
}