import {
    confrontos16Avos
}
from './mata-mata-config.js';

import {
    carregarTabelaTerceiros
}
from './terceiros-loader.js';

console.log("MATA-MATA UTILS NOVO");

export async function gerar16Avos(classificados){

    const tabela =
        await carregarTabelaTerceiros();

    return Promise.all(

        confrontos16Avos.map(async confronto => ({

            id:`16A-${confronto.id}`,

            fase: "16-avos",

            timeA: await resolverCodigo(
                confronto.mandante,
                classificados,
                tabela
            ),

            timeB: await resolverCodigo(
                confronto.visitante,
                classificados,
                tabela
            ),

            golsA: null,

            golsB: null,

            penaltisA: null,

            penaltisB: null,

            vencedor: null,

            encerrado: false

        }))

    );

}

async function resolverCodigo(
    codigo,
    classificados,
    tabela
){

    if(codigo.startsWith("1")){

        return classificados.primeiros[
            codigo[1]
        ];

    }

    if(codigo.startsWith("2")){

        return classificados.segundos[
            codigo[1]
        ];

    }

    if(codigo.startsWith("3")){

        return resolverTerceiro(
            codigo,
            classificados,
            tabela
        );

    }

    return null;

}

function resolverTerceiro(
    codigo,
    classificados,
    tabela
){

    const melhoresTerceiros =
        classificados.terceiros.slice(0,8);

    const gruposClassificados =
        melhoresTerceiros
            .map(t => t.grupo)
            .sort();

    let regraEncontrada = null;

    for(const regra of Object.values(tabela.combinacoes)){

        const gruposRegra =
            Object.values(regra)
                .map(t => t.replace("3",""))
                .sort();

        if(
            JSON.stringify(gruposRegra) ===
            JSON.stringify(gruposClassificados)
        ){

            regraEncontrada = regra;
            break;

        }

    }

    if(!regraEncontrada){

        console.error(
            "Combinação dos terceiros não encontrada."
        );

        return null;

    }

    const mapa = {

        "3ABCDF":"1E",

        "3CDFGH":"1I",

        "3BEFIJ":"1D",

        "3AEHIJ":"1G",

        "3CEFHI":"1A",

        "3EHIJK":"1L",

        "3EFGIJ":"1B",

        "3DEIJL":"1K"

    };

    const vencedorGrupo =
        mapa[codigo];

    if(!vencedorGrupo){

        return null;

    }

    const terceiro =
        regraEncontrada[
            vencedorGrupo
        ];

    if(!terceiro){

        return null;

    }

    return melhoresTerceiros.find(

        t => t.grupo === terceiro.replace("3","")

    ) || null;

}

