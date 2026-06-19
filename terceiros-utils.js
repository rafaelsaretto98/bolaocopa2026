export function gerarRankingTerceiros(grupos){

    const terceiros = [];

    grupos.forEach(classificacao=>{

        if(classificacao.length < 3) return;

        terceiros.push(classificacao[2]);

    });

    terceiros.sort((a,b)=>{

        if(b.pontos !== a.pontos)
            return b.pontos - a.pontos;

        if(b.saldo !== a.saldo)
            return b.saldo - a.saldo;

        if(b.golsPro !== a.golsPro)
            return b.golsPro - a.golsPro;

        return a.time.localeCompare(b.time);

    });

    return terceiros;

}
