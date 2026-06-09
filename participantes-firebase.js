import { db } from './firebase.js';

import {
    collection,
    getDocs
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
