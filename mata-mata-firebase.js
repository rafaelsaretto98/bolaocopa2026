import { db }
from './firebase.js';

import {
    collection,
    getDocs,
    doc,
    setDoc,
    updateDoc,
    query,
    where
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

export async function salvarJogosMataMata(jogos){

    const existentes =
        await carregarJogosMataMata();

    if(existentes.length > 0){

        console.log(
            "Mata-mata já inicializado."
        );

        return;

    }

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

    console.log(
        "Mata-mata criado com sucesso."
    );

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

export async function carregarJogosPorFase(fase){

    const q =
        query(

            collection(
                db,
                "mata-mata"
            ),

            where(
                "fase",
                "==",
                fase
            )

        );

   const snapshot =
    await getDocs(q);

const jogos =
    snapshot.docs.map(

        doc => doc.data()

    );

jogos.sort(

    (a,b)=>a.ordem-b.ordem

);

return jogos;

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
