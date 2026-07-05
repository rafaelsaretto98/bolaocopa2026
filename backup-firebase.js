import { db }
from "./firebase.js";

import {

    collection,
    getDocs,
    getDoc,
    doc,
    setDoc,
    updateDoc

}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

export async function criarBackup(descricao){

    const participantes =
        await getDocs(
            collection(db,"participantes")
        );

    const jogosGrupo =
        await getDocs(
            collection(db,"jogos")
        );

    const mataMata =
        await getDocs(
            collection(db,"mata-mata")
        );

    const configuracoes =
        await getDoc(
            doc(
                db,
                "configuracoes",
                "geral"
            )
        );

    const agora = new Date();

    const id =

        agora
        .toISOString()
        .replace(/[:.]/g,"-");

    const backup = {

        data: agora.toISOString(),

        descricao,

        participantes:
            participantes.docs.map(doc=>({
                id:doc.id,
                ...doc.data()
            })),

        jogosGrupo:
            jogosGrupo.docs.map(doc=>({
                id:doc.id,
                ...doc.data()
            })),

        mataMata:
            mataMata.docs.map(doc=>({
            id:doc.id,
            ...doc.data()
            })),

        configuracoes:

            configuracoes.data()

    };

    await setDoc(

        doc(
            db,
            "backups",
            id
        ),

        backup

    );

    return backup;

}

export function baixarBackup(backup){

    const json =

        JSON.stringify(

            backup,

            null,

            2

        );

    const blob =

        new Blob(

            [json],

            {

                type:"application/json"

            }

        );

    const url =

        URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href = url;

    a.download =

        `backup-${backup.data
            .replace(/:/g,"-")
            .replace(/\./g,"-")
        }.json`;

    a.click();

    URL.revokeObjectURL(url);

}

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

    // Participantes
    for(const participante of backup.participantes){

        const { id, ...dados } = participante;

        await setDoc(

            doc(
                db,
                "participantes",
                id
            ),

            dados,

            {
                merge:true
            }

        );

    }

    // Jogos da fase de grupos
    for(const jogo of backup.jogosGrupo){

        const { id, ...dados } = jogo;

        await setDoc(

            doc(
                db,
                "jogos",
                id
            ),

            dados

        );

    }

    // Mata-mata
    for(const jogo of backup.mataMata){

        const { id, ...dados } = jogo;

        await setDoc(

            doc(
                db,
                "mata-mata",
                id
            ),

            dados

        );

    }

    // Configurações
    await setDoc(

        doc(
            db,
            "configuracoes",
            "geral"
        ),

        backup.configuracoes

    );

    return true;
}
