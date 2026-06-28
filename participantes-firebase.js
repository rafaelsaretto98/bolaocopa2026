import { db } from './firebase.js';

import {
    collection,
    getDocs,
    doc,
    updateDoc
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

export async function carregarParticipantes(){

    const snapshot =
        await getDocs(
            collection(
                db,
                'participantes'
            )
        );

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}

export async function atualizarParticipante(participante){

    const dados = {
        ...participante
    };

    delete dados.id;

    await updateDoc(

        doc(
            db,
            "participantes",
            participante.id
        ),

        dados

    );

}
