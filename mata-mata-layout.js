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

function criarColuna(jogos, classe){

    const coluna =
        document.createElement("div");

    coluna.className = classe;

    jogos.forEach(jogo=>{

        coluna.appendChild(
            criarCardJogo(jogo)
        );

    });

    return coluna;

}


function criarLado(

    jogos16,
    jogos8,
    jogos4,
    jogos2

){

    const lado =
        document.createElement("div");

    lado.className = "lado";

    lado.appendChild(

        criarColuna(
            jogos16,
            "coluna16"
        )

    );

    lado.appendChild(

        criarColuna(
            jogos8,
            "coluna8"
        )

    );

    lado.appendChild(

        criarColuna(
            jogos4,
            "coluna4"
        )

    );

    lado.appendChild(

        criarColuna(
            jogos2,
            "coluna2"
        )

    );

    return lado;

}


/*function criarRamo(

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

   const conector =
    document.createElement("div");

conector.className = "conector";

const cima =
    document.createElement("div");

cima.className = "linha-cima";

const vertical =
    document.createElement("div");

vertical.className = "linha-vertical";

const baixo =
    document.createElement("div");

baixo.className = "linha-baixo";

conector.appendChild(cima);
conector.appendChild(vertical);
conector.appendChild(baixo);

const oitavas =
    document.createElement("div");

oitavas.className = "oitavas";

oitavas.appendChild(
    criarCardJogo(jogoOitavas)
);

ramo.appendChild(jogos);

ramo.appendChild(conector);

ramo.appendChild(oitavas);

    return ramo;

}

function criarBloco16(

    jogo1,
    jogo2,
    jogo3,
    jogo4,

    oitavas1,
    oitavas2

){

    const bloco =
        document.createElement("div");

    bloco.className =
        "bloco16";

    bloco.appendChild(

        criarRamo(
            jogo1,
            jogo2,
            oitavas1
        )

    );

    bloco.appendChild(

        criarRamo(
            jogo3,
            jogo4,
            oitavas2
        )

    );

    return bloco;

}

function criarBlocoQuartas(

    blocoSuperior,
    blocoInferior,

    jogoQuartas

){

    const bloco =

        document.createElement("div");

    bloco.className =
        "blocoQuartas";


    const coluna =
        document.createElement("div");

    coluna.className =
        "colunaQuartas";


    coluna.appendChild(
        blocoSuperior
    );

    coluna.appendChild(
        blocoInferior
    );


    const conector =
    document.createElement("div");

    conector.className =
        "conectorQuartas";

    const cima =
        document.createElement("div");

    cima.className =
        "linha-cima-q";

    const vertical =
        document.createElement("div");

    vertical.className =
        "linha-vertical-q";

    const baixo =
        document.createElement("div");

    baixo.className =
        "linha-baixo-q";

    conector.appendChild(cima);
    conector.appendChild(vertical);
    conector.appendChild(baixo);


    const quartas =
        document.createElement("div");

    quartas.className =
        "quartas";

    quartas.appendChild(

        criarCardJogo(
            jogoQuartas
        )

    );

    bloco.appendChild(coluna);
    bloco.appendChild(conector);
    bloco.appendChild(quartas);

    return bloco;

}

function criarFase(

    blocoAnterior,

    jogoAtual

){

    const fase =
        document.createElement("div");

    fase.className = "fase";

    fase.appendChild(
        blocoAnterior
    );

    const conector =
        document.createElement("div");

    conector.className =
        "conectorFase";

    fase.appendChild(
        conector
    );

    const atual =
        document.createElement("div");

    atual.className =
        "faseAtual";

    atual.appendChild(
        criarCardJogo(jogoAtual)
    );

    fase.appendChild(
        atual
    );

    return fase;

}*/

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

    const ladoEsquerdo =

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

        );

    container.appendChild(
        ladoEsquerdo
    );

}
