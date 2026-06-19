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
    gerarOitavas
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

    const todasClassificacoes = [];

    grupos.forEach(grupo => {

        todasClassificacoes.push(

            gerarClassificacao(
                jogos,
                grupo
            )

        );

    });

    const classificados =
        gerarClassificados(
            todasClassificacoes
        );

    const oitavas =
        gerarOitavas(
            classificados
        );

    console.log(oitavas);

}

iniciar();
