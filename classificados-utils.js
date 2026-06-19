export function gerarClassificados(todasClassificacoes){

    const classificados = {

        primeiros:{},

        segundos:{},

        terceiros:[]

    };

    todasClassificacoes.forEach(classificacao => {

        if(classificacao.length < 3){
            return;
        }

        const grupo =
            classificacao[0].grupo;

        classificados.primeiros[grupo] =
            classificacao[0];

        classificados.segundos[grupo] =
            classificacao[1];

        classificados.terceiros.push(
            classificacao[2]
        );

    });

    classificados.terceiros.sort((a,b)=>{

        if(b.pontos !== a.pontos)
            return b.pontos-a.pontos;

        if(b.saldo !== a.saldo)
            return b.saldo-a.saldo;

        if(b.golsPro !== a.golsPro)
            return b.golsPro-a.golsPro;

        if(a.golsContra !== b.golsContra)
            return a.golsContra-b.golsContra;

        if(a.amarelos !== b.amarelos)
            return a.amarelos-b.amarelos;

        if(a.vermelhos !== b.vermelhos)
            return a.vermelhos-b.vermelhos;

        return a.time.localeCompare(b.time);

    });

    return classificados;

}
