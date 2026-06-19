export function gerarSemifinais(jogosQuartas){

    return [

        {
            id: 1,
            fase: 'Semifinal',

            jogoA: jogosQuartas[0],
            jogoB: jogosQuartas[1],

            timeA: null,
            timeB: null,

            golsA: null,
            golsB: null,

            penaltisA: null,
            penaltisB: null,

            vencedor: null,

            encerrado: false
        },

        {
            id: 2,
            fase: 'Semifinal',

            jogoA: jogosQuartas[2],
            jogoB: jogosQuartas[3],

            timeA: null,
            timeB: null,

            golsA: null,
            golsB: null,

            penaltisA: null,
            penaltisB: null,

            vencedor: null,

            encerrado: false
        }

    ];

}
