import {
    rankingFifa
}
from './ranking-fifa.js';

export function gerarClassificacao(jogos, grupo){

    const tabela = {};

    jogos
    .filter(j =>
        j.grupo === grupo &&
        j.encerrado
    )
    .forEach(jogo => {

        const timeA = jogo.timeA;
        const timeB = jogo.timeB;

        if(!tabela[timeA]){

            tabela[timeA] = {
                time: timeA,
                pontos: 0,
                jogos: 0,
                vitorias: 0,
                empates: 0,
                derrotas: 0,
                golsPro: 0,
                golsContra: 0,
                saldo: 0,

                amarelos: 0,
                vermelhos: 0,
                fairPlay: 0
            };

        }

        if(!tabela[timeB]){

            tabela[timeB] = {
                time: timeB,
                pontos: 0,
                jogos: 0,
                vitorias: 0,
                empates: 0,
                derrotas: 0,
                golsPro: 0,
                golsContra: 0,
                saldo: 0,

                amarelos: 0,
                vermelhos: 0,
                fairPlay: 0
            };

        }

        tabela[timeA].jogos++;
        tabela[timeB].jogos++;

        tabela[timeA].golsPro += jogo.golsA;
        tabela[timeA].golsContra += jogo.golsB;

        tabela[timeB].golsPro += jogo.golsB;
        tabela[timeB].golsContra += jogo.golsA;
        tabela[timeA].amarelos +=
            Number(jogo.amarelosA || 0);
        tabela[timeA].vermelhos +=
            Number(jogo.vermelhosA || 0);
        tabela[timeB].amarelos +=
            Number(jogo.amarelosB || 0);
        tabela[timeB].vermelhos +=
            Number(jogo.vermelhosB || 0);

        if(jogo.golsA > jogo.golsB){

            tabela[timeA].pontos += 3;
            tabela[timeA].vitorias++;

            tabela[timeB].derrotas++;

        }
        else if(jogo.golsA < jogo.golsB){

            tabela[timeB].pontos += 3;
            tabela[timeB].vitorias++;

            tabela[timeA].derrotas++;

        }
        else{

            tabela[timeA].pontos += 1;
            tabela[timeB].pontos += 1;

            tabela[timeA].empates++;
            tabela[timeB].empates++;

        }

    });

    Object.values(tabela)
    .forEach(time => {

        time.saldo =
            time.golsPro -
            time.golsContra;

        time.fairPlay =

            time.amarelos +

            (time.vermelhos * 3);
        time.ranking =
            rankingFifa[
            time.time
        ] || 999;

    });

    return Object
        .values(tabela)
        .sort((a,b) => {

        if(
            b.pontos !==
            a.pontos
        ){
            return (
                b.pontos -
                a.pontos
            );
        }

        if(
            b.saldo !==
            a.saldo
        ){
            return (
                b.saldo -
                a.saldo
            );
        }

        if(
            b.golsPro !==
            a.golsPro
        ){
            return (
                b.golsPro -
                a.golsPro
            );
        }

        if(
            a.fairPlay !==
            b.fairPlay
        ){
            return (
                a.fairPlay -
                b.fairPlay
            );
        }

        return (
            a.ranking -
            b.ranking
        );

    });

}
