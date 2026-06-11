import {
    carregarJogos
}
from './jogos-firebase.js';

import {
    carregarParticipantes
}
from './participantes-firebase.js';

import {
    carregarParticipantesRanking
}
from './ranking-firebase.js';



const dashboard =
    document.getElementById(
        'dashboard'
    );

dashboard.innerHTML = `

    <div class="regras-card">
        <h2>
            👥 Participantes
        </h2>

        <h1 id="totalParticipantes">
            ...
        </h1>
    </div>

    <div class="regras-card">
        <h2>
            💰 Premiação Atual
        </h2>

        <h1 id="premiacao">
            ...
        </h1>
    </div>

    <div class="regras-card">
        <h2>
            🔥 Próximos Jogos
        </h2>

        <div id="proximosJogos">
            Carregando...
        </div>
    </div>

    <div class="regras-card">
        <h2>
            🏆 Top 3
        </h2>

        <div id="topRanking">
            Carregando...
        </div>
    </div>

`;

async function carregarResumoBolao(){

    const participantes =
        await carregarParticipantes();
    console.log(jogos);

    const total =
        participantes.length;

    const premio =
        total * 20;

    document.getElementById(
        'totalParticipantes'
    ).textContent = total;

    document.getElementById(
        'premiacao'
    ).textContent =
        premio.toLocaleString(
            'pt-BR',
            {
                style:'currency',
                currency:'BRL'
            }
        );

}

carregarResumoBolao();

async function carregarProximosJogos(){

    const jogos =
        await carregarJogos();

    const futuros =
        jogos
        .filter(j => !j.encerrado)
        .sort((a,b) => {

            const dataA =
                new Date(
                    `${a.data}T${a.horario}`
                );

            const dataB =
                new Date(
                    `${b.data}T${b.horario}`
                );

            return dataA - dataB;

        })
        .slice(0,3);

    const container =
        document.getElementById(
            'proximosJogos'
        );

    container.innerHTML = '';

    futuros.forEach(jogo => {

        const jogoBrasil =

            jogo.timeA === 'Brasil' ||

            jogo.timeB === 'Brasil';

        const div =
            document.createElement('div');

        div.style.marginBottom =
            '15px';

        div.style.padding =
            '10px';

        div.style.borderRadius =
            '8px';

        if(jogoBrasil){

            div.style.border =
                '2px solid #facc15';

            div.style.background =
                '#fffbeb';
        }

        div.innerHTML = `

            <strong>
                ${
                    jogoBrasil
                    ? '⭐ '
                    : ''
                }

                ${jogo.timeA}
                x
                ${jogo.timeB}
            </strong>

            <br>

            📅 ${formatarData(jogo.data)}

            •

            🕒 ${jogo.horario}

        `;

        container.appendChild(div);

    });

}
carregarProximosJogos();

function formatarData(data){

    const partes =
        data.split('-');

    return `${partes[2]}/${partes[1]}`;

}

const resultadosOficiais =
    JSON.parse(
        localStorage.getItem(
            'resultadosOficiais'
        )
    ) || {};

function calcularPontos(palpiteUsuario){

    let pontos = 0;

    for(const grupo in resultadosOficiais){

        if(palpiteUsuario[grupo]){

            for(
                let p of [
                    '1º',
                    '2º',
                    '3º',
                    '4º'
                ]
            ){

                const escolha =
                    palpiteUsuario[grupo][p];

                const oficial =
                    resultadosOficiais[grupo][p];

                if(
                    escolha &&
                    oficial &&
                    escolha === oficial
                ){

                    pontos++;

                }

            }

        }

    }

    return pontos;

}

async function carregarTopRanking(){

    const participantes =
        await carregarParticipantesRanking();

    participantes.forEach(p => {

        p.pontuacao =
            calcularPontos(
                p.palpites
            );

    });

    participantes.sort(
        (a,b) =>
            b.pontuacao -
            a.pontuacao
    );

    const top3 =
        participantes.slice(0,3);

    const container =
        document.getElementById(
            'topRanking'
        );

    container.innerHTML = '';

    const medalhas = [
        '🥇',
        '🥈',
        '🥉'
    ];

    top3.forEach(
        (p,index) => {

            const div =
                document.createElement(
                    'div'
                );

            div.style.marginBottom =
                '10px';

            div.innerHTML = `
                <strong>
                    ${medalhas[index]}
                    ${p.nome}
                </strong>

                <br>

                ${p.pontuacao} pts
            `;

            container.appendChild(
                div
            );

        }
    );

}
