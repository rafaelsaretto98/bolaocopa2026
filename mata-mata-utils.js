import {
    confrontos16Avos
}
from './mata-mata-config.js';

import {
    tabelaTerceiros
}
from './terceiros-config.js';


function resolverCodigo(codigo, classificados){

    if(codigo.startsWith('1')){

        return classificados.primeiros[
            codigo[1]
        ];

    }

    if(codigo.startsWith('2')){

        return classificados.segundos[
            codigo[1]
        ];

    }

    if(codigo.startsWith('3')){

        return resolverTerceiro(
            codigo,
            classificados
        );

    }

    return null;

}

export function gerar16Avos(classificados){

   return confrontos16Avos.map(confronto => ({

    id: confronto.id,

    fase:"32-avos",

    timeA:
        resolverCodigo(
            confronto.mandante,
            classificados
        ),

    timeB:
        resolverCodigo(
            confronto.visitante,
            classificados
        ),

    golsA:null,

    golsB:null,

    penaltisA:null,

    penaltisB:null,

    vencedor:null,

    encerrado:false

}));

}

function resolverTerceiro(codigo, classificados){

    const melhoresTerceiros =
    classificados.terceiros.slice(0,8);

    const gruposClassificados =
    melhoresTerceiros
        .map(t => t.grupo)
        .sort()
        .join('');
            

    const regra =
        tabelaTerceiros[
            gruposClassificados
        ];

    if(!regra)
        return null;

    const grupoEscolhido =
    regra[codigo];

        if(!grupoEscolhido){
            return null;
        }
        
        return melhoresTerceiros.find(
        t => t.grupo === grupoEscolhido
    );

}
