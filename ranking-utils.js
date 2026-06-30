import {
    gerarClassificacao
}
from './classificacao-utils.js';

export function calcularPontuacao(
    participante,
    jogos
){

    let pontos = 0;

    const grupos = [
        'A','B','C','D',
        'E','F','G','H',
        'I','J','K','L'
    ];

    grupos.forEach(grupo => {

        const classificacao =
            gerarClassificacao(
                jogos,
                grupo
            );

        if(
            classificacao.length < 4
        ){
            return;
        }

        const oficial = {
            '1º': classificacao[0].time,
            '2º': classificacao[1].time,
            '3º': classificacao[2].time,
            '4º': classificacao[3].time
        };

        const palpite =
            participante.palpites[grupo];

        if(!palpite){
            return;
        }

        ['1º','2º','3º','4º']
        .forEach(posicao => {

            if(
                palpite[posicao] ===
                oficial[posicao]
            ){
                pontos++;
            }

        });

    });

    return pontos;

}

export async function calcularPontuacaoMataMata(
    participante,
    jogosMataMata
){

    let pontos = 0;

    const palpites =
        participante.palpitesMataMata || {};

    console.log("Participante:", participante.nome);
    console.log("Palpites:", palpites);

    jogosMataMata.forEach(jogo=>{

        if(!jogo.encerrado || !jogo.vencedor){
            return;
        }

        console.log(
            jogo.id,
            "Palpite:",
            palpites[jogo.id],
            "Vencedor:",
            jogo.vencedor
        );

        if(
            palpites[jogo.id] === jogo.vencedor
        ){
            pontos++;
        }

    });

    console.log("Pontos:", pontos);

    return pontos;

}

export async function calcularTotal(

    participante,
    jogosGrupo,
    jogosMataMata
){

    const grupo =

        calcularPontuacao(
            participante,
            jogosGrupo
        );

    const mata =

        await calcularPontuacaoMataMata(
            participante,
            jogosMataMata
        );

    return{

        grupo,
        mata,
        total:
            grupo + mata
    };

}
