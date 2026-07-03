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

function criarRamo(

    jogo1,
    jogo2,
    jogoOitavas

){

    const ramo =
        document.createElement("div");

    ramo.className = "ramo";

    const jogos =
        document.createElement("div");

    jogos.className = "jogos";

    jogos.appendChild(
        criarCardJogo(jogo1)
    );

    jogos.appendChild(
        criarCardJogo(jogo2)
    );

    ramo.appendChild(
        jogos
    );

    const conector =
        document.createElement("div");

    conector.className =
        "conector-horizontal";

    ramo.appendChild(
        conector
    );

    ramo.appendChild(
        criarCardJogo(jogoOitavas)
    );

    return ramo;

}

function criarArvore(

    jogo16A,
    jogo16B,
    jogo16C,
    jogo16D,

    oitavas1,
    oitavas2,

    quartas

){

    const arvore =
        document.createElement("div");

    arvore.className = "arvore";


    const ramoSuperior =

        criarRamo(

            jogo16A,
            jogo16B,
            oitavas1

        );


    const ramoInferior =

        criarRamo(

            jogo16C,
            jogo16D,
            oitavas2

        );


    const quartasDiv =
        document.createElement("div");

    quartasDiv.className =
        "quartas";

    quartasDiv.appendChild(

        criarCardJogo(quartas)

    );


    arvore.appendChild(ramoSuperior);

    arvore.appendChild(ramoInferior);

    arvore.appendChild(quartasDiv);

    return arvore;

}

export function desenharBracket(

    jogos16,
    jogosOitavas,
    jogosQuartas,
    jogosSemi,
    jogoFinal

){

    const container =
        document.getElementById("mataMata");

    container.innerHTML = "";

    const esquerda =
    document.createElement("div");

esquerda.className = "lado";

esquerda.appendChild(

    criarArvore(

        jogos16[0],
        jogos16[1],
        jogos16[2],
        jogos16[3],

        jogosOitavas[0],
        jogosOitavas[1],

        jogosQuartas[0]

    )

);

esquerda.appendChild(

    criarArvore(

        jogos16[4],
        jogos16[5],
        jogos16[6],
        jogos16[7],

        jogosOitavas[2],
        jogosOitavas[3],

        jogosQuartas[1]

    )

);

container.appendChild(esquerda);
}
