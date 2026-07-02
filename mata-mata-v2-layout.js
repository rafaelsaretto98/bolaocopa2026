export function desenharChaveamento(jogos){

    const container =
        document.getElementById(
            "chaveamento"
        );

    container.innerHTML = "";

    container.appendChild(
        criarColuna(
            "16 Avos",
            "16-avos",
            jogos
        )
    );

    container.appendChild(
        criarColuna(
            "Oitavas",
            "oitavas",
            jogos
        )
    );

    container.appendChild(
        criarColuna(
            "Quartas",
            "quartas",
            jogos
        )
    );

    container.appendChild(
        criarColuna(
            "Semifinal",
            "semifinal",
            jogos
        )
    );

    container.appendChild(
        criarColuna(
            "Final",
            "final",
            jogos
        )
    );

}

function criarColuna(
    titulo,
    fase,
    jogos
){

    const coluna =
        document.createElement("div");

    coluna.className =
        "coluna-fase";

    coluna.innerHTML = `
        <h2 class="titulo-fase">
            ${titulo}
        </h2>
    `;

    jogos
        .filter(j => j.fase === fase)
        .sort((a,b)=>a.ordem-b.ordem)
        .forEach(jogo=>{

            coluna.appendChild(
                criarCardJogo(jogo)
            );

        });

    return coluna;

}

function criarCardJogo(jogo){

    const card =
        document.createElement("div");

    card.className =
        "card-jogo";

    const timeA =
        jogo.timeA?.time || "A definir";

    const timeB =
        jogo.timeB?.time || "A definir";

    card.innerHTML = `

        <div class="linha-time">

            <img
                class="bandeira-mini"
                src="img/band_${timeA}.png"
                onerror="this.src='img/band_placeholder.png'"
            >

            <span>${timeA}</span>

        </div>

        <div class="linha-time">

            <img
                class="bandeira-mini"
                src="img/band_${timeB}.png"
                onerror="this.src='img/band_placeholder.png'"
            >

            <span>${timeB}</span>

        </div>

    `;

    return card;

}
