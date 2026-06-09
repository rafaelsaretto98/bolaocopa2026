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

        const card =
            document.createElement('div');

        card.className =
            'regras-card';

        card.innerHTML = `
            <h3>
                ${jogo.timeA}
                x
                ${jogo.timeB}
            </h3>

            <p>
                Grupo ${jogo.grupo}
            </p>

            <p>
                📅 ${jogo.data}
                às
                ${jogo.horario}
            </p>

            <p>
                🏟 ${jogo.estadio}
            </p>

            ${
                jogo.encerrado
                ?
                `
                <h2>
                    ${jogo.golsA}
                    x
                    ${jogo.golsB}
                </h2>
                `
                :
                `
                <strong>
                    Aguardando resultado
                </strong>
                `
            }
        `;

        lista.appendChild(card);

    });

}

iniciar();
