import {
    BRACKET
}
from "./bracket-config.js";
 
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

function ordenarJogos(

    jogos,

    ordem

){

    return ordem

        .map(id=>

            jogos.find(

                jogo=>jogo.id===id

            )

        )

        .filter(Boolean);

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

function criarBloco16(

    jogo1,

    jogo2,

    oitavas

){

    const bloco =
        document.createElement("div");

    bloco.className = "bloco16";

    bloco.appendChild(
        criarCardJogo(jogo1)
    );

    bloco.appendChild(
        criarCardJogo(jogo2)
    );

    const conector =
        document.createElement("div");

    conector.className =
        "conector16";

    bloco.appendChild(conector);

    bloco.appendChild(
        criarCardJogo(oitavas)
    );

    return bloco;

}

function criarLado(

    jogos16,

    jogosOitavas,

    jogosQuartas,

    jogosSemi

){

    const lado =
        document.createElement("div");

    lado.className = "lado-arvore";

    for(let i=0;i<4;i++){

        lado.appendChild(

            criarBloco16(

                jogos16[i*2],

                jogos16[i*2+1],

                jogosOitavas[i]

            )

        );

    }

    return lado;

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

    <div id="ladoEsquerdo" class="lado"></div>

    <div id="centroBracket"></div>

    <div id="ladoDireito" class="lado"></div>

</div>

`;

    const ladoEsquerdo =
    document.getElementById(
        "ladoEsquerdo"
    );

    const centro =
        document.getElementById(
            "centroBracket"
        );
    
    const ladoDireito =
        document.getElementById(
            "ladoDireito"
        );

    ladoEsquerdo.appendChild(

    criarLado(

        ordenarJogos(
            jogos16,
            BRACKET.ladoEsquerdo.dezesseis
        ),

        ordenarJogos(
            jogosOitavas,
            BRACKET.ladoEsquerdo.oitavas
        ),

        ordenarJogos(
            jogosQuartas,
            BRACKET.ladoEsquerdo.quartas
        ),

        ordenarJogos(
            jogosSemi,
            BRACKET.ladoEsquerdo.semi
        )

    )

);

}
