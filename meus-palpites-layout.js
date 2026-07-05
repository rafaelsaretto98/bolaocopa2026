import {
    jogoAberto
}
from "./palpites-utils.js";
 
function bandeira(nome){

    if(!nome){
        return "img/band_placeholder.png";
    }

    if(bandeiras[nome]){
        return `img/${bandeiras[nome]}`;
    }

    const arquivo = nome
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g,"")
        .replaceAll(" ","_")
        .replaceAll("'","");

    return `img/band_${arquivo}.png`;

}

const bandeiras = {
    
     "África do Sul": "band_Africa_do_Sul.png",
    "Alemanha": "band_Alemanha.png",
    "Arábia Saudita": "band_Arabia_Saudita.png",
    "Argélia": "band_Argelia.png",
    "Argentina": "band_Argentina.png",
    "Austrália": "band_Australia.png",
    "Áustria": "band_Austria.png",
    "Bélgica": "band_Belgica.png",
    "Bósnia e Hezergovina": "band_Bosnia_e_Hezergovinia.png",
    "Brasil": "band_Brasil.png",
    "Cabo Verde": "band_Cabo_Verde.png",
    "Canadá": "band_Canada.png",
    "Chéquia": "band_Chequia.png",
    "Colômbia": "band_Colombia.png",
    "Coreia do Sul": "band_Coreia_do_Sul.png",
    "Costa do Marfim": "band_Costa_do_Marfim.png",
    "Croácia": "band_Croacia.png",
    "Curaçao": "band_Curacao.png",
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
    "Iraque": "band_Iraque.png",
    "Japão": "band_Japao.png",
    "Jordânia": "band_Jordania.png",
    "Marrocos": "band_Marrocos.png",
    "México": "band_Mexico.png",
    "Noruega": "band_Noruega.png",
    "Nova Zelândia": "band_Nova_Zelandia.png",
    "Panamá": "band_Panama.png",
    "Paraguai": "band_Paraguai.png",
    "Portugal": "band_Portugal.png",
    "RD Congo": "band_RD_Congo.png",
    "Senegal": "band_Senegal.png",
    "Suécia": "band_Suecia.png",
    "Suíça": "band_Suica.png",
    "Tunísia": "band_Tunisia.png",
    "Turquia": "band_Turquia.png",
    "Uruguai": "band_Uruguai.png",
    "Uzbequistão": "band_Uzbequistao.png"

    
};

export function montarDashboard(participante){

    document.getElementById(

        "dashboardParticipante"

    ).innerHTML = `

<h2>👤 ${participante.nome}</h2>

<div class="dashboard-pontos">

    <div>
        <strong>🏆 Grupo</strong>
        <br>
        ${participante.pontosGrupo ?? 0}
    </div>

    <div>

        <strong>⚽ Mata-Mata</strong>

        <br>

        ${participante.pontosMataMata ?? 0}

    </div>

    <div>

        <strong>⭐ Total</strong>

        <br>

        ${participante.total ?? 0}

    </div>

</div>

`;

}
export function desenharJogos(

    jogos,
    palpites = {}

){

    const lista =
        document.getElementById(
            "listaJogos"
        );

    lista.innerHTML = "";

    jogos.forEach(jogo=>{

        lista.appendChild(

            criarCardJogo(

                jogo,
                palpites[jogo.id]
            )
        );
    });
}

function criarCardJogo(

    jogo,
    palpite

){

    const card =
        document.createElement(
            "div"
        );

    card.className =
        "regras-card";

    card.dataset.jogo =
        jogo.id;

    const aberto =
    jogoAberto(jogo);

    card.innerHTML = `

<h3 class="titulo-confronto">

${jogo.timeA?.time ?? "A definir"}

<span>

×

</span>

${jogo.timeB?.time ?? "A definir"}

</h3>

<div

class="time-card"

data-time="${jogo.timeA?.time}"

>

<img

class="bandeira-mata"

src="${bandeira(jogo.timeA?.time)}"

onerror="this.src='img/band_placeholder.png'"

>

<span>

${jogo.timeA?.time}

</span>

</div>

<div class="vs-card">

VS

</div>

<div

class="time-card"

data-time="${jogo.timeB?.time}"

>

<img

class="bandeira-mata"

src="${bandeira(jogo.timeB?.time)}"

onerror="this.src='img/band_placeholder.png'"

>

<span>

${jogo.timeB?.time}

</span>

</div>

`;

    const opcoes =
        card.querySelectorAll(
            ".time-card"
        );

    if(palpite){

        opcoes.forEach(opcao=>{

            if(

                opcao.dataset.time === palpite

            ){

                if(!jogo.encerrado){

        opcao.classList.add("pendente");

    }else{

        const vencedor =

            jogo.vencedor?.time ||
            jogo.vencedor;

        if(vencedor === palpite){

            opcao.classList.add("acertou");

        }else{

            opcao.classList.add("errou");

        }

    }

                card.dataset.escolhido =
                    palpite;

            }

        });

    }

opcoes.forEach(opcao=>{

    opcao.addEventListener("click", ()=>{

        console.log("Clique", aberto, jogo);

        if(!aberto){
            return;
        }

        opcoes.forEach(o=>{

            o.classList.remove(
                "selecionado",
                "acertou",
                "errou",
                "pendente"
            );

        });

        opcao.classList.add("pendente");

        card.dataset.escolhido =
            opcao.dataset.time;

    });

});

return card;

}
