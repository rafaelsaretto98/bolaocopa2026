import {
    carregarRecados,
    adicionarRecado
}
from './recados-firebase.js';

async function carregarTela(){

    const recados =
        await carregarRecados();

    document.querySelector(
        '.header-card h1'
        ).textContent =
        `💬 Mural de Recados (${recados.length})`;

    recados.sort(
        (a,b) =>
            new Date(b.data) -
            new Date(a.data)
    );

    const lista =
        document.getElementById(
            'listaRecados'
        );

    lista.innerHTML = '';

    recados.forEach(recado => {

        const card =
            document.createElement('div');

        card.className =
            'regras-card';

card.innerHTML = `
    <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:10px;
    ">

        <strong>
            👤 ${recado.nome}
        </strong>

        <small
            style="
                color:#64748b;
            "
        >
            🕒 ${formatarData(recado.data)}
        </small>

    </div>

    <p style="
        margin:0;
        line-height:1.5;
    ">
        ${recado.texto}
    </p>
`;

        lista.appendChild(card);

    });

}

document
.getElementById('enviarRecado')
.onclick = async () => {

    const nome =
        document.getElementById(
            'nomeRecado'
        ).value.trim();

    const texto =
        document.getElementById(
            'textoRecado'
        ).value.trim();

    if(!nome || !texto){

        alert(
            'Preencha nome e mensagem.'
        );

        return;

    }

    await adicionarRecado({

        nome,
        texto,

        data:
            new Date()
            .toISOString()

    });

    document.getElementById(
        'textoRecado'
    ).value = '';

    carregarTela();

};

function formatarData(data){

    return new Date(data)
    .toLocaleString(
        'pt-BR'
    );

}

carregarTela();

<div class="regras-card">

    <h2>🧠 Quiz da Copa</h2>

    <div id="quizContainer">

        <p id="perguntaQuiz">
            Carregando pergunta...
        </p>

        <div id="opcoesQuiz"></div>

        <button id="responderQuiz">
            Responder
        </button>

        <div id="resultadoQuiz"></div>

    </div>

</div>

const perguntas = [

{
    pergunta:
        'Qual país venceu a Copa de 2002?',

    opcoes: [
        'Brasil',
        'Alemanha',
        'Argentina',
        'França'
    ],

    correta: 0
},

{
    pergunta:
        'Quem marcou os 2 gols da final de 2002?',

    opcoes: [
        'Ronaldinho',
        'Ronaldo',
        'Rivaldo',
        'Kaká'
    ],

    correta: 1
},

{
    pergunta:
        'Qual seleção tem mais títulos mundiais?',

    opcoes: [
        'Alemanha',
        'Argentina',
        'Brasil',
        'Itália'
    ],

    correta: 2
}

];
