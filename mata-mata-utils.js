import {
    confrontosOitavas
}
from './mata-mata-config.js';


function resolverCodigo(codigo, classificados){

    const posicao =
        codigo[0];

    const grupo =
        codigo[1];

    if(posicao === '1'){

        return classificados.primeiros[grupo];

    }

    if(posicao === '2'){

        return classificados.segundos[grupo];

    }

    return null;

}


export function gerarOitavas(classificados){

    return confrontosOitavas.map(confronto => ({

        id: confronto.id,

        timeA:
            resolverCodigo(
                confronto.mandante,
                classificados
            ),

        timeB:
            resolverCodigo(
                confronto.visitante,
                classificados
            )

    }));

}
