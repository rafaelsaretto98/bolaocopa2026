import { db } from './firebase.js';

import {
    collection,
    addDoc
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

export async function salvarParticipante(dados){

    return await addDoc(
        collection(
            db,
            'participantes'
        ),
        dados
    );
}
