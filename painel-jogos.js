import {
    carregarJogos,
    adicionarJogo
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
        `;

        lista.appendChild(div);

    });

}

document
.getElementById('salvarJogo')
.addEventListener('click', async () => {

    const jogo = {

        grupo:
            document.getElementById('grupo').value,

        rodada:
            document.getElementById('rodada').value,

        data:
            document.getElementById('data').value,

        horario:
            document.getElementById('horario').value,

        cidade:
            document.getElementById('cidade').value,

        estadio:
            document.getElementById('estadio').value,

        timeA:
            document.getElementById('timeA').value,

        timeB:
            document.getElementById('timeB').value,

        golsA: null,

        golsB: null,

        encerrado: false
    };

    try {

        await adicionarJogo(jogo);

        alert(
            '✅ Jogo cadastrado com sucesso!'
        );

        location.reload();

    } catch (erro) {

        console.error(erro);

        alert(
            'Erro ao salvar jogo.'
        );
    }

});

iniciar();
