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
