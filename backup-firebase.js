import { db }
from "./firebase.js";

import {

    collection,
    getDocs,
    getDoc,
    doc,
    setDoc

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

            participantes.docs.map(doc=>doc.data()),

        jogosGrupo:

            jogosGrupo.docs.map(doc=>doc.data()),

        mataMata:

            mataMata.docs.map(doc=>doc.data()),

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
