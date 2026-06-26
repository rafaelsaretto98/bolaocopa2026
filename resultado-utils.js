export function gerarResumoParticipante(

    participante,

    classificacoes

){

    const resumo = [];

    classificacoes.forEach(grupo=>{

        resumo.push(

            gerarResumoGrupo(

                participante,

                grupo

            )

        );

    });

    return resumo;

}

function gerarResumoGrupo(

    participante,

    grupo

){

    const palpite =

        participante.palpites?.[grupo.grupo];
    
    const linhas = [];

    let pontos = 0;
    ["1º","2º","3º","4º"]

    .forEach(

        (posicao,index)=>{

            const oficial =

                grupo.times[index].time;

            const escolhido =

                palpite?.[posicao];
                      const acertou =

                escolhido === oficial;
                      if(acertou){

                pontos++;

            }

                  linhas.push({

                posicao,

                time:escolhido,

                acertou

            });

        }

    );

    return{

        grupo:

            grupo.grupo,

        pontos,

        linhas

    };

}

