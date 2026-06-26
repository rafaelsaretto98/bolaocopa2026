import {
    salvarPalpitesMataMata
}
from "./palpites-mata-mata-firebase.js";

import {
    carregarParticipantes
}
from "./participantes-firebase.js";

import {
    carregarConfiguracoes
}
from "./configuracoes-firebase.js";

import {
    carregarJogosPorFase
}
from "./mata-mata-firebase.js";

async function iniciar(){

    await carregarListaParticipantes();

    const config =
        await carregarConfiguracoes();

    const jogos =
        await carregarJogosPorFase(
            config.faseAtual
        );

    desenharJogos(jogos);
    
}


function montarDashboard(participante){

    document.getElementById(

        "dashboardParticipante"

    ).innerHTML = `

<h2>

👤 ${participante.nome}

</h2>

<div class="dashboard-pontos">

    <div>

        <strong>🏆 Grupo</strong>

        <br>

        ${participante.pontosGrupo}

    </div>

    <div>

        <strong>⚽ Mata-Mata</strong>

        <br>

        ${participante.pontosMataMata}

    </div>

    <div>

        <strong>⭐ Total</strong>

        <br>

        ${participante.total}

    </div>

</div>

`;

}

function desenharJogos(

    jogos,
    palpites
){
    criarCardJogo(jogo);

    const lista =
        document.getElementById(
            "listaJogos"
        );

    lista.innerHTML = "";

    jogos.forEach(jogo=>{

        lista.appendChild(

            criarCardJogo(jogo)

        );

    });

}

function criarCardJogo(jogo){

    const card =
        document.createElement(
            "div"
        );

    card.className =
        "regras-card";
    
    card.dataset.jogo =
    jogo.id;

    card.innerHTML = `

<h3 class="titulo-confronto">

${jogo.timeA?.time}

<span>×</span>

${jogo.timeB?.time}

</h3>

<div
    class="time-card"
    data-jogo="${jogo.id}"
    data-time="${jogo.timeA?.time}"
>

    <img
        class="bandeira-mata"
        src="img/band_${jogo.timeA?.time}.png"
        onerror="this.src='img/band_placeholder.png'"
    >

    <span>

        ${jogo.timeA?.time}

    </span>

</div>

<div class="vs-card">

VS

</div>

<div
    class="time-card"
    data-jogo="${jogo.id}"
    data-time="${jogo.timeB?.time}"
>

    <img
        class="bandeira-mata"
        src="img/band_${jogo.timeB?.time}.png"
        onerror="this.src='img/band_placeholder.png'"
    >

    <span>

        ${jogo.timeB?.time}

    </span>

</div>

`;

    const opcoes =
        card.querySelectorAll(
            ".time-card"
        );

    opcoes.forEach(opcao=>{

        opcao.addEventListener(

            "click",

            ()=>{

                opcoes.forEach(o=>

                    o.classList.remove(
                        "selecionado"
                    )

                );

                opcoes.forEach(o=>{

            o.classList.remove(
                "selecionado"
            );
        
        });
        
             opcao.classList.add(
            "selecionado"
        );
        
        card.dataset.escolhido =
        
            opcao.dataset.time;

            }

        );

    });

    return card;

}

async function carregarListaParticipantes(){

    const participantes =
        await carregarParticipantes();

    const select =
        document.getElementById(
            "participanteSelect"
        );

    participantes.forEach(participante=>{

        const option =
            document.createElement(
                "option"
            );

        option.value =
            participante.nome;

        option.textContent =
            participante.nome;

        select.appendChild(
            option
        );

    });

}

document
.getElementById(
    "salvarTodos"
)
.addEventListener(

    "click",

    async ()=>{

        const participante =
            document.getElementById(
                "participanteSelect"
            ).value;

        if(!participante){

            alert(
                "Selecione o participante."
            );

            return;

        }

        const palpites = {};

        document
        .querySelectorAll(
            ".regras-card"
        )
        .forEach(card=>{

            if(
                card.dataset.escolhido
            ){

                palpites[
                    card.dataset.jogo
                ] =

                card.dataset.escolhido;

            }

        });

        try{

    await salvarPalpitesMataMata(

        participante,

        palpites

    );

    alert(

        "✅ Palpites salvos!"

    );

    await iniciar();

}
catch(erro){

    console.error(erro);

    alert(

        "Erro ao salvar."

    );

}

    }

);

iniciar();
