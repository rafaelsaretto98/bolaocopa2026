import {
    salvarPalpiteAdmin
}
from "./palpites-mata-mata-firebase.js";

import {
    carregarJogosMataMata
}
from "./mata-mata-firebase.js";

import {

    criarNavbar

} from "./navbar.js";

import {
    carregarParticipantes,
    carregarParticipante
}
from "./participantes-firebase.js";

document.getElementById(

    "navbar"

).innerHTML =

    criarNavbar("");

async function iniciar(){

    const participantes =
        await carregarParticipantes();
        
    const jogos =

    await carregarJogosMataMata();

        console.log(jogos);

    const select =
        document.getElementById(
            "participante"
        );

    select.innerHTML =
        '<option value="">Selecione um participante</option>';

    participantes

        .sort((a,b)=>

            a.nome.localeCompare(b.nome)

        )

        .forEach(participante=>{

            const option =
                document.createElement("option");

            option.value =
                participante.nome;

            option.textContent =
                participante.nome;

            select.appendChild(option);

        });

        select.addEventListener(

    "change",

    async ()=>{

        const participante =

            await carregarParticipante(

                select.value

            );

        desenharJogos(

            jogos,

            participante

        );

    }

);

}

function desenharJogos(

    jogos,

    participante

){

    const palpites =
        participante?.palpitesMataMata || {};

    const lista =
        document.getElementById(
            "listaJogos"
        );

    lista.innerHTML = "";

    jogos.forEach(jogo=>{

        const nomeTimeA =
            jogo.timeA?.time || "A definir";

        const nomeTimeB =
            jogo.timeB?.time || "A definir";

        const escolhido =
            palpites[jogo.id];

        const card =
            document.createElement("div");

        card.className =
            "regras-card";

        card.innerHTML = `

<h3>

${nomeTimeA} x ${nomeTimeB}

</h3>

<button
class="btn-time"
data-jogo="${jogo.id}"
data-time="${nomeTimeA}"
>

${nomeTimeA}

</button>

<button
class="btn-time"
data-jogo="${jogo.id}"
data-time="${nomeTimeB}"
>

${nomeTimeB}

</button>

`;

        lista.appendChild(card);

        const botoes =
            card.querySelectorAll(".btn-time");

        botoes.forEach(botao=>{

            if(botao.dataset.time === escolhido){

                botao.style.background = "#16a34a";
                botao.style.color = "white";

            }

            botao.addEventListener(

                "click",

                async ()=>{

                    botoes.forEach(b=>{

                        b.style.background = "";
                        b.style.color = "";

                    });

                    botao.style.background = "#16a34a";
                    botao.style.color = "white";

                    try{

                        await salvarPalpiteAdmin(

                            participante.nome,

                            botao.dataset.jogo,

                            botao.dataset.time

                        );

                        alert("✅ Palpite salvo!");

                    }

                    catch(erro){

                        console.error(erro);

                        alert("Erro ao salvar.");

                    }

                }

            );

        });

    });

}

iniciar();
