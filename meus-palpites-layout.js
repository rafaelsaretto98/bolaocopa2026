import {
    jogoAberto
}
from "./palpites-utils.js";

export function montarDashboard(participante){

    document.getElementById(

        "dashboardParticipante"

    ).innerHTML = `

<h2>

👤 ${participante.nome}

</h2>

<div class="dashboard-pontos">

    <div>

        <strong>🏆 Grupo</strong>

        <br>

        ${participante.pontosGrupo ?? 0}

    </div>

    <div>

        <strong>⚽ Mata-Mata</strong>

        <br>

        ${participante.pontosMataMata ?? 0}

    </div>

    <div>

        <strong>⭐ Total</strong>

        <br>

        ${participante.total ?? 0}

    </div>

</div>

`;

}
export function desenharJogos(

    jogos,

    palpites = {}

){

    const lista =
        document.getElementById(
            "listaJogos"
        );

    lista.innerHTML = "";

    jogos.forEach(jogo=>{

        lista.appendChild(

            criarCardJogo(

                jogo,

                palpites[jogo.id]

            )

        );

    });

}

function criarCardJogo(

    jogo,

    palpite

){

    const card =
        document.createElement(
            "div"
        );

    card.className =
        "regras-card";

    card.dataset.jogo =
        jogo.id;

    const aberto =
    jogoAberto(jogo);

    card.innerHTML = `

<h3 class="titulo-confronto">

${jogo.timeA?.time ?? "A definir"}

<span>

×

</span>

${jogo.timeB?.time ?? "A definir"}

</h3>

<div

class="time-card"

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

`;

    const opcoes =
        card.querySelectorAll(
            ".time-card"
        );

    if(palpite){

        opcoes.forEach(opcao=>{

            if(

                opcao.dataset.time === palpite

            ){

                opcao.classList.add(
                    "selecionado"
                );

                card.dataset.escolhido =
                    palpite;

            }

        });

    }

    opcoes.forEach(opcao=>{

    opcao.addEventListener(

        "click",

        ()=>{

            if(!aberto){

                return;

            }

            opcoes.forEach(o=>

                o.classList.remove(
                    "selecionado"
                )

            );

            opcao.classList.add(
                "selecionado"
            );

            card.dataset.escolhido =
                opcao.dataset.time;

        }

    );

});

    return card;

}
