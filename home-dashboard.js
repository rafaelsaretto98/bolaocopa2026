import { boloesRelampago } from './home-relampago.js';

const bolaoAtual =
    boloesRelampago.find(b => !b.encerrado);

const ultimoBolao =
    [...boloesRelampago]
    .reverse()
    .find(b => b.encerrado);

export function criarDashboard(){

    const dashboard =
        document.getElementById('dashboard');

    dashboard.innerHTML = `

<div class="topo-relampago">

    <!-- PALPITE -->
    <div class="regras-card placar-relampago-card">

        <h2>🔥 Palpite Relâmpago #4</h2>

        <p style="text-align:center;font-size:18px;font-weight:700;">
            ${bolaoAtual.timeA} x ${bolaoAtual.timeB}
        </p>

        <p class="data-relampago">
            ${bolaoAtual.textoData}
            <br>
            Deixe seu palpite!
        </p>

        <input
            id="nomeBolao"
            placeholder="Seu nome"
            class="input-relampago"
        >

        <div class="placar-input">

            <div class="time-input">

                <img
            src="${bolaoAtual.bandeiraA}"
            class="bandeira-img"
        >

                <div class="nome-time">
                    ${bolaoAtual.timeA}
                </div>

                <input
                    id="golsBrasil"
                    type="number"
                    min="0"
                    value="0"
                >

            </div>

            <div class="versus">
                ×
            </div>

            <div class="time-input">

                <img
                src="${bolaoAtual.bandeiraB}"
                class="bandeira-img"
            >

                <div class="nome-time">
                    ${bolaoAtual.timeB}
                </div>

                <input
                    id="golsAdversario"
                    type="number"
                    min="0"
                    value="0"
                >

            </div>

        </div>

        <button
            id="enviarPalpiteRelampago"
            class="btn-relampago"
        >
            ⚽ Enviar Palpite
        </button>

        <div id="mensagemRelampago"></div>

    </div>

    <!-- ÚLTIMOS PALPITES -->
    <div class="regras-card painel-palpites-relampago">

        <h2>📋 Últimos Palpites</h2>

        <div
            id="listaPalpitesRelampago"
            class="lista-relampago"
        >

            Carregando...

        </div>

    </div>

    <!-- RESULTADO -->
    <div class="regras-card resultado-relampago">

        <h2>
            Palpite Relâmpago #${ultimoBolao.id}
        </h2>

        <div class="resultado-relampago-conteudo">

            <div class="placar-final">

                <div class="placar-final">

    <img
        src="${ultimoBolao.bandeiraA}"
        class="bandeira-placar"
    >

    <span>
        ${ultimoBolao.placar}
    </span>

    <img
        src="${ultimoBolao.bandeiraB}"
        class="bandeira-placar"
    >

</div>

            </div>

            <div class="jogo-final">

                ${ultimoBolao.timeA}
                x
                ${ultimoBolao.timeB}

            </div>

            <div class="sem-vencedor">

                ${ultimoBolao.mensagem}

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
       src="img/band_Brasil.png"
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

`;
}
