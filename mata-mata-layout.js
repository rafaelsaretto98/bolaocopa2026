function bandeira(nome){

    if(!nome){
        return "img/band_placeholder.jpg";
    }

    if(bandeiras[nome]){
        return `img/${bandeiras[nome]}`;
    }

    const arquivo = nome
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replaceAll(" ", "_")
        .replaceAll("'", "");

    return `img/band_${arquivo}.png`;

}

const bandeiras = {
    
    "Alemanha": "band_Alemanha.png",
    "Argélia": "band_Argelia.png",
    "Argentina": "band_Argentina.png",
    "Austrália": "band_Australia.png",
    "Áustria": "band_Austria.png",
    "Bélgica": "band_Belgica.png",
    "Bósnia e Hezergovina": "band_Bosnia_e_Hezergovinia",
    "Brasil": "band_Brasil.png",
    "Cabo Verde": "band_Cabo_Verde.png",
    "Canadá": "band_Canada.png",
    "Chéquia": "band_Chequia.png",
    "Colômbia": "band_Colombia.png",
    "Coreia do Sul": "band_Coreia_do_Sul.png",
    "Egito": "band_Egito.png",
    "Equador": "band_Equador.png",
    "Escócia": "band_Escocia.png",
    "Espanha": "band_Espanha.png",
    "Estados Unidos": "band_Estados_Unidos.png",
    "França": "band_França.png",
    "Gana": "band_Gana.png",
    "Haiti": "band_Haiti.png",
    "Holanda": "band_Holanda.png",
    "Inglaterra": "band_Inglaterra.png",
    "Irã": "band_Ira.png",
    "Japão": "band_Japao.png",
    "Marrocos": "band_Marrocos.png",
    "México": "band_Mexico.png",
    "Noruega": "band_Noruega.png",
    "Paraguai": "band_Paraguai.png",
    "Portugal": "band_Portugal.png",
    "RD Congo": "band_RD_Congo.png",
    "Suécia": "band_Suecia.png",
    "Suíça": "band_Suica",
    "Uruguai": "band_Uruguai"

    
};



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

    jogos.forEach((jogo,index)=>{

        const wrapper =
            document.createElement("div");

        wrapper.className =
            "match-wrapper";

        wrapper.appendChild(
            criarCardJogo(jogo)
        );

        coluna.appendChild(
            wrapper
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
