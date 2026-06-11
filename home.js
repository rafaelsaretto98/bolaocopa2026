import {
    carregarJogos
}
from './jogos-firebase.js';

import {
    carregarParticipantes
}
from './participantes-firebase.js';

const dashboard =
    document.getElementById(
        'dashboard'
    );

dashboard.innerHTML = `

    <div class="regras-card">
        <h2>
            👥 Participantes
        </h2>

        <h1 id="totalParticipantes">
            ...
        </h1>
    </div>

    <div class="regras-card">
        <h2>
            💰 Premiação Atual
        </h2>

        <h1 id="premiacao">
            ...
        </h1>
    </div>

    <div class="regras-card">
        <h2>
            🔥 Próximos Jogos
        </h2>

        <div id="proximosJogos">
            Carregando...
        </div>
    </div>

    <div class="regras-card">
        <h2>
            🏆 Top 3
        </h2>

        <div id="topRanking">
            Carregando...
        </div>
    </div>

`;
