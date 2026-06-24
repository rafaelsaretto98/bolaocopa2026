import {
    salvarJogosMataMata
}
from './mata-mata-firebase.js';

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

import {
    atualizarOitavas,
    atualizarQuartas,
    atualizarSemifinais,
    atualizarFinal
}
from './mata-mata-progressao.js';

import {
    desenharBracket
}
from "./mata-mata-layout.js";

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
    await gerar16Avos(
        classificados
    );

const jogosOitavas =
    Array.from({length:8}, (_,i)=>({

        id:i+1,

        timeA:null,

        timeB:null,

        golsA:null,

        golsB:null,

        vencedor:null

    }));

const jogosQuartas =
    Array.from({length:4}, (_,i)=>({

        id:i+1,

        timeA:null,

        timeB:null,

        golsA:null,

        golsB:null,

        vencedor:null

    }));

const jogosSemi =
    Array.from({length:2}, (_,i)=>({

        id:i+1,

        timeA:null,

        timeB:null,

        golsA:null,

        golsB:null,

        vencedor:null

    }));

const jogoFinal = {

    id:1,

    timeA:null,

    timeB:null,

    golsA:null,

    golsB:null,

    vencedor:null

};

atualizarOitavas(
    jogos16Avos,
    jogosOitavas
);

atualizarQuartas(
    jogosOitavas,
    jogosQuartas
);

atualizarSemifinais(
    jogosQuartas,
    jogosSemi
);

atualizarFinal(
    jogosSemi,
    jogoFinal
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
