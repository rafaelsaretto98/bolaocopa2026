import { salvarPalpiteFinal } from "./palpites-finais-firebase.js";

export async function iniciarPalpitesFinais() {

    const container = document.getElementById("palpites-finais");

    if (!container) return;

  container.innerHTML = `

<div class="card-palpites-finais">

    <h2>🏆 Palpites da Grande Decisão</h2>

    <input
        id="nomePalpite"
        type="text"
        placeholder="Seu nome">

    <div class="jogos-finais">

        ${criarJogo(
            "terceiro",
            "🥉 Disputa de 3º Lugar",
            "França",
            "Inglaterra",
            "img/band_Franca.png",
            "img/band_Inglaterra.png"
        )}

        ${criarJogo(
            "final",
            "🏆 Grande Final",
            "Espanha",
            "Argentina",
            "img/band_Espanha.png",
            "img/band_Argentina.png"
        )}

    </div>

    <button id="btnSalvarPalpite">
        🚀 Enviar Palpite
    </button>

</div>

`;

    document
        .getElementById("btnSalvarPalpite")
        .addEventListener("click", salvar);

}

function criarJogo(prefixo, titulo, timeA, timeB, bandeiraA, bandeiraB) {

    return `

    <div class="card-jogo-final">

        <h3>${titulo}</h3>

        <div class="linha-time">
            <img src="${bandeiraA}">
            <span>${timeA}</span>
        </div>

        <div class="placar-final">

            <input id="${prefixo}A" type="number" min="0">

            <strong>X</strong>

            <input id="${prefixo}B" type="number" min="0">

        </div>

        <div class="linha-time">
            <img src="${bandeiraB}">
            <span>${timeB}</span>
        </div>

    </div>

    `;
}

async function salvar(){

    const nome =
        document.getElementById("nomePalpite").value.trim();

    if(!nome){

        alert("Informe seu nome.");

        return;

    }

    const palpite = {

        nome,

        terceiro:{

            golsA:Number(document.getElementById("terceiroA").value),

            golsB:Number(document.getElementById("terceiroB").value)

        },

        final:{

            golsA:Number(document.getElementById("finalA").value),

            golsB:Number(document.getElementById("finalB").value)

        },

        criadoEm:new Date()

    };

    try{

        await salvarPalpiteFinal(palpite);

        alert("✅ Palpite enviado!");

        document.getElementById("nomePalpite").value = "";
        document.getElementById("terceiroA").value = "";
        document.getElementById("terceiroB").value = "";
        document.getElementById("finalA").value = "";
        document.getElementById("finalB").value = "";

    }
    catch(erro){

        console.error(erro);

        alert("Erro ao enviar o palpite.");

    }

}
