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

import {
    carregarRecados
}
from './recados-firebase.js';

import {
    calcularPontuacao
}
from './ranking-utils.js';



const dashboard =
    document.getElementById(
        'dashboard'
    );

dashboard.innerHTML = `

    <div class="regras-card hero-bolao">
    
        <h1>
            🏆 Bolão Família Corazza 2026
        </h1>
    
        <p class="rumo-hexa">
            🇧🇷 Rumo ao Hexa 🇧🇷
        </p>

    <div class="regras-card status-bolao">

        <h2>
            🔒 Palpites Encerrados
        </h2>
    
        <p>
            14 participantes estão disputando a premiação do bolão.
        </p>
    
        <p>
            Agora é hora de acompanhar os jogos,
            o ranking e torcer pelo hexa! 🇧🇷
        </p>

    </div>

    <div class="atalhos-home">

    <a href="ranking.html" class="atalho-card">
        🏆
        <span>Ranking</span>
    </a>

    <a href="jogos.html" class="atalho-card">
        📅
        <span>Jogos</span>
    </a>

    <a href="classificacao.html" class="atalho-card">
        📊
        <span>Grupos</span>
    </a>

    <a href="recados.html" class="atalho-card">
        🎉
        <span>Interações</span>
    </a>

</div>



    <div class="hero-numeros">

        <div>

            <span>👥</span>

            <h2 id="totalParticipantes">
                ...
            </h2>

            <p>Participantes</p>

        </div>

        <div>

            <span>💰</span>

            <h2 id="premiacao">
                ...
            </h2>

            <p>Premiação Atual</p>

        </div>

    </div>

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

    <div class="regras-card">

    <h2>
        💬 Último Recado
    </h2>

    <div id="ultimoRecado">

        Carregando...

    </div>

    </div>

`;

async function carregarResumoBolao(){

    const participantes =
        await carregarParticipantes();
   

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



async function carregarTopRanking(){

    const participantes =
        await carregarParticipantesRanking();

    const jogos =
        await carregarJogos();

    participantes.forEach(p => {

        p.pontuacao =
            calcularPontuacao(
                p,
                jogos
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

    <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        padding:10px 0;
    ">

        <strong>
            ${medalhas[index]}
            ${p.nome}
        </strong>

        <span style="
            color:#10b981;
            font-weight:800;
        ">
            ${p.pontuacao} pts
        </span>

    </div>

`;
            container.appendChild(
                div
            );

        }
    );

}

carregarTopRanking();

async function carregarUltimoRecado(){

    const recados =
        await carregarRecados();

    const container =
        document.getElementById(
            'ultimoRecado'
        );

    if(
        !recados ||
        recados.length === 0
    ){

        container.innerHTML =
            'Nenhum recado ainda.';

        return;

    }

    const ultimo =
    recados[
        recados.length - 1
    ];

console.log(ultimo);

    container.innerHTML = `

        <div style="
            font-style:italic;
            margin-bottom:10px;
        ">
            "${ultimo.texto}"
        </div>

        <div style="
            font-weight:700;
            color:#1e3a8a;
        ">
            — ${ultimo.nome}
        </div>

    `;

}

carregarUltimoRecado();
