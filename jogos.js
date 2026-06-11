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
    let containerDia = null;

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
            
            containerDia =
                document.createElement('div');
                
                containerDia.className =
                    'jogos-dia';
                
                lista.appendChild(
                    containerDia
                );

        }

        const card =
            document.createElement('div');
        
        const jogoDoBrasil =

            jogo.timeA === 'Brasil' ||
        
            jogo.timeB === 'Brasil';

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
                🏆 Grupo ${jogo.grupo}
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

iniciar();
