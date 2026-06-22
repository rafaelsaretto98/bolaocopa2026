let tabelaTerceiros = null;

export async function carregarTabelaTerceiros() {

    if (tabelaTerceiros) {
        return tabelaTerceiros;
    }

    const resposta = await fetch("./fifa-terceiros.json");

    tabelaTerceiros = await resposta.json();

    return tabelaTerceiros;

}
