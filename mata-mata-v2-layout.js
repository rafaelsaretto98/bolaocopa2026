export function desenharChaveamento(jogos){

    console.log(jogos);

    const container =
        document.getElementById(
            "chaveamento"
        );

    container.innerHTML = "";

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
