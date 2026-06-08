import {
    carregarJogos,
    adicionarJogo,
    excluirJogo
}
from './jogos-firebase.js';


async function iniciar(){

    const jogos =
        await carregarJogos();

    const lista =
        document.getElementById(
            'listaJogos'
        );

    lista.innerHTML = '';

    jogos.forEach(jogo => {

    const div =
        document.createElement('div');

    div.className =
        'regras-card';

    div.innerHTML = `
        <h3>
            ${jogo.timeA}
            x
            ${jogo.timeB}
        </h3>

        <p>
            Grupo ${jogo.grupo}
        </p>

        <p>
            ${jogo.data}
            -
            ${jogo.horario}
        </p>

        <p>
            ${jogo.estadio}
        </p>

        <br>

        <button
            onclick="excluirJogoTela('${jogo.id}')"
            style="
                background:#dc2626;
                color:white;
                border:none;
                padding:8px 12px;
                border-radius:6px;
                cursor:pointer;
            "
        >
            🗑 Excluir
        </button>
    `;

    lista.appendChild(div);

});

document
.getElementById('salvarJogo')
.addEventListener('click', async () => {

    const jogo = {

        grupo:
            document.getElementById('grupo').value.trim(),

        rodada:
            document.getElementById('rodada').value.trim(),

        data:
            document.getElementById('data').value,

        horario:
            document.getElementById('horario').value,

        cidade:
            document.getElementById('cidade').value.trim(),

        estadio:
            document.getElementById('estadio').value.trim(),

        timeA:
            document.getElementById('timeA').value.trim(),

        timeB:
            document.getElementById('timeB').value.trim(),

        golsA: null,

        golsB: null,

        encerrado: false
    };

    if(
        !jogo.grupo ||
        !jogo.data ||
        !jogo.horario ||
        !jogo.timeA ||
        !jogo.timeB
    ){
        alert(
            'Preencha os campos obrigatórios.'
        );
        return;
    }

    try {

        await adicionarJogo(jogo);

        alert(
            '✅ Jogo cadastrado com sucesso!'
        );

        location.reload();

    } catch(erro){

        console.error(erro);

        alert(
            'Erro ao salvar jogo.'
        );

    }

});

window.excluirJogoTela = async function(id){

    if(
        !confirm(
            'Deseja excluir este jogo?'
        )
    ){
        return;
    }

    try {

        await excluirJogo(id);

        alert(
            'Jogo excluído.'
        );

        location.reload();

    } catch(erro){

        console.error(erro);

        alert(
            'Erro ao excluir jogo.'
        );

    }

};

iniciar();
