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

<h3 class="titulo-confronto">

${jogo.timeA?.time}

<span>×</span>

${jogo.timeB?.time}

</h3>

<div
    class="time-card"
    data-jogo="${jogo.id}"
    data-time="${jogo.timeA?.time}"
>

    <img
        class="bandeira-mata"
        src="img/band_${jogo.timeA?.time}.png"
        onerror="this.src='img/band_placeholder.png'"
    >

    <span>

        ${jogo.timeA?.time}

    </span>

</div>

<div class="vs-card">

VS

</div>

<div
    class="time-card"
    data-jogo="${jogo.id}"
    data-time="${jogo.timeB?.time}"
>

    <img
        class="bandeira-mata"
        src="img/band_${jogo.timeB?.time}.png"
        onerror="this.src='img/band_placeholder.png'"
    >

    <span>

        ${jogo.timeB?.time}

    </span>

</div>

<br>

<div style="text-align:center;">

<button
    class="btn-relampago"

>

💾 Salvar Palpite

</button>

</div>

`;

const opcoes =
    card.querySelectorAll(
        ".time-card"
    );

opcoes.forEach(opcao=>{

    opcao.addEventListener(

        "click",

        ()=>{

            opcoes.forEach(o=>

                o.classList.remove(
                    "selecionado"
                )

            );

            opcao.classList.add(
                "selecionado"
            );

        }

    );

});

    return card;

}
