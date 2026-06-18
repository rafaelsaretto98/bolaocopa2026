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

   <div class="regras-card placar-relampago-card">

   <h2>
       🔥 Palpite Relâmpago
   </h2>

   <p>
        ${bolaoAtual.timeA} x ${bolaoAtual.timeB}
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
      
       ${bolaoAtual.textoData}
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
    align-items:center;
    justify-content:center;
    gap:15px;
    margin-bottom:18px;
">

    <div style="text-align:center;">

        ${bolaoAtual.bandeiraA}

        <br>

        <input
            id="golsBrasil"
            type="number"
            min="0"
            value="0"
            style="
                width:70px;
                padding:10px;
                text-align:center;
                font-size:20px;
            "
        >

    </div>

    <div style="
        font-size:28px;
        font-weight:900;
    ">
        ×
    </div>

    <div style="text-align:center;">

       ${bolaoAtual.bandeiraB}

        <br>

        <input
            id="golsAdversario"
            type="number"
            min="0"
            value="0"
            style="
                width:70px;
                padding:10px;
                text-align:center;
                font-size:20px;
            "
        >

    </div>

</div>

   

           <button
               id="enviarPalpiteRelampago"
               class="btn-relampago"
           >
               ⚽ Enviar Palpite
           </button>

   <div id="mensagemRelampago"style="margin-top:10px;font-weight:700;"></div>

</div>

   <div class="regras-card painel-palpites-relampago">

       <h2>
           🏆 Bolão #1 Encerrado
       </h2>

      <div class="resultado-relampago-conteudo">

    <div style="
        text-align:center;
        padding:15px;
    ">

        <div style="
            font-size:32px;
            font-weight:900;
            color:#1e3a8a;
        ">
            ${ultimoBolao.bandeiraA}
            ${ultimoBolao.placar}
            ${ultimoBolao.bandeiraB}
        </div>

        <div style="
            margin-top:10px;
            font-size:18px;
            font-weight:700;
        ">
            ${ultimoBolao.timeA} x ${ultimoBolao.timeB}
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
            ${ultimoBolao.mensagem}
        </div>

        <div style="
            margin-top:18px;
            padding-top:15px;
            border-top:1px solid #e5e7eb;
            color:#16a34a;
            font-weight:700;
        ">
            🔥 Já estão abertos os palpites para
                    ${bolaoAtual.timeA} x ${bolaoAtual.timeB}!
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

`;
}
