
const ultimosBoloes =
    [...boloesRelampago]
    .filter(b => b.encerrado)
    .reverse()
    .slice(0,3);

export function criarDashboard(){

    const dashboard =
        document.getElementById('dashboard');

    dashboard.innerHTML = `

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
