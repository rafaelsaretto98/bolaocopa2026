import { db } from './firebase.js';

import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

export async function carregarJogos(){

    const snapshot =
        await getDocs(
            collection(db, 'jogos')
        );

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}

export async function adicionarJogo(jogo){

    return await addDoc(
        collection(db, 'jogos'),
        jogo
    );
}

export async function atualizarResultado(
    id,
    golsA,
    golsB,
    amarelosA,
    amarelosB,
    vermelhosA,
    vermelhosB
){

    await updateDoc(
        doc(db, 'jogos', id),
        {
            golsA,
            golsB,

            amarelosA,
            amarelosB,

            vermelhosA,
            vermelhosB,

            encerrado: true
        }
    );
}

export async function excluirJogo(id){

    await deleteDoc(
        doc(
            db,
            'jogos',
            id
        )
    );

}
