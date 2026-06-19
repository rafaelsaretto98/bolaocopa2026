import {
    carregarJogos
}
from './jogos-firebase.js';

import {
    gerarClassificacao
}
from './classificacao-utils.js';

import {
    gerarRankingTerceiros
}
from './terceiros-utils.js';

import {
    gerarClassificados
}
from './classificados-utils.js';

const grupos = [
    'A','B','C','D',
    'E','F','G','H',
    'I','J','K','L'
];

async function iniciar(){

    const jogos =
        await carregarJogos();

    console.log(
    jogos.map(j => ({
        grupo: j.grupo,
        timeA: j.timeA,
        timeB: j.timeB,
        golsA: j.golsA,
        golsB: j.golsB,
        encerrado: j.encerrado
    }))
);
    console.log('JOGOS:', jogos);
    console.log('TOTAL:', jogos.length);

    const container =
        document.getElementById(
            'classificacoes'
        );
    const todasClassificacoes = [];

    grupos.forEach(grupo => {

        const classificacao =
            gerarClassificacao(
                jogos,
                grupo
            );

        if(
            classificacao.length === 0
        ){
            return;
        }
        
        todasClassificacoes.push(
                classificacao
        );

        const card =
            document.createElement('div');

        card.className =
            'regras-card';

        let html = `
            <h2>
                Grupo ${grupo}
            </h2>

            <div class="tabela-wrapper">

            <table
                class="tabela-classificacao"
            >
                <tr>
                    <th>Pos</th>
                    <th>Seleção</th>
                    <th>Pts</th>
                    <th>J</th>
                    <th>V</th>
                    <th>E</th>
                    <th>D</th>
                    <th>GP</th>
                    <th>GC</th>
                    <th>SG</th>
                    <th>CA</th>
                    <th>CV</th>
                </tr>
        `;

        classificacao.forEach(
            (time,index) => {

                const corLinha =
                    index < 2
                    ? '#dcfce7'
                    : '#ffffff';

            html += `
                <tr style="background:${corLinha};">
                    <td>${index + 1}</td>

                    <td>${time.time}</td>

                     <td>${time.pontos}</td>
                    <td>${time.jogos}</td>
                    <td>${time.vitorias}</td>
                    <td>${time.empates}</td>
                    <td>${time.derrotas}</td>
                    <td>${time.golsPro}</td>
                    <td>${time.golsContra}</td>
                    <td>${time.saldo}</td>
                    <td>${time.amarelos ?? 0}</td>
                    <td>${time.vermelhos ?? 0}</td>
                </tr>
            `;

        });

        html += `
    </table>

    </div>
`;

        card.innerHTML = html;

        container.appendChild(card);

    });

    const terceiros =
    gerarRankingTerceiros(
        todasClassificacoes
    );

console.log("Todas as classificações");
console.log(todasClassificacoes);

console.log("Ranking dos terceiros");
console.log(terceiros);



const cardTerceiros =
    document.createElement('div');

cardTerceiros.className =
    'regras-card';

let htmlTerceiros = `
<h2>
🥉 Melhores Terceiros Colocados
</h2>

<div class="tabela-wrapper">

<table class="tabela-classificacao">

<tr>

<th>#</th>

<th>Grupo</th>

<th>Seleção</th>

<th>Pts</th>

<th>SG</th>

<th>GP</th>

</tr>
`;

terceiros.forEach((time,index)=>{

    const cor =
        index < 8
        ? '#dcfce7'
        : '#fee2e2';

    htmlTerceiros += `

<tr style="background:${cor};">

<td>${index+1}</td>

<td>${time.grupo}</td>

<td>${time.time}</td>

<td>${time.pontos}</td>

<td>${time.saldo}</td>

<td>${time.golsPro}</td>

</tr>

`;

});

htmlTerceiros += `
</table>

</div>
`;

cardTerceiros.innerHTML =
    htmlTerceiros;

container.appendChild(
    cardTerceiros
);

}

iniciar();
