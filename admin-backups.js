import {

    criarNavbar

}
from "./navbar.js";

import {

    listarBackups,

    criarBackup,

    baixarBackup,

    restaurarBackup

}
from "./backup-firebase.js";

async function iniciar(){

    carregarLista();

}

iniciar();

async function carregarLista(){

    const backups =

        await listarBackups();

    const lista =

        document.getElementById(

            "listaBackups"

        );

    lista.innerHTML = "";

    backups.forEach(

        backup=>{

            lista.appendChild(

                criarCardBackup(

                    backup

                )

            );

        }

    );

}

function criarCardBackup(backup){

    const card =

        document.createElement("div");

    card.className =

        "regras-card";

    card.innerHTML = `

<h3>

${new Date(

    backup.data

).toLocaleString("pt-BR")}

</h3>

<p>

${backup.descricao}

</p>

<div
style="
display:flex;
gap:15px;
flex-wrap:wrap;
">

<button

class="btn-relampago btn-download"

>

📥 Download

</button>

<button

class="btn-relampago btn-restaurar"

>

♻ Restaurar

</button>

</div>

`;

    card.querySelector(

        ".btn-download"

    )

    .addEventListener(

        "click",

        ()=>{

            baixarBackup(

                backup

            );

        }

    );

    card.querySelector(

        ".btn-restaurar"

    )

    .addEventListener(

        "click",

        async ()=>{

            const confirmar =

                confirm(

`Deseja restaurar este backup?

Esta ação irá substituir os dados atuais.`

                );

            if(!confirmar){

                return;

            }

            await restaurarBackup(

                backup.id

            );

            alert(

                "Backup restaurado!"

            );

        }

    );

    return card;

}

document

.getElementById(

    "novoBackup"

)

.addEventListener(

    "click",

    async ()=>{

        const backup =

            await criarBackup(

                "Backup Manual"

            );

        baixarBackup(

            backup

        );

        carregarLista();

    }

);

