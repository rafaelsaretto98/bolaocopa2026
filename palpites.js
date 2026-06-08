import {
    carregarParticipantesRanking
}
from './ranking-firebase.js';

let participantes = [];

async function iniciar(){

    participantes =
        await carregarParticipantesRanking();

    const select =
        document.getElementById(
            'participanteSelect'
        );

    select.innerHTML =
        '<option value="">Selecione um participante</option>';

    participantes.forEach(p => {

        const option =
            document.createElement('option');

        option.value = p.protocolo;

        option.textContent =
            p.nome;

        select.appendChild(option);

    });

}

document
.getElementById(
    'participanteSelect'
)
.addEventListener(
    'change',
    mostrarPalpite
);

function mostrarPalpite(){

    const protocolo =
        document.getElementById(
            'participanteSelect'
        ).value;

    const participante =
        participantes.find(
            p => p.protocolo === protocolo
        );

    if(!participante){
        return;
    }

    const container =
        document.getElementById(
            'conteudoPalpite'
        );

    container.innerHTML = '';

    Object.keys(
        participante.palpites
    )
    .sort()
    .forEach(grupo => {

        const card =
            document.createElement('div');

        card.className =
            'regras-card';

        card.innerHTML = `
            <h3>
                Grupo ${grupo}
            </h3>

            <p>
                🥇 ${participante.palpites[grupo]['1º']}
            </p>

            <p>
                🥈 ${participante.palpites[grupo]['2º']}
            </p>

            <p>
                🥉 ${participante.palpites[grupo]['3º']}
            </p>

            <p>
                4º ${participante.palpites[grupo]['4º']}
            </p>
        `;

        container.appendChild(card);

    });

}

iniciar();
