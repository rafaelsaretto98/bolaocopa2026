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

    <div class="lado lado-esquerdo">

        <div class="fase">
            <h2>16 Avos</h2>
            <div id="fase16E"></div>
        </div>

        <div class="fase">
            <h2>Oitavas</h2>
            <div id="faseOitavasE"></div>
        </div>

        <div class="fase">
            <h2>Quartas</h2>
            <div id="faseQuartasE"></div>
        </div>

        <div class="fase">
            <h2>Semifinal</h2>
            <div id="faseSemiE"></div>
        </div>

    </div>

    <div class="centro">

        <h2>🏆 Final</h2>

        <div id="faseFinal"></div>

    </div>

    <div class="lado lado-direito">

        <div class="fase">
            <h2>Semifinal</h2>
            <div id="faseSemiD"></div>
        </div>

        <div class="fase">
            <h2>Quartas</h2>
            <div id="faseQuartasD"></div>
        </div>

        <div class="fase">
            <h2>Oitavas</h2>
            <div id="faseOitavasD"></div>
        </div>

        <div class="fase">
            <h2>16 Avos</h2>
            <div id="fase16D"></div>
        </div>

    </div>

</div>

`;

   desenharFase(
    "fase16E",
    jogos16.slice(0,8)
);

    desenharFase(
    "fase16D",
    jogos16.slice(8)
);

desenharFase(
    "faseOitavasE",
    jogosOitavas.slice(0,4)
);

desenharFase(
    "faseOitavasD",
    jogosOitavas.slice(4)
);

desenharFase(
    "faseQuartasE",
    jogosQuartas.slice(0,2)
);

desenharFase(
    "faseQuartasD",
    jogosQuartas.slice(2)
);
    
desenharFase(
    "faseSemiE",
    [jogosSemi[0]]
);

desenharFase(
    "faseSemiD",
    [jogosSemi[1]]
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
