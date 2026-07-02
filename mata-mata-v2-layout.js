export function desenharChaveamento(jogos){

    const esquerdo =
    document.getElementById("ladoEsquerdo");

    const direito =
        document.getElementById("ladoDireito");
    
    const centro =
        document.getElementById("colunaFinal");

    esquerdo.innerHTML = "";
    direito.innerHTML = "";
    centro.innerHTML = "";

    esquerdo.appendChild(
    criarColuna(
        "16 Avos",
        "16-avos",
        jogos,
        1,
        8
    )
);

    esquerdo.appendChild(
        criarColuna(
            "Oitavas",
            "oitavas",
            jogos,
            1,
            4
        )
    );
    
    esquerdo.appendChild(
        criarColuna(
            "Quartas",
            "quartas",
            jogos,
            1,
            2
        )
    );
    
    esquerdo.appendChild(
        criarColuna(
            "Semifinal",
            "semifinal",
            jogos,
            1,
            1
        )
    );
    
    centro.appendChild(
        criarColuna(
            "Final",
            "final",
            jogos,
            1,
            1
        )
    );
    
    direito.appendChild(
        criarColuna(
            "Semifinal",
            "semifinal",
            jogos,
            2,
            2
        )
    );
    
    direito.appendChild(
        criarColuna(
            "Quartas",
            "quartas",
            jogos,
            3,
            4
        )
    );
    
    direito.appendChild(
        criarColuna(
            "Oitavas",
            "oitavas",
            jogos,
            5,
            8
        )
    );
    
    direito.appendChild(
        criarColuna(
            "16 Avos",
            "16-avos",
            jogos,
            9,
            16
        )
    );

}

function criarColuna(
    titulo,
    fase,
    jogos,
    inicio,
    fim
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
    .filter(j =>

        j.fase === fase &&
        j.ordem >= inicio &&
        j.ordem <= fim

    )
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
