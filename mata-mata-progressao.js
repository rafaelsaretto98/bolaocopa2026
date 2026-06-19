export function atualizarOitavas(jogos16Avos, jogosOitavas){

    jogosOitavas.forEach((jogo,index)=>{

        const jogo1 = jogos16Avos[index * 2];

        const jogo2 = jogos16Avos[index * 2 + 1];

        jogo.timeA =
            jogo1.vencedor;

        jogo.timeB =
            jogo2.vencedor;

    });

}

export function atualizarQuartas(jogosOitavas, jogosQuartas){

    jogosQuartas.forEach((jogo,index)=>{

        const jogo1 = jogosOitavas[index * 2];

        const jogo2 = jogosOitavas[index * 2 + 1];

        jogo.timeA =
            jogo1.vencedor;

        jogo.timeB =
            jogo2.vencedor;

    });

}

export function atualizarSemifinais(jogosQuartas, jogosSemifinais){

    jogosSemifinais.forEach((jogo,index)=>{

        const jogo1 = jogosQuartas[index * 2];

        const jogo2 = jogosQuartas[index * 2 + 1];

        jogo.timeA =
            jogo1.vencedor;

        jogo.timeB =
            jogo2.vencedor;

    });

}

export function atualizarFinal(jogosSemifinais, jogoFinal){

    jogoFinal.timeA =
        jogosSemifinais[0].vencedor;

    jogoFinal.timeB =
        jogosSemifinais[1].vencedor;

}
