import {
    carregarParticipantes
}
from './participantes-firebase.js';
 
async function carregarPremiacao(){

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
        'valorPremio'
    ).textContent =
        premio.toLocaleString(
            'pt-BR',
            {
                style:'currency',
                currency:'BRL'
            }
        );

}

carregarPremiacao();
