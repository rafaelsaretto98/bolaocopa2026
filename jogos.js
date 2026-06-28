import {
    carregarJogosMataMata
}
from "./mata-mata-firebase.js";

import {
    carregarJogos 
}
from './jogos-firebase.js';

import {
    criarNavbar
}
from "./navbar.js";

document.getElementById(
    "navbar"
).innerHTML =
    criarNavbar("jogos");

async function iniciar(){
    
    const jogosGrupo =
    await carregarJogos();

    const jogosMata =
        await carregarJogosMataMata();

    const jogos = [

        ...jogosGrupo,

        ...jogosMata

    ];   

    jogos.sort((a, b) => {

        const dataA =
            new Date(`${a.data}T${a.horario}`);

        const dataB =
            new Date(`${b.data}T${b.horario}`);

        return dataA - dataB;

    });

    let dataAtual = '';
    let containerDia = null;

    const lista =
        document.getElementById(
            'listaJogos'
        );

    lista.innerHTML = '';

    jogos.forEach(jogo => {

        const nomeTimeA =
            jogo.timeA?.time || jogo.timeA || "A definir";

        const nomeTimeB =
            jogo.timeB?.time || jogo.timeB || "A definir";

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
            
            containerDia =
                document.createElement('div');
                
                containerDia.className =
                    'jogos-dia';
                
                lista.appendChild(
                    containerDia
                );

        }
        const jogoDoBrasil =

            nomeTimeA === 'Brasil' ||
        
            nomeTimeB === 'Brasil';
        
        const card =
            document.createElement('div');
    

        card.className =

            jogoDoBrasil
        
            ? 'regras-card jogo-brasil'
        
            : 'regras-card';

        card.innerHTML = `

            <div style="
                background:#1e3a8a;
                color:white;
                padding:10px;
                border-radius:8px;
                text-align:center;
                font-weight:800;
                margin-bottom:15px;
            ">
                ${jogo.grupo
                    ? `🏆 Grupo ${jogo.grupo}`
                    : `🏆 ${nomeFase(jogo.fase)}`
                }
            </div>
        
            <div style="
                text-align:center;
                margin:20px 0;
            ">
        
                <div style="
                    font-size:22px;
                    font-weight:800;
                ">
                    ${jogo.timeA}
                </div>
        
                <div style="
                    font-size:28px;
                    color:#64748b;
                    margin:10px 0;
                ">
                    X
                </div>
        
                <div style="
                    font-size:22px;
                    font-weight:800;
                ">
                    ${jogo.timeB}
                </div>
        
            </div>
        
            <div style="
                text-align:center;
                color:#475569;
                margin-bottom:10px;
            ">
                🕒 ${jogo.horario}
            </div>
        
            <div style="
                text-align:center;
                color:#475569;
                margin-bottom:20px;
            ">
                🏟 ${jogo.estadio}
            </div>
        
            ${
                jogo.encerrado
                ?
                `
                <div style="
                    text-align:center;
                ">
        
                    <div style="
                        font-size:42px;
                        font-weight:900;
                        color:#10b981;
                    ">
                        ${jogo.golsA}
                        x
                        ${jogo.golsB}
                    </div>
        
                    <div style="
                        color:#16a34a;
                        font-weight:700;
                    ">
                        🟢 Encerrado
                    </div>
        
                </div>
                `
                :
                `
                <div style="
                    text-align:center;
                ">
        
                    <div style="
                        color:#ca8a04;
                        font-weight:700;
                    ">
                        🟡 Não iniciado
                    </div>
        
                </div>
                `
            }
        
        `;

        containerDia.appendChild(card);

    });

}

function formatarData(data){

    const partes =
        data.split('-');

    return `${partes[2]}/${partes[1]}/${partes[0]}`;

}

function nomeFase(fase){

    switch(fase){

        case "16-avos":
            return "16 Avos";

        case "oitavas":
            return "Oitavas";

        case "quartas":
            return "Quartas de Final";

        case "semifinal":
            return "Semifinal";

        case "final":
            return "Final";

        default:
            return fase;

    }

}

function nomeTime(time){

    return time?.time || time || "A definir";

}

iniciar();
