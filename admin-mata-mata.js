import {
    avancarVencedor
}
from "./mata-mata-progressao.js";

import {
    atualizarJogoMataMata
}
from "./mata-mata-firebase.js";

import {
    carregarConfiguracoes,
    atualizarConfiguracoes
}
from "./configuracoes-firebase.js";

import {
    carregarJogosPorFase
}
from "./mata-mata-firebase.js";

import {
    criarBackup,
    baixarBackup
}
from "./backup-firebase.js";

async function iniciar(){

    const config =
        await carregarConfiguracoes();

    document.getElementById(
        "faseAtual"
    ).innerHTML = `
        <strong>Fase Atual:</strong>
        ${nomeFase(config.faseAtual)}
    `;

    const jogos =
        await carregarJogosPorFase(
            config.faseAtual
        );

    desenharJogos(jogos);

}

function desenharJogos(jogos){

    const lista =
        document.getElementById(
            "listaJogos"
        );

    lista.innerHTML = "";

    jogos.forEach(jogo=>{

        lista.appendChild(

            criarCardJogoAdmin(jogo)

        );

    });

}

function criarCardJogoAdmin(jogo){

    const card =
        document.createElement("div");

    card.className =
        "regras-card";

        card.innerHTML = `

<h3>

${jogo.timeA?.time ?? "A definir"}

×

${jogo.timeB?.time ?? "A definir"}

</h3>

<div class="placar-admin">

    <input
        type="number"
        id="golsA-${jogo.id}"
        value="${jogo.golsA ?? ""}"
        min="0"
    >

    <strong>x</strong>

    <input
        type="number"
        id="golsB-${jogo.id}"
        value="${jogo.golsB ?? ""}"
        min="0"
    >

</div>

<div
    id="penaltis-${jogo.id}"
    style="
        display:none;
        margin-top:15px;
    "
>

    <strong>
        Decisão por Pênaltis
    </strong>

    <br><br>

    <input
        type="number"
        id="penaltiA-${jogo.id}"
        placeholder="${jogo.timeA?.time ?? ""}"
        min="0"
    >

    x

    <input
        type="number"
        id="penaltiB-${jogo.id}"
        placeholder="${jogo.timeB?.time ?? ""}"
        min="0"
    >

</div>

<br>

<button
    class="btn-relampago"
    id="salvar-${jogo.id}"
>

💾 Salvar Resultado

</button>

`;
        const golsA =
    card.querySelector(
        `#golsA-${jogo.id}`
    );

const golsB =
    card.querySelector(
        `#golsB-${jogo.id}`
    );

const painelPenaltis =
    card.querySelector(
        `#penaltis-${jogo.id}`
    );

function verificarEmpate(){

    if(
        golsA.value !== "" &&
        golsB.value !== "" &&
        Number(golsA.value) === Number(golsB.value)
    ){

        painelPenaltis.style.display =
            "block";

    }

    else{

        painelPenaltis.style.display =
            "none";

    }

}

golsA.addEventListener(
    "input",
    verificarEmpate
);

golsB.addEventListener(
    "input",
    verificarEmpate
);

verificarEmpate();

const botaoSalvar =
    card.querySelector(
        `#salvar-${jogo.id}`
    );

botaoSalvar.addEventListener(

    "click",

    async () => {

        jogo.golsA =
            Number(golsA.value);

        jogo.golsB =
            Number(golsB.value);

        if(

            jogo.golsA >

            jogo.golsB

        ){

            jogo.vencedor =
                jogo.timeA;

        }

        else if(

            jogo.golsB >

            jogo.golsA

        ){

            jogo.vencedor =
                jogo.timeB;

        }

        else{

            const penaltiA =
                Number(

                    card.querySelector(
                        `#penaltiA-${jogo.id}`
                    ).value

                );

            const penaltiB =
                Number(

                    card.querySelector(
                        `#penaltiB-${jogo.id}`
                    ).value

                );

            jogo.golsPenaltiA =
                penaltiA;

            jogo.golsPenaltiB =
                penaltiB;

            jogo.penalti =
                true;

            if(

                penaltiA >

                penaltiB

            ){

                jogo.vencedor =
                    jogo.timeA;

            }

            else{

                jogo.vencedor =
                    jogo.timeB;

            }

        }

        jogo.encerrado = true;

        await atualizarJogoMataMata(
        jogo
        );
        
        await avancarVencedor(
            jogo
        );
        
        alert(
            "Resultado salvo!"
        );
        
        iniciar();

    }

);

return card;

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

            return fase;

    }

}

document
    .getElementById("encerrarFase")
    .addEventListener(
        "click",
        async () => {

            const config =
                await carregarConfiguracoes();

            const jogos =
                await carregarJogosPorFase(
                    config.faseAtual
                );

            // Verifica se todos os jogos foram encerrados
            const jogosPendentes =
                jogos.filter(
                    jogo => !jogo.encerrado
                );

            if(jogosPendentes.length > 0){

                alert(
                    `Ainda existem ${jogosPendentes.length} jogo(s) sem resultado.`
                );

                return;

            }

            let proximaFase;

            switch(config.faseAtual){

                case "16-avos":
                    proximaFase = "oitavas";
                    break;

                case "oitavas":
                    proximaFase = "quartas";
                    break;

                case "quartas":
                    proximaFase = "semifinal";
                    break;

                case "semifinal":
                    proximaFase = "final";
                    break;

                case "final":

                    alert(
                        "O torneio já está encerrado."
                    );

                    return;

                default:

                    alert(
                        "Fase inválida."
                    );

                    return;

            }

            const confirmar =
                confirm(
                    `Deseja realmente encerrar ${nomeFase(config.faseAtual)} e abrir ${nomeFase(proximaFase)}?`
                );

            if(!confirmar){
                return;
            }

            await atualizarConfiguracoes({

                faseAtual: proximaFase

            });

            alert(

                `${nomeFase(proximaFase)} liberada com sucesso!`

            );

            iniciar();

        }
    );

document

.getElementById(

    "criarBackup"

)

.addEventListener(

    "click",

    async ()=>{

        const backup =

            await criarBackup(

                "Backup manual"

            );

        baixarBackup(

            backup

        );

        alert(

            "Backup criado com sucesso!"

        );

    }

);

export async function listarBackups(){

    const snapshot =

        await getDocs(

            collection(
                db,
                "backups"
            )

        );

    return snapshot.docs

        .map(doc=>({

            id:doc.id,

            ...doc.data()

        }))

        .sort(

            (a,b)=>

                b.data.localeCompare(a.data)

        );

}

export async function restaurarBackup(id){

    const snapshot =

        await getDoc(

            doc(
                db,
                "backups",
                id
            )

        );

    if(!snapshot.exists()){

        throw new Error(
            "Backup não encontrado."
        );

    }

    const backup =

        snapshot.data();

        for(const participante of backup.participantes){

        await updateDoc(

            doc(
                db,
                "participantes",
                participante.id
            ),

            participante

        );

    }

        for(const jogo of backup.jogosGrupo){

        await updateDoc(

            doc(
                db,
                "jogos",
                jogo.id
            ),

            jogo

        );

    }

            for(const jogo of backup.mataMata){

        await updateDoc(

            doc(
                db,
                "mata-mata",
                jogo.id
            ),

            jogo

        );

    }

            await updateDoc(

        doc(
            db,
            "configuracoes",
            "geral"
        ),

        backup.configuracoes

    );

}

iniciar();
