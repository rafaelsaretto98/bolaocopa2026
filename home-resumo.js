import {
    carregarParticipantes
}
from './participantes-firebase.js';

export async function carregarResumoBolao(){

    const participantes =
        await carregarParticipantes();

    const total =
        participantes.length;

    const premio =
        total * 20;

    document.getElementById(
        'totalParticipantes'
    ).textContent = total;

    document.getElementById(
        'premiacao'
    ).textContent =
        premio.toLocaleString(
            'pt-BR',
            {
                style:'currency',
                currency:'BRL'
            }
        );
}
