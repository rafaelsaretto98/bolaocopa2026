import {
    carregarParticipantesRanking
}
from './ranking-firebase.js';

import {
    carregarJogos
}
from './jogos-firebase.js';

import {
    calcularPontuacao
}
from './ranking-utils.js';

export async function carregarTopRanking(){

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

const botao =
document.createElement('a');

botao.href =
'ranking.html';

botao.textContent =
'🏆 Ver Classificação Completa';

botao.style.display =
'block';

botao.style.marginTop =
'15px';

botao.style.padding =
'12px';

botao.style.background =
'#1e3a8a';

botao.style.color =
'white';

botao.style.textAlign =
'center';

botao.style.textDecoration =
'none';

botao.style.borderRadius =
'10px';

botao.style.fontWeight =
'700';

container.appendChild(
botao
);

}


