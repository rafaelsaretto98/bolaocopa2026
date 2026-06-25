async function iniciar(){

    const nome =
        localStorage.getItem(
            "nomeParticipante"
        );

    if(!nome){

        alert(
            "Identifique-se primeiro."
        );

        location.href =
            "index.html";

        return;

    }

    const participante = {

        nome,

        pontosGrupo:0,

        pontosMataMata:0,

        total:0

    };

    montarDashboard(
        participante
    );

    const config =
        await carregarConfiguracoes();

    const jogos =
        await carregarJogosPorFase(
            config.faseAtual
        );

    desenharJogos(
        jogos
    );

}

function montarDashboard(participante){

    document.getElementById(

        "dashboardParticipante"

    ).innerHTML = `

<h2>

👤 ${participante.nome}

</h2>

<div class="dashboard-pontos">

    <div>

        <strong>

            🏆 Grupo

        </strong>

        <br>

        ${participante.pontosGrupo}

    </div>

    <div>

        <strong>

            ⚽ Mata-Mata

        </strong>

        <br>

        ${participante.pontosMataMata}

    </div>

    <div>

        <strong>

            ⭐ Total

        </strong>

        <br>

        ${participante.total}

    </div>

</div>

`;

}

function desenharJogos(jogos){

    const lista =
        document.getElementById(
            "listaJogos"
        );

    lista.innerHTML = "";

    jogos.forEach(jogo=>{

        lista.appendChild(

            criarCardJogo(jogo)

        );

    });

}

function criarCardJogo(jogo){

    const card =
        document.createElement(
            "div"
        );

    card.className =
        "regras-card";

    card.innerHTML = `

<h3 style="text-align:center;">

${jogo.timeA?.time}

<span style="
color:#9ca3af;
font-size:14px;
padding:0 10px;
">
VS
</span>

${jogo.timeB?.time}

</h3>

<div class="escolha-time">

<label>

<input
    type="radio"
    name="${jogo.id}"
    value="${jogo.timeA?.time}"
>

<img
    class="bandeira-mata"
    src="img/band_${jogo.timeA?.time}.png"
    onerror="this.src='img/band_placeholder.png'"
>

<span>

${jogo.timeA?.time}

</span>

</label>

</div>

<div class="escolha-time">

<label>

<input
    type="radio"
    name="${jogo.id}"
    value="${jogo.timeB?.time}"
>

<img
    class="bandeira-mata"
    src="img/band_${jogo.timeB?.time}.png"
    onerror="this.src='img/band_placeholder.png'"
>

<span>

${jogo.timeB?.time}

</span>

</label>

</div>

<div
    style="
        text-align:center;
        margin-top:20px;
    "
>

<button
    class="btn-relampago"
>

💾 Salvar Palpite

</button>

</div>

`;

    return card;

}
