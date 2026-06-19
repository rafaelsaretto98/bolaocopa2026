export function gerarFinal(jogosSemifinais){

    return {

        id: 1,

        fase: 'Final',

        jogoA: jogosSemifinais[0],
        jogoB: jogosSemifinais[1],

        timeA: null,
        timeB: null,

        golsA: null,
        golsB: null,

        penaltisA: null,
        penaltisB: null,

        vencedor: null,

        encerrado: false

    };

}
