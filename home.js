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

<div class="topo-relampago">

   <div class="regras-card placar-relampago-card">

   <h2>
       🔥 Palpite Relâmpago
   </h2>

   <p>
        Brasil x Haiti
   </p>

   <div style="
   background:#dcfce7;
   color:#166534;
   padding:10px;
   border-radius:8px;
   margin:12px 0;
   font-weight:700;
   text-align:center;
   ">
       🔓 Palpites abertos até o início da partida
   </div>

   <p>
      
        Sexta-feira • 19/06
       <br>
       Deixe seu palpite!
   </p>

   <input
       id="nomeBolao"
       placeholder="Seu nome"
       style="
           width:100%;
           padding:10px;
           margin-bottom:10px;
       "
   >

   <div style="
       display:flex;
       gap:10px;
       margin-bottom:15px;
       align-items:center;
   ">

       <input
           id="golsBrasil"
           type="number"
           min="0"
           value="0"
           style="
               flex:1;
               padding:10px;
               text-align:center;
           "
       >

       <span style="
           font-size:22px;
           font-weight:800;
       ">
           x
       </span>

       <input
          id="golsAdversario"
          type="number"
          min="0"
          value="0"
          style="
              flex:1;
              padding:10px;
              text-align:center;
          "
>

   </div>

           <button
               id="enviarPalpiteRelampago"
               class="btn-relampago"
           >
               ⚽ Enviar Palpite
           </button>

   <div
       id="mensagemRelampago"
       style="
           margin-top:10px;
           font-weight:700;
       "
   ></div>

</div>

   <div class="regras-card painel-palpites-relampago">

       <h2>
           🏆 Bolão #1 Encerrado
       </h2>

       <div id="listaPalpitesRelampago">

           <div style="
               text-align:center;
               padding:15px;
           ">

               <div style="
                   font-size:24px;
                   font-weight:800;
                   color:#1e3a8a;
               ">
                   <div style="
                   font-size:32px;
                   font-weight:900;
                   color:#1e3a8a;
               ">
                   🇧🇷 1 × 1 🇲🇦
               </div>
               
               </div>

               <div style="
                   margin-top:10px;
                   font-size:18px;
                   font-weight:700;
               ">
                   Brasil x Marrocos
               </div>

               <div style="
                   margin-top:15px;
                   color:#dc2626;
                   font-weight:700;
               ">
                   🏁 Bolão encerrado sem vencedores
               </div>

               <div style="
                   margin-top:10px;
                   color:#64748b;
               ">
                   Ninguém acertou o empate em 1x1
               </div>

           </div>

       </div>

   </div>

</div>


<div class="conteudo-home">

   <div class="regras-card hero-bolao">

   <h1>
       🏆 Bolão Família Corazza
   </h1>

   <p class="subtitulo-copa">
       Copa do Mundo 2026
   </p>

   <img
       src="img/bandeira_Brasil.png"
       class="bandeira-topo"
   >

   <div class="selo-hexa">
       ⭐ Rumo ao Hexa ⭐
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

<div class="cards-inferiores">

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



container.innerHTML = `

   <div style="
       background:#f8fafc;
       padding:15px;
       border-radius:12px;
       margin-bottom:15px;
       border-left:5px solid #2563eb;
       font-style:italic;
       line-height:1.5;
   ">
       "${ultimo.texto}"
   </div>

   <div style="
       font-weight:700;
       color:#1e3a8a;
       text-align:right;
   ">
       — ${ultimo.nome}
   </div>

`;
}

carregarUltimoRecado();
