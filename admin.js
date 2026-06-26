import {
    carregarConfiguracoes
}
from "./configuracoes-firebase.js";

import {
    carregarParticipantes,
    excluirParticipanteFirebase
}
from './participantes.js';

console.log('admin.js carregou');

if(
    localStorage.getItem(
        'adminLogado'
    ) !== 'true'
){
    window.location.href =
        'login.html';
}

let participantes = [];



async function iniciar(){

    await atualizarPainelMataMata();

    console.log('Buscando participantes...');

    participantes =
        await carregarParticipantes();

    console.log(participantes);

    renderizar();
}

iniciar();

document.getElementById('importar').onclick = () => {

    const texto =
        document.getElementById('jsonEntrada').value.trim();

    if (!texto) {
        alert('Cole um JSON.');
        return;
    }

    let novo;

    try {

        novo = JSON.parse(texto);

    } catch {

        alert('JSON inválido.');
        return;
    }

    const existe = participantes.some(
        p => p.protocolo === novo.protocolo
    );

    if (existe) {

        alert(
            'Este protocolo já foi importado.'
        );

        return;
    }
    if(
    !novo.nome ||
    !novo.protocolo ||
    !novo.palpites
){
    alert('JSON inválido.');
    return;
}

    participantes.push(novo);

    salvar();

    document.getElementById('jsonEntrada').value = '';

    alert(
        `✅ Participante importado

        Nome: ${novo.nome}

        Protocolo: ${novo.protocolo}`
        );
};



function salvar() {

    renderizar();
}

function renderizar() {

    const div =
        document.getElementById('listaParticipantes');

    if (!div) return;

    document.getElementById(
        'contadorParticipantes'
    ).textContent = participantes.length;

    div.innerHTML = '';
    

    const filtro =
    document.getElementById('buscaParticipante')
        ?.value
        .toLowerCase() || '';

    participantes
    .filter(p =>
        p.nome.toLowerCase().includes(filtro)
    )

    
    .forEach(p => {



        const item =
            document.createElement('div');

        item.style.padding = '10px';
        item.style.marginBottom = '10px';
        item.style.background = '#f1f5f9';
        item.style.borderRadius = '8px';

        item.innerHTML = `
            <strong>${p.nome}</strong><br>
            Protocolo: ${p.protocolo}<br>
            Data: ${p.data}<br><br>

                        <button
                onclick="excluirParticipante('${p.id}')"
                style="
                    background:#dc2626;
                    color:white;
                    border:none;
                    padding:8px 12px;
                    border-radius:6px;
                    cursor:pointer;
                "
            >
                🗑 Excluir
            </button>
        `;

        div.appendChild(item);
    });
}

document
        .getElementById('buscaParticipante')
        .addEventListener('input', renderizar);

document
.getElementById('importarBackup')
.addEventListener('change', e => {

    const arquivo = e.target.files[0];

    if (!arquivo) return;

    const leitor = new FileReader();

    leitor.onload = evento => {

        try {

            participantes =
                JSON.parse(evento.target.result);

            salvar();

            alert(
                'Backup restaurado com sucesso.'
            );

        } catch {

            alert(
                'Arquivo inválido.'
            );

        }
    };

    leitor.readAsText(arquivo);
});

document.getElementById('limparTudo').onclick = () => {

    if (
        confirm(
            'Deseja apagar todos os participantes?'
        )
    ) {

        participantes = [];

        salvar();
    }
};

document.getElementById('exportarBackup').onclick = () => {

    const blob = new Blob(
        [JSON.stringify(participantes, null, 2)],
        { type: 'application/json' }
    );

    const url =
        URL.createObjectURL(blob);

    const a =
        document.createElement('a');

    a.href = url;
    a.download = 'backup-bolao.json';

    a.click();

    URL.revokeObjectURL(url);
};

window.excluirParticipante = async function(id){

    if(!confirm('Excluir este participante?')){
        return;
    }

    await excluirParticipanteFirebase(id);

    participantes =
        await carregarParticipantes();

    renderizar();

};

document.getElementById('logout')
.onclick = () => {

    localStorage.removeItem(
        'adminLogado'
    );

    window.location.href =
        'login.html';

};

async function atualizarPainelMataMata(){

    const config =
        await carregarConfiguracoes();

    const fase = nomeFase(
        config.faseAtual
    );

    document.getElementById(
        "statusMataMata"
    ).innerHTML = `

<strong>

Fase Atual:

</strong>

${fase}

<br><br>

<strong>

Palpites:

</strong>

${

config.palpitesAbertos

?

"🟢 Abertos"

:

"🔴 Fechados"

}

`;

}

function nomeFase(fase){

    switch(fase){

        case "16-avos":

            return "16 Avos de Final";

        case "oitavas":

            return "Oitavas de Final";

        case "quartas":

            return "Quartas de Final";

        case "semifinal":

            return "Semifinais";

        case "final":

            return "Final";

        default:

            return "Fase de Grupos";

    }

}
