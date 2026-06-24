function bandeira(nome){

    if(!nome){
        return "img/band_placeholder.png";
    }

    return `img/band_${nome}.png`;

}

function criarCardJogo(jogo){

    const card =
        document.createElement("div");

    card.className =
        "jogo-card";

    card.innerHTML = `

<div class="time-linha">

    <div class="nome-time">

        <img
            class="bandeira-mata"
            src="${bandeira(jogo.timeA?.time)}"
            onerror="this.src='img/band_placeholder.png'"
        >

        <span>
            ${jogo.timeA?.time ?? "A definir"}
        </span>

    </div>

    <div class="gols">

        ${jogo.golsA ?? "-"}

    </div>

</div>

<div class="time-linha">

    <div class="nome-time">

        <img
            class="bandeira-mata"
            src="${bandeira(jogo.timeB?.time)}"
            onerror="this.src='img/band_placeholder.png'"
        >

        <span>
            ${jogo.timeB?.time ?? "A definir"}
        </span>

    </div>

    <div class="gols">

        ${jogo.golsB ?? "-"}

    </div>

</div>

`;

   const match =
    document.createElement("div");

        match.className = "match";
        
        match.appendChild(card);
        
        return match;

}

function desenharColuna(id, jogos){

    const coluna =
        document.getElementById(id);

    coluna.innerHTML = "";

    jogos.forEach(jogo=>{

        coluna.appendChild(
            criarCardJogo(jogo)
        );

    });

}

export function desenharBracket(

    jogos16,

    jogosOitavas,

    jogosQuartas,

    jogosSemi,

    jogoFinal

){

    const container =
        document.getElementById(
            "mataMata"
        );

    container.innerHTML = `

<div class="bracket">

    <div class="coluna">

        <h2>16 Avos</h2>

        <div id="col16E"></div>

    </div>

    <div class="coluna">

        <h2>Oitavas</h2>

        <div id="col8E"></div>

    </div>

    <div class="coluna">

        <h2>Quartas</h2>

        <div id="col4E"></div>

    </div>

    <div class="coluna">

        <h2>Semifinal</h2>

        <div id="col2E"></div>

    </div>

    <div class="coluna coluna-final">

        <h2>🏆 Final</h2>

        <div id="colFinal"></div>

    </div>

    <div class="coluna">

        <h2>Semifinal</h2>

        <div id="col2D"></div>

    </div>

    <div class="coluna">

        <h2>Quartas</h2>

        <div id="col4D"></div>

    </div>

    <div class="coluna">

        <h2>Oitavas</h2>

        <div id="col8D"></div>

    </div>

    <div class="coluna">

        <h2>16 Avos</h2>

        <div id="col16D"></div>

    </div>

</div>

`;

    desenharColuna(
        "col16E",
        jogos16.slice(0,8)
    );

    desenharColuna(
        "col16D",
        jogos16.slice(8)
    );

    desenharColuna(
        "col8E",
        jogosOitavas.slice(0,4)
    );

    desenharColuna(
        "col8D",
        jogosOitavas.slice(4)
    );

    desenharColuna(
        "col4E",
        jogosQuartas.slice(0,2)
    );

    desenharColuna(
        "col4D",
        jogosQuartas.slice(2)
    );

    desenharColuna(
        "col2E",
        [jogosSemi[0]]
    );

    desenharColuna(
        "col2D",
        [jogosSemi[1]]
    );

    desenharColuna(
        "colFinal",
        [jogoFinal]
    );

}
