import {
    carregarJogos,
    adicionarJogo,
    excluirJogo,
    atualizarResultado
}
from './jogos-firebase.js';


async function iniciar(){

    const jogos =
        await carregarJogos();

    const lista =
        document.getElementById(
            'listaJogos'
        );

    lista.innerHTML = '';

    jogos.forEach(jogo => {

    const div =
        document.createElement('div');

    div.className =
        'regras-card';

    div.innerHTML = `
        <h3>
            ${jogo.timeA}
            x
            ${jogo.timeB}
        </h3>

        <p>
            Grupo ${jogo.grupo}
        </p>

        <p>
            ${jogo.data}
            -
            ${jogo.horario}
        </p>

        <p>
            ${jogo.estadio}
        </p>

        <br>

        <br><br>

<div style="
    background:#f8fafc;
    padding:15px;
    border-radius:10px;
    margin-top:15px;
">

    <div style="
        text-align:center;
        font-weight:700;
        margin-bottom:10px;
    ">
        ⚽ Resultado
    </div>

    <div style="
        display:flex;
        justify-content:center;
        align-items:center;
        gap:10px;
        flex-wrap:wrap;
    ">

        <span>${jogo.timeA}</span>

        <input
            type="number"
            min="0"
            id="golsA-${jogo.id}"
            value="${jogo.golsA ?? ''}"
            style="width:60px;"
        >

        <strong>x</strong>

        <input
            type="number"
            min="0"
            id="golsB-${jogo.id}"
            value="${jogo.golsB ?? ''}"
            style="width:60px;"
        >

        <span>${jogo.timeB}</span>

    </div>

</div>

<br>

<div style="
    background:#fffbeb;
    padding:15px;
    border-radius:10px;
">

    <strong>🟨 Cartões Amarelos</strong>

    <br><br>

    ${jogo.timeA}

    <input
        type="number"
        min="0"
        id="amarelosA-${jogo.id}"
        value="${jogo.amarelosA ?? 0}"
        style="width:60px;margin:0 10px;"
    >

    ${jogo.timeB}

    <input
        type="number"
        min="0"
        id="amarelosB-${jogo.id}"
        value="${jogo.amarelosB ?? 0}"
        style="width:60px;margin-left:10px;"
    >

</div>

<br>

<div style="
    background:#fef2f2;
    padding:15px;
    border-radius:10px;
">

    <strong>🟥 Cartões Vermelhos</strong>

    <br><br>

    ${jogo.timeA}

    <input
        type="number"
        min="0"
        id="vermelhosA-${jogo.id}"
        value="${jogo.vermelhosA ?? 0}"
        style="width:60px;margin:0 10px;"
    >

    ${jogo.timeB}

    <input
        type="number"
        min="0"
        id="vermelhosB-${jogo.id}"
        value="${jogo.vermelhosB ?? 0}"
        style="width:60px;margin-left:10px;"
    >

</div>

<br><br>

<button
    onclick="salvarResultado('${jogo.id}')"
    style="
        background:${jogo.encerrado ? '#16a34a' : '#2563eb'};
        color:white;
        border:none;
        padding:8px 12px;
        border-radius:6px;
        cursor:pointer;
    "
>
    ${jogo.encerrado ? '✅ Resultado Salvo' : '💾 Salvar Resultado'}
</button>

<br><br>

        <button
            onclick="excluirJogoTela('${jogo.id}')"
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

    lista.appendChild(div);

});
}

document
.getElementById('salvarJogo')
.addEventListener('click', async () => {

    const jogo = {

        grupo:
            document.getElementById('grupo').value.trim(),

        rodada:
            document.getElementById('rodada').value.trim(),

        data:
            document.getElementById('data').value,

        horario:
            document.getElementById('horario').value,

        cidade:
            document.getElementById('cidade').value.trim(),

        estadio:
            document.getElementById('estadio').value.trim(),

        timeA:
            document.getElementById('timeA').value.trim(),

        timeB:
            document.getElementById('timeB').value.trim(),

        golsA: null,

        golsB: null,

        amarelosA: 0,

        amarelosB: 0,

        vermelhosA: 0,

        vermelhosB: 0,

        encerrado: false
    };

    if(
        !jogo.grupo ||
        !jogo.data ||
        !jogo.horario ||
        !jogo.timeA ||
        !jogo.timeB
    ){
        alert(
            'Preencha os campos obrigatórios.'
        );
        return;
    }

    try {

        await adicionarJogo(jogo);

        alert(
            '✅ Jogo cadastrado com sucesso!'
        );

        location.reload();

    } catch(erro){

        console.error(erro);

        alert(
            'Erro ao salvar jogo.'
        );

    }

});

    window.salvarResultado = async function(id){

    const golsA =
        parseInt(
            document.getElementById(
                `golsA-${id}`
            ).value
        );

    const golsB =
        parseInt(
            document.getElementById(
                `golsB-${id}`
            ).value
        );
    
    const amarelosA =
    parseInt(
        document.getElementById(
            `amarelosA-${id}`
        ).value
    ) || 0;

    const amarelosB =
        parseInt(
            document.getElementById(
                `amarelosB-${id}`
            ).value
        ) || 0;

    const vermelhosA =
        parseInt(
            document.getElementById(
                `vermelhosA-${id}`
            ).value
        ) || 0;

    const vermelhosB =
        parseInt(
            document.getElementById(
                `vermelhosB-${id}`
            ).value
        ) || 0;

    if(
        isNaN(golsA) ||
        isNaN(golsB)
    ){
        alert(
            'Informe os dois placares.'
        );
        return;
    }

    try{

        await atualizarResultado(
            id,
            golsA,
            golsB,

            amarelosA,
            amarelosB,

            vermelhosA,
            vermelhosB
        );

        alert(
            'Resultado salvo.'
        );

        location.reload();

    }catch(erro){

        console.error(erro);

        alert(
            'Erro ao salvar resultado.'
        );

    }

};

window.excluirJogoTela = async function(id){

    if(
        !confirm(
            'Deseja excluir este jogo?'
        )
    ){
        return;
    }

    try {

        await excluirJogo(id);

        alert(
            'Jogo excluído.'
        );

        location.reload();

    } catch(erro){

        console.error(erro);

        alert(
            'Erro ao excluir jogo.'
        );

    }

};

iniciar();
