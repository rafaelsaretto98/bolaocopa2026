import {
    carregarConfiguracoes
}
from "./configuracoes-firebase.js";

import {
    salvarJogosMataMata,
    carregarJogosMataMata
}
from "./mata-mata-firebase.js";

import {
    inicializarMataMata
}
from "./mata-mata-inicializador.js";

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
    desenharBracket
}
from "./mata-mata-layout.js";

import { criarNavbar } from "./navbar.js";

document.getElementById(
    "navbar"
).innerHTML =
    criarNavbar("mata");

const grupos = [
'A','B','C','D',
'E','F','G','H',
'I','J','K','L'
];

async function iniciar(){

    const config =
    await carregarConfiguracoes();

    const jogosGrupos =
    await carregarJogos();

    const classificacoes=[];

    grupos.forEach(g=>{

        classificacoes.push(

            gerarClassificacao(
                jogosGrupos,
                g
            )

        );

    });

   const classificados =
    gerarClassificados(
        classificacoes
    );

    let jogos =
    await carregarJogosMataMata();

if(jogos.length === 0){

    jogos =
        await inicializarMataMata(
            classificados
        );

    await salvarJogosMataMata(
        jogos
    );

    }

    const jogos16Avos =
    jogos.filter(
        j => j.fase === "16-avos"
    );

const jogosOitavas =
    jogos.filter(
        j => j.fase === "oitavas"
    );

const jogosQuartas =
    jogos.filter(
        j => j.fase === "quartas"
    );

const jogosSemi =
    jogos.filter(
        j => j.fase === "semifinal"
    );

const jogoFinal =
    jogos.find(
        j => j.fase === "final"
    );

    desenharBracket(

    jogos16Avos,

    jogosOitavas,

    jogosQuartas,

    jogosSemi,

    jogoFinal

);

}

iniciar();
