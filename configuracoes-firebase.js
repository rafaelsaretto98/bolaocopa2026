import { db }
from "./firebase.js";

import {
    doc,
    getDoc,
    updateDoc
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

export async function carregarConfiguracoes(){

    const snapshot =
        await getDoc(

            doc(
                db,
                "configuracoes",
                "geral"
            )

        );

    return snapshot.data();

}

export async function atualizarConfiguracoes(dados){

    await updateDoc(

        doc(
            db,
            "configuracoes",
            "geral"
        ),

        dados

    );

}
