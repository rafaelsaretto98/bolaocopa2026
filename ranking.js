import {
    carregarParticipantesRanking
}
from './ranking-firebase.js';

const resultadosOficiais =
    JSON.parse(
        localStorage.getItem('resultadosOficiais')
    ) || {};

function calcularPontos(palpiteUsuario) {
    let pontos = 0;
    
    for(const grupo in resultadosOficiais) {
        if(palpiteUsuario[grupo]) {
            for(let p of ['1º', '2º', '3º', '4º']) {
                const escolha = palpiteUsuario[grupo][p];
                const oficial = resultadosOficiais[grupo][p];

                // Ganha 1 ponto apenas se acertar o país na posição exata
                if(escolha && oficial && escolha === oficial) {
                    pontos += 1; 
                }
            }
        }
    }
    return pontos;
}

// 2. Calcula pontos de todos e ordena do maior para o menor
const palpitesAmigos =
    await carregarParticipantesRanking();

const participantesRanking =
    palpitesAmigos.map(p => ({
        nome: p.nome,
        palpites: p.palpites,
        protocolo: p.protocolo,
        data: p.data
    }));

    participantesRanking.forEach(amigo => {

    amigo.pontuacao =
        calcularPontos(amigo.palpites);

});

participantesRanking.sort(
    (a,b) => b.pontuacao - a.pontuacao
);

// 3. Renderiza a tabela na tela
const listaRanking = document.getElementById('lista-ranking');

if(participantesRanking.length === 0){

    listaRanking.innerHTML = `
        <div style="
            background:white;
            padding:30px;
            border-radius:12px;
            text-align:center;
            font-weight:bold;
        ">
            Nenhum participante importado ainda.
        </div>
    `;

    return;
}

participantesRanking.forEach((amigo,index)=>{
    const posicao = index + 1;
    let corMedalha = '#cbd5e1'; // Cinza padrão
    if (posicao === 1) corMedalha = '#fbbf24'; // Ouro
    if (posicao === 2) corMedalha = '#94a3b8'; // Prata
    if (posicao === 3) corMedalha = '#b45309'; // Bronze

    // Monta o mini-gabarito do usuário para exibição
    let htmlPalpites = '<div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin-top: 15px;">';
    for(const g in amigo.palpites) {
        htmlPalpites += `
            <div style="background: #f1f5f9; padding: 10px; border-radius: 8px; font-size: 12px;">
                <strong>Grupo ${g}</strong><br>
                1º ${amigo.palpites[g]['1º']}<br>
                2º ${amigo.palpites[g]['2º']}<br>
                3º ${amigo.palpites[g]['3º']}<br>
                4º ${amigo.palpites[g]['4º']}<br>
            </div>
        `;
    }
    htmlPalpites += '</div>';

    // Cria o cartão do ranking
    const card = document.createElement('div');
    card.style.background = '#ffffff';
    card.style.marginBottom = '15px';
    card.style.borderRadius = '12px';
    card.style.padding = '20px';
    card.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
    card.style.borderLeft = `6px solid ${corMedalha}`;
    
    card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; cursor: pointer;" onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none'">
            <div style="font-size: 20px; font-weight: 800; color: #1e3a8a;">
                <span style="color: ${corMedalha}; margin-right: 10px;">${posicao}º</span>
                ${amigo.nome}
                <br>
                
                <span style="
                    font-size:12px;
                    color:#64748b;
                ">
                    ${amigo.data}
                </span>
            </div>
            <div style="font-size: 24px; font-weight: 900; color: #10b981;">
                ${amigo.pontuacao} pts <span style="font-size: 12px; color: #94a3b8;">▼</span>
            </div>
        </div>
        <div style="display: none; border-top: 1px solid #e2e8f0; margin-top: 15px; padding-top: 15px;">
            <h4 style="
                margin:0 0 15px 0;
                color:#1e3a8a;
                font-size:18px;
            ">
                📋 Palpites de ${amigo.nome}
            </h4>
            ${htmlPalpites}
        </div>
    `;

    listaRanking.appendChild(card);
});

function abrirPalpite(participante){

    document.getElementById(
        'nomeParticipante'
    ).textContent =
        participante.nome;

    const conteudo =
        document.getElementById(
            'conteudoPalpite'
        );

    conteudo.innerHTML = '';

    const palpites =
        participante.palpites;

    Object.keys(palpites)
    .sort()
    .forEach(grupo => {

        const bloco =
            document.createElement('div');

        bloco.innerHTML = `
            <h3>Grupo ${grupo}</h3>

            <p>
                1º ${palpites[grupo]['1º']}
            </p>

            <p>
                2º ${palpites[grupo]['2º']}
            </p>

            <p>
                3º ${palpites[grupo]['3º']}
            </p>

            <p>
                4º ${palpites[grupo]['4º']}
            </p>

            <hr>
        `;

        conteudo.appendChild(bloco);

    });

    document.getElementById(
        'modalPalpite'
    ).style.display = 'block';
}

document
.getElementById('fecharModal')
.onclick = () => {

    document.getElementById(
        'modalPalpite'
    ).style.display = 'none';

};
