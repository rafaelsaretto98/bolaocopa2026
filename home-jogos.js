import {
    carregarJogosMataMata
}
from "./mata-mata-firebase.js";

import {
    carregarJogos
}
from './jogos-firebase.js';

export async function carregarProximosJogos(){

const jogosGrupo =
    await carregarJogos();

const jogosMata =
    await carregarJogosMataMata();

const jogos = [

    ...jogosGrupo,

    ...jogosMata

];

const futuros =
    jogos
        .filter(j => !j.encerrado)
        .sort((a,b)=>{

            if(!a.data) return 1;

            if(!b.data) return -1;

            const dataA =
                new Date(`${a.data}T${a.horario}`);

            const dataB =
                new Date(`${b.data}T${b.horario}`);

            return dataA - dataB;

        })
        .slice(0,3);

const container =
document.getElementById(
'proximosJogos'
);

container.innerHTML = '';

futuros.forEach(jogo => {

const nomeTimeA =
    jogo.timeA?.time || jogo.timeA;

const nomeTimeB =
    jogo.timeB?.time || jogo.timeB;

const jogoBrasil =

    nomeTimeA === "Brasil" ||

    nomeTimeB === "Brasil";

const div =
document.createElement('div');

div.style.marginBottom =
'15px';

div.style.padding =
'10px';

div.style.borderRadius =
'8px';

if(jogoBrasil){

div.style.border =
'2px solid #facc15';

div.style.background =
'#fffbeb';
}

div.innerHTML = `

           <strong>
               ${
                   jogoBrasil
                   ? '⭐ '
                   : ''
               }

                ${nomeTimeA}
                x                
                ${nomeTimeB}
           </strong>

           <br>

           📅 ${formatarData(jogo.data)}

           •

           🕒 ${jogo.horario}

       `;

container.appendChild(div);

});

}


function formatarData(data){

    if(!data){

        return "A definir";

    }

    const partes =
        data.split("-");

    return `${partes[2]}/${partes[1]}`;

}
