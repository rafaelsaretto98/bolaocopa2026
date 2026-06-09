import { db } from './firebase.js';

import {
    collection,
    addDoc,
    getDocs
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

export async function carregarRecados(){

    const snapshot =
        await getDocs(
            collection(
                db,
                'recados'
            )
        );

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

}

export async function adicionarRecado(recado){

    await addDoc(
        collection(
            db,
            'recados'
        ),
        recado
    );

}
