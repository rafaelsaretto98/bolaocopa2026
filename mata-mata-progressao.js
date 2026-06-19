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
