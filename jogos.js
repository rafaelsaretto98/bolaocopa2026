import {
    carregarJogos
}
from './jogos-firebase.js';

async function iniciar(){

    const jogos =
        await carregarJogos();

    jogos.sort((a, b) => {

        const dataA =
            new Date(`${a.data}T${a.horario}`);

        const dataB =
            new Date(`${b.data}T${b.horario}`);

        return dataA - dataB;

    });

    let dataAtual = '';

    const lista =
        document.getElementById(
            'listaJogos'
        );

    lista.innerHTML = '';

    jogos.forEach(jogo => {

        if(dataAtual !== jogo.data){

            dataAtual = jogo.data;

            const tituloData =
                document.createElement('div');

            tituloData.className =
                'header-card';

            tituloData.style.marginTop =
                '20px';

            tituloData.innerHTML = `
                <h2>
                    📅 ${formatarData(jogo.data)}
                </h2>
            `;

            lista.appendChild(
                tituloData
            );

        }

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
                🕒 ${jogo.horario}
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

function formatarData(data){

    const partes =
        data.split('-');

    return `${partes[2]}/${partes[1]}/${partes[0]}`;

}

iniciar();
