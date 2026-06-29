import {
    agendaMataMata
}
from "./agenda-mata-mata.js";

import {
    gerar16Avos
}
from "./mata-mata-utils.js";

export async function inicializarMataMata(classificados){

    const jogos = [];

    // 16 avos
    const jogos16 =
        await gerar16Avos(classificados);

    jogos16.forEach(jogo=>{

    const agenda =
        agendaMataMata[jogo.id];

    if(agenda){

        jogo.data =
            agenda.data;

        jogo.horario =
            agenda.horario;

        jogo.cidade =
            agenda.cidade;

        jogo.estadio =
            agenda.estadio;

        }

        jogo.encerrado = false;

        jogo.palpitesAbertos = false;

        jogo.penalti = false;

        jogo.golsPenaltiA = null;

        jogo.golsPenaltiB = null;

    });

    jogos.push(...jogos16);

    // Oitavas
    for(let i=1;i<=8;i++){

        jogos.push({

            id:`OIT-${i}`,

            fase:"oitavas",

            ordem:i,

            timeA:null,

            timeB:null,

            golsA:null,

            golsB:null,

            golsPenaltiA:null,

            golsPenaltiB:null,

            vencedor:null,

            encerrado:false,

            palpitesAbertos:false,

            penalti:false

        });

    }

    // Quartas
    for(let i=1;i<=4;i++){

        jogos.push({

            id:`QUA-${i}`,

            fase:"quartas",

            ordem:i,

            timeA:null,

            timeB:null,

            golsA:null,

            golsB:null,

            golsPenaltiA:null,

            golsPenaltiB:null,

            vencedor:null,

            encerrado:false,

            palpitesAbertos:false,

            penalti:false

        });

    }

    // Semifinais
    for(let i=1;i<=2;i++){

        jogos.push({

            id:`SEMI-${i}`,

            fase:"semifinal",

            ordem:i,

            timeA:null,

            timeB:null,

            golsA:null,

            golsB:null,

            golsPenaltiA:null,

            golsPenaltiB:null,

            vencedor:null,

            encerrado:false,

            palpitesAbertos:false,

            penalti:false

        });

    }

    // Final
    jogos.push({

        id:"FINAL-1",

        fase:"final",

        ordem:1,

        timeA:null,

        timeB:null,

        golsA:null,

        golsB:null,

        golsPenaltiA:null,

        golsPenaltiB:null,

        vencedor:null,

        encerrado:false,

        palpitesAbertos:false,

        penalti:false

    });

    return jogos;

}
