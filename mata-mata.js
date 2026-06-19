import {
    carregarJogos
}
from './jogos-firebase.js';

import {
    gerarClassificacao
}
from './classificacao-utils.js';

import {
    gerarClassificados
}
from './classificados-utils.js';

import {
    gerar16Avos
}
from './mata-mata-utils.js';

const grupos = [
'A','B','C','D',
'E','F','G','H',
'I','J','K','L'
];

async function iniciar(){

    const jogos =
        await carregarJogos();

    const classificacoes=[];

    grupos.forEach(g=>{

        classificacoes.push(

            gerarClassificacao(
                jogos,
                g
            )

        );

    });

    const classificados =
        gerarClassificados(
            classificacoes
        );

    const jogos16Avos =
        gerar16Avos(
            classificados
        );

    desenharBracket(
        jogos16Avos
    );

}

iniciar();
