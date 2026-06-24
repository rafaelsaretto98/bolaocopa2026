import { db }
from './firebase.js';

import {
    collection,
    getDocs,
    doc,
    setDoc,
    updateDoc
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

export async function salvarJogosMataMata(jogos){

    for(const jogo of jogos){

        await setDoc(

            doc(
                db,
                "mata-mata",
                jogo.id.toString()
            ),

            jogo

        );

    }

}

export async function carregarJogosMataMata(){

    const snapshot =
        await getDocs(
            collection(
                db,
                "mata-mata"
            )
        );

    return snapshot.docs.map(
        doc => doc.data()
    );

}

export async function atualizarJogoMataMata(jogo){

    await updateDoc(

        doc(
            db,
            "mata-mata",
            jogo.id.toString()
        ),

        jogo

    );

}
