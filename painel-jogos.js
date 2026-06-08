import {
    carregarJogos
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

iniciar();
