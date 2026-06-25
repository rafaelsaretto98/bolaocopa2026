import {
    gerar16Avos
}
from "./mata-mata-utils.js";

export async function inicializarMataMata(classificados){

    const jogos = [];

    // 16 avos
    const jogos16 =
        await gerar16Avos(classificados);

    jogos.push(...jogos16);

    // Oitavas
    for(let i = 1; i <= 8; i++){

        jogos.push({

            id:`OIT-${i}`,

            fase:"oitavas",

            ordem:i,

            timeA:null,

            timeB:null,

            golsA:null,

            golsB:null,

            penaltisA:null,

            penaltisB:null,

            vencedor:null,

            encerrado:false
                
            palpitesAbertos: false,



        });

    }

    // Quartas
    for(let i = 1; i <= 4; i++){

        jogos.push({

            id:`QUA-${i}`,

            fase:"quartas",

            ordem:i,

            timeA:null,

            timeB:null,

            golsA:null,

            golsB:null,

            penaltisA:null,

            penaltisB:null,

            vencedor:null,

            encerrado:false
                
             palpitesAbertos: false,

        });

    }

    // Semifinais
    for(let i = 1; i <= 2; i++){

        jogos.push({

            id:`SEMI-${i}`,

            fase:"semifinal",

            ordem:i,

            timeA:null,

            timeB:null,

            golsA:null,

            golsB:null,

            penaltisA:null,

            penaltisB:null,

            vencedor:null,

            encerrado:false

             palpitesAbertos: false,

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

        penaltisA:null,

        penaltisB:null,

        vencedor:null,

        encerrado:false

         palpitesAbertos: false,

    });

    return jogos;

}
