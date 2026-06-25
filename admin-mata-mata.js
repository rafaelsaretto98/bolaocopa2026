import {
    carregarConfiguracoes
}
from "./configuracoes-firebase.js";

import {
    carregarJogosPorFase
}
from "./mata-mata-firebase.js";

async function iniciar(){

    const config =
        await carregarConfiguracoes();

    document.getElementById(
        "faseAtual"
    ).innerHTML = `
        <strong>Fase Atual:</strong>
        ${nomeFase(config.faseAtual)}
    `;

    const jogos =
        await carregarJogosPorFase(
            config.faseAtual
        );

    desenharJogos(jogos);

}

function desenharJogos(jogos){

    const lista =
        document.getElementById(
            "listaJogos"
        );

    lista.innerHTML = "";

    jogos.forEach(jogo=>{

        const card =
            document.createElement("div");

        card.className =
            "regras-card";

        card.innerHTML = `

<h3>

${jogo.timeA?.time ?? "A definir"}

×

${jogo.timeB?.time ?? "A definir"}

</h3>

<div
style="
display:flex;
justify-content:center;
align-items:center;
gap:10px;
margin-top:20px;
">

<input

type="number"

id="golsA-${jogo.id}"

value="${jogo.golsA ?? ""}"

style="width:70px;"

>

<strong>

x

</strong>

<input

type="number"

id="golsB-${jogo.id}"

value="${jogo.golsB ?? ""}"

style="width:70px;"

>

</div>

<br>

<button

id="salvar-${jogo.id}"

class="btn-relampago"

>

💾 Salvar Resultado

</button>

`;

        lista.appendChild(card);

    });

}

function nomeFase(fase){

    switch(fase){

        case "16-avos":

            return "16 Avos de Final";

        case "oitavas":

            return "Oitavas de Final";

        case "quartas":

            return "Quartas de Final";

        case "semifinal":

            return "Semifinais";

        case "final":

            return "Final";

        default:

            return fase;

    }

}

iniciar();
