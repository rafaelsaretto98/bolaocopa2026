import {
    carregarJogosMataMata,
    atualizarJogoMataMata
}
from "./mata-mata-firebase.js";

import {
    agendaMataMata
}
from "./agenda-mata-mata.js";

async function corrigirAgenda(){

    const jogos =
        await carregarJogosMataMata();

    for(const jogo of jogos){

        const agenda =
            agendaMataMata[jogo.id];

        if(!agenda){
            continue;
        }

        jogo.data =
            agenda.data;

        jogo.horario =
            agenda.horario;

        jogo.cidade =
            agenda.cidade;

        jogo.estadio =
            agenda.estadio;

        await atualizarJogoMataMata(jogo);

        console.log(
            `✔ ${jogo.id} atualizado`
        );

    }

    console.log(
        "Migração concluída!"
    );

}

corrigirAgenda();
