import { db } from './firebase.js';

import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    query,
    where
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

export async function excluirParticipanteFirebase(id){

    await deleteDoc(
        doc(
            db,
            'participantes',
            id
        )
    );
}
