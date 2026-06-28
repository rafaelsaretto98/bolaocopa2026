import {
    carregarJogosMataMata
}
from "./mata-mata-firebase.js";

import {
    carregarParticipantes,
    atualizarParticipante
}
from "./participantes-firebase.js";

export async function calcularPontuacaoMataMata(){

    const jogos =
        await carregarJogosMataMata();

    const participantes =
        await carregarParticipantes();

    for(const participante of participantes){

        let pontos = 0;

        const palpites =

            participante.palpitesMataMata || {};

        jogos.forEach(jogo=>{

            if(

                !jogo.encerrado ||

                !jogo.vencedor

            ){

                return;

            }

            if(

                palpites[jogo.id] ===

                jogo.vencedor

            ){

                pontos++;

            }

        });

        participante.pontosMataMata =

            pontos;

        participante.total =

            (participante.pontosGrupo || 0)

            +

            pontos;

        await atualizarParticipante(

            participante

        );

    }

}

