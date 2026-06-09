import {
    carregarJogos
}
from './jogos-firebase.js';

async function iniciar(){

    const jogos =
        await carregarJogos();
    
        jogos.sort((a, b) => {
    
        const dataA =
            new Date(
                `${a.data}T${a.horario}`
            );
    
        const dataB =
            new Date(
                `${b.data}T${b.horario}`
            );
    
        return dataA - dataB;
    
    });

    let dataAtual = '';

    const lista =
        document.getElementById(
            'listaJogos'
        );

    lista.innerHTML = '';

   jogos.forEach(jogo => {

    if(dataAtual !== jogo.data){

        dataAtual = jogo.data;

        const tituloData =
            document.createElement('div');

        tituloData.className =
            'header-card';

        tituloData.style.marginTop = '20px';

        tituloData.innerHTML = `
            <h2>
                📅 ${formatarData(jogo.data)}
            </h2>
        `;

        lista.appendChild(tituloData);

    }

function formatarData(data){

    const partes =
        data.split('-');

    return `${partes[2]}/${partes[1]}/${partes[0]}`;

}

iniciar();
