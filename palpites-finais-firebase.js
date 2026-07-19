import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

export async function salvarPalpiteFinal(palpite){

    await addDoc(

        collection(db, "palpites-finais"),

        palpite

    );

}

export async function carregarPalpitesFinais(){

    const q = query(
        collection(db, "palpites-finais"),
        orderBy("criadoEm", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => doc.data());

}
