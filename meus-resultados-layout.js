export function desenharHistoricoGrupos(resumo){

    const container =
        document.getElementById(
            "historicoGrupos"
        );

    container.innerHTML = "";

    resumo.forEach(grupo=>{

        container.appendChild(

            criarCardGrupo(grupo)

        );

    });

}

function criarCardGrupo(grupo){

    const card =
        document.createElement("div");

    card.className =
        "regras-card";

    card.innerHTML = `

<h2>

🏆 Grupo ${grupo.grupo}

</h2>

`;

    const posicoes = [

        "🥇",

        "🥈",

        "🥉",

        "4️⃣"

    ];

    grupo.linhas.forEach((linha,index)=>{

        const item =
            document.createElement("div");

        item.className =

            linha.acertou

            ?

            "linha-grupo acertou"

            :

            "linha-grupo errou";

        item.innerHTML = `

<div class="grupo-esquerda">

    <span>

        ${posicoes[index]}

    </span>

    <img

        class="bandeira-mata"

        src="img/band_${linha.time}.png"

        onerror="this.src='img/band_placeholder.png'"

    >

    <span>

        ${linha.time}

    </span>

</div>

<div class="grupo-direita">

    ${linha.acertou ? "✅" : "❌"}

</div>

`;

        card.appendChild(item);

    });

    const estrelas =

        "⭐".repeat(grupo.pontos) +

        "☆".repeat(4 - grupo.pontos);

    const rodape =
        document.createElement("div");

    rodape.className =
        "resultado-grupo";

    rodape.innerHTML = `

<div class="estrelas-grupo">

${estrelas}

</div>

<div>

<strong>

${grupo.pontos} de 4 acertos

</strong>

</div>

`;

    card.appendChild(
        rodape
    );

    return card;

}
