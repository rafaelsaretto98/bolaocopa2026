import { db } from './firebase.js';

import {
    collection,
    getDocs,
    doc,
    updateDoc,
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

import {
    query,
    where
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

export async function carregarParticipante(nome){

    const q =
        query(

            collection(
                db,
                "participantes"
            ),

            where(
                "nome",
                "==",
                nome
            )

        );

    const snapshot =
        await getDocs(q);

    if(snapshot.empty){

        return null;

    }

    return {

        id: snapshot.docs[0].id,

        ...snapshot.docs[0].data()

    };

}
