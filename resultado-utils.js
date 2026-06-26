export function gerarResumoParticipante(

    participante,

    classificacoes

){

    return classificacoes.map(

        grupo =>

            gerarResumoGrupo(

                participante,

                grupo

            )

    );

}

function gerarResumoGrupo(

    participante,

    classificacao

){

    if(

        !classificacao ||

        classificacao.length === 0

    ){

        return null;

    }

    const grupo =

        classificacao[0].grupo;

    const palpite =

        participante.palpites?.[grupo];

    const linhas = [];

    let pontos = 0;

    ["1º","2º","3º","4º"]

    .forEach((posicao,index)=>{

        const oficial =

            classificacao[index]?.time;

        const escolhido =

            palpite?.[posicao];

        const acertou =

            escolhido === oficial;

        if(acertou){

            pontos++;

        }

        linhas.push({

            posicao,

            time: escolhido,

            acertou

        });

    });

    return{

        grupo,

        pontos,

        linhas

    };

}
