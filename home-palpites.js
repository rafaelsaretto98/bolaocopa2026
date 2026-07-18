import { carregarJogosMataMata } from "./mata-mata-firebase.js";
import { salvarPalpiteFinal } from "./palpites-finais-firebase.js";

export async function iniciarPalpitesFinais() {

    const container = document.getElementById("palpites-finais");

    if (!container) return;

    const jogos = await carregarJogosMataMata();

    const terceiro = jogos.find(j => j.id === "TERCEIRO-1");
    const final = jogos.find(j => j.id === "FINAL-1");

    container.innerHTML = `

        <div class="card-palpites-finais">

            <h2>🏆 Palpites dos Últimos Jogos</h2>

            <input
                id="nomePalpite"
                type="text"
                placeholder="Seu nome">

            ${criarJogo("terceiro", "🥉 Disputa de 3º Lugar", terceiro)}

            ${criarJogo("final", "🏆 Grande Final", final)}

            <button id="btnSalvarPalpite">
                Enviar Palpite
            </button>

        </div>

    `;

    document
        .getElementById("btnSalvarPalpite")
        .addEventListener("click", salvar);

}

function criarJogo(prefixo, titulo, jogo){

    if(!jogo){

        return `
            <p>${titulo}<br>Jogo ainda não definido.</p>
        `;

    }

    return `

        <div class="palpite-jogo">

            <h3>${titulo}</h3>

            <div class="linha-palpite">

                <span>${jogo.timeA}</span>

                <input
                    type="number"
                    min="0"
                    id="${prefixo}A">

                <strong>x</strong>

                <input
                    type="number"
                    min="0"
                    id="${prefixo}B">

                <span>${jogo.timeB}</span>

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

        terceiro: {

            golsA:
                Number(document.getElementById("terceiroA").value),

            golsB:
                Number(document.getElementById("terceiroB").value)

        },

        final: {

            golsA:
                Number(document.getElementById("finalA").value),

            golsB:
                Number(document.getElementById("finalB").value)

        },

        criadoEm: new Date()

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
