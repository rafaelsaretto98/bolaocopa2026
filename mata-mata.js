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

function desenharBracket(

    jogos16,

    jogosOitavas,

    jogosQuartas,

    jogosSemi,

    jogoFinal

){

    const container =
        document.getElementById(
            'mataMata'
        );

    container.innerHTML = `

<div class="bracket">

    <div class="fase fase-16">
    <h2>16 Avos</h2>
    <div id="fase16" class="lista-fase"></div>
</div>

<div class="fase fase-oitavas">
    <h2>Oitavas</h2>
    <div id="faseOitavas" class="lista-fase"></div>
</div>

<div class="fase fase-quartas">
    <h2>Quartas</h2>
    <div id="faseQuartas" class="lista-fase"></div>
</div>

<div class="fase fase-semi">
    <h2>Semifinais</h2>
    <div id="faseSemi" class="lista-fase"></div>
</div>

<div class="fase fase-final">
    <h2>Final</h2>
    <div id="faseFinal" class="lista-fase"></div>
</div>

</div>

`;

   desenharFase(
    "fase16",
    jogos16
);

desenharFase(
    "faseOitavas",
    jogosOitavas
);

desenharFase(
    "faseQuartas",
    jogosQuartas
);

desenharFase(
    "faseSemi",
    jogosSemi
);

desenharFase(
    "faseFinal",
    [jogoFinal]
);
}
function desenharFase(id, jogos){

    const fase =
        document.getElementById(id);

    jogos.forEach(jogo=>{

        fase.appendChild(
            criarCardJogo(jogo)
        );

    });

}

function bandeira(nome){

    if(!nome){
        return "img/band_placeholder.png";
    }

    return `img/band_${nome}.png`;

}

function criarCardJogo(jogo){

    const card =
        document.createElement(
            'div'
        );

    card.className =
        'jogo-card';

    card.innerHTML = `

<div class="time-linha">

    <div class="nome-time">

        <img
            class="bandeira-mata"
            src="${bandeira(jogo.timeA?.time ?? 'placeholder')}"
            onerror="this.src='img/band_placeholder.png'"
        >

        <span>

            ${jogo.timeA?.time ?? 'A definir'}

        </span>

    </div>

    <div class="gols">

        ${jogo.golsA ?? "-"}

    </div>

</div>

<div class="time-linha">

    <div class="nome-time">

        <img
            class="bandeira-mata"
            src="${bandeira(jogo.timeB?.time ?? 'placeholder')}"
            onerror="this.src='img/band_placeholder.png'"
        >

        <span>

            ${jogo.timeB?.time ?? 'A definir'}

        </span>

    </div>

    <div class="gols">

        ${jogo.golsB ?? "-"}

    </div>

</div>

`;

    return card;

}

iniciar();
