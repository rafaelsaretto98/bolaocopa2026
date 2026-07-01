export function desenharChaveamento(jogos){

    console.log(jogos);

    const container =
        document.getElementById(
            "chaveamento"
        );

    container.innerHTML = "";

        const jogos16 =

        jogos
            .filter(j => j.fase === "16-avos")
            .sort((a,b)=>a.ordem-b.ordem);

            const coluna16 =
        document.createElement("div");

    coluna16.className =
        "coluna-fase";

    coluna16.innerHTML = `

            <h2 class="titulo-fase">
            
            16 Avos
            
            </h2>
            
            `;
        jogos16.forEach(jogo=>{

        coluna16.appendChild(

            criarCardJogo(jogo)

        );

    });

        container.appendChild(
        coluna16
    );

    

    const fases = [

        "16 Avos",

        "Oitavas",

        "Quartas",

        "Semifinal",

        "Final",

        "3º Lugar"

    ];

    fases.forEach(fase=>{

        const coluna =
            document.createElement("div");

        coluna.className =
            "coluna-fase";

        coluna.innerHTML = `

<h2 class="titulo-fase">

${fase}

</h2>

`;

        container.appendChild(
            coluna
        );

    });

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
