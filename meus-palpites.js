import {
    carregarParticipante,
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

import {
    montarDashboard,
    desenharJogos
}
from "./meus-palpites-layout.js";

let jogosAtuais = [];

async function iniciar(){

    await carregarListaParticipantes();

    const config =
        await carregarConfiguracoes();

    jogosAtuais =
        await carregarJogosPorFase(
            config.faseAtual
        );

    desenharJogos(jogosAtuais);

}

async function carregarListaParticipantes(){

    const participantes =
        await carregarParticipantes();

    const select =
        document.getElementById(
            "participanteSelect"
        );

    select.innerHTML = `
        <option value="">
            Selecione seu nome
        </option>
    `;

    participantes.forEach(participante=>{

        const option =
            document.createElement("option");

        option.value =
            participante.nome;

        option.textContent =
            participante.nome;

        select.appendChild(option);

    });

    select.addEventListener(

        "change",

        carregarParticipanteSelecionado

    );

}

async function carregarParticipanteSelecionado(){

    const nome =
        document.getElementById(
            "participanteSelect"
        ).value;

    if(!nome){

        return;

    }

    const participante =
        await carregarParticipante(
            nome
        );

    montarDashboard(
        participante
    );

    desenharJogos(

        jogosAtuais,

        participante.palpitesMataMata || {}

    );

}

document
.getElementById(
    "salvarTodos"
)
.addEventListener(

    "click",

    salvarTodos

);

async function salvarTodos(){

    const nome =
        document.getElementById(
            "participanteSelect"
        ).value;

    if(!nome){

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

        if(card.dataset.escolhido){

            palpites[
                card.dataset.jogo
            ] =

            card.dataset.escolhido;

        }

    });

    try{

        await salvarPalpitesMataMata(

            nome,

            palpites

        );

        alert(
            "✅ Palpites salvos!"
        );

        await carregarParticipanteSelecionado();

    }
    catch(erro){

        console.error(erro);

        alert(
            "Erro ao salvar."
        );

    }

}

iniciar();
