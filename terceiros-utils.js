export function gerarRankingTerceiros(classificacoes){

    const terceiros = [];

    classificacoes.forEach(grupo=>{

        if(grupo.length >= 3){

            terceiros.push(grupo[2]);

        }

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
