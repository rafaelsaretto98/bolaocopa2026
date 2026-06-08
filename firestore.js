import { db } from './firebase.js';

import {
    collection,
    addDoc,
    getDocs,
    query,
    where
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

export async function participanteExiste(nome){

    const q = query(
        collection(db, 'participantes'),
        where('nome', '==', nome)
    );

    const resultado =
        await getDocs(q);

    return !resultado.empty;
}

export async function salvarParticipante(dados){

    return await addDoc(
        collection(db, 'participantes'),
        dados
    );
}
