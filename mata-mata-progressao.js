import {
    carregarJogoMataMata,
    atualizarJogoMataMata
}
from "./mata-mata-firebase.js";

export const mapaProgressao = {

    // 16 Avos → Oitavas

    "16A-1":  { jogo:"OIT-1",  lado:"A" },
    "16A-2":  { jogo:"OIT-1",  lado:"B" },

    "16A-3":  { jogo:"OIT-2",  lado:"A" },
    "16A-4":  { jogo:"OIT-2",  lado:"B" },

    "16A-5":  { jogo:"OIT-3",  lado:"A" },
    "16A-6":  { jogo:"OIT-3",  lado:"B" },

    "16A-7":  { jogo:"OIT-4",  lado:"A" },
    "16A-8":  { jogo:"OIT-4",  lado:"B" },

    "16A-9":  { jogo:"OIT-5",  lado:"A" },
    "16A-10": { jogo:"OIT-5",  lado:"B" },

    "16A-11": { jogo:"OIT-6",  lado:"A" },
    "16A-12": { jogo:"OIT-6",  lado:"B" },

    "16A-13": { jogo:"OIT-7",  lado:"A" },
    "16A-14": { jogo:"OIT-7",  lado:"B" },

    "16A-15": { jogo:"OIT-8",  lado:"A" },
    "16A-16": { jogo:"OIT-8",  lado:"B" },


    // Oitavas → Quartas

    "OIT-1": { jogo:"QUA-1", lado:"A" },
    "OIT-2": { jogo:"QUA-1", lado:"B" },

    "OIT-3": { jogo:"QUA-2", lado:"A" },
    "OIT-4": { jogo:"QUA-2", lado:"B" },

    "OIT-5": { jogo:"QUA-3", lado:"A" },
    "OIT-6": { jogo:"QUA-3", lado:"B" },

    "OIT-7": { jogo:"QUA-4", lado:"A" },
    "OIT-8": { jogo:"QUA-4", lado:"B" },


    // Quartas → Semi

    "QUA-1": { jogo:"SEMI-1", lado:"A" },
    "QUA-2": { jogo:"SEMI-1", lado:"B" },

    "QUA-3": { jogo:"SEMI-2", lado:"A" },
    "QUA-4": { jogo:"SEMI-2", lado:"B" },


    // Semi → Final

    "SEMI-1": { jogo:"FINAL-1", lado:"A" },
    "SEMI-2": { jogo:"FINAL-1", lado:"B" }

};

export async function avancarVencedor(jogoFinalizado){

    const destino =
        mapaProgressao[
            jogoFinalizado.id
        ];

    if(!destino){

        return;

    }

    const proximoJogo =
        await carregarJogoMataMata(
            destino.jogo
        );

    if(destino.lado === "A"){

        proximoJogo.timeA =
            jogoFinalizado.vencedor;

    }

    else{

        proximoJogo.timeB =
            jogoFinalizado.vencedor;

    }

    await atualizarJogoMataMata(
        proximoJogo
    );

}
