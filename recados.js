import {
    carregarRecados,
    adicionarRecado
}
from './recados-firebase.js';

async function carregarTela(){

    const recados =
        await carregarRecados();

    recados.sort(
        (a,b) =>
            new Date(b.data) -
            new Date(a.data)
    );

    const lista =
        document.getElementById(
            'listaRecados'
        );

    lista.innerHTML = '';

    recados.forEach(recado => {

        const card =
            document.createElement('div');

        card.className =
            'regras-card';

        card.innerHTML = `
            <h3>
                ${recado.nome}
            </h3>

            <small>
                ${formatarData(recado.data)}
            </small>

            <p>
                ${recado.texto}
            </p>
        `;

        lista.appendChild(card);

    });

}

document
.getElementById('enviarRecado')
.onclick = async () => {

    const nome =
        document.getElementById(
            'nomeRecado'
        ).value.trim();

    const texto =
        document.getElementById(
            'textoRecado'
        ).value.trim();

    if(!nome || !texto){

        alert(
            'Preencha nome e mensagem.'
        );

        return;

    }

    await adicionarRecado({

        nome,
        texto,

        data:
            new Date()
            .toISOString()

    });

    document.getElementById(
        'textoRecado'
    ).value = '';

    carregarTela();

};

function formatarData(data){

    return new Date(data)
    .toLocaleString(
        'pt-BR'
    );

}

carregarTela();
