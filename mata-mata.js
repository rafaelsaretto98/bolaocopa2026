import {
    gerarOitavas
}
from './mata-mata-utils.js';


const jogos =
    gerarOitavas();

const container =
    document.getElementById(
        'mataMata'
    );

jogos.forEach(jogo=>{

    const card =
        document.createElement('div');

    card.className =
        'regras-card';

    card.innerHTML = `

<h2>

Oitavas ${jogo.id}

</h2>

<p>

${jogo.mandante}

x

${jogo.visitante}

</p>

`;

    container.appendChild(card);

});
