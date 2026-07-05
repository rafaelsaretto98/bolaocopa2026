import { db }
from "./firebase.js";
 
import {
    collection,
    query,
    where,
    getDocs,
    updateDoc,
    doc
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

export async function carregarParticipante(nome){

    const q =
        query(
            collection(db,"participantes"),
            where("nome","==",nome)
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

export async function salvarPalpitesMataMata(

    nome,

    novosPalpites

){

    const participante =
        await carregarParticipante(nome);

    if(!participante){

        throw new Error(
            "Participante não encontrado."
        );

    }

    const palpites = {

        ...(participante.palpitesMataMata || {}),

        ...novosPalpites

    };

    await updateDoc(

        doc(
            db,
            "participantes",
            participante.id
        ),

        {

            palpitesMataMata:
                palpites

        }

    );

}

export async function salvarPalpiteAdmin(

    nome,

    idJogo,

    vencedor

){

    const participante =
        await carregarParticipante(nome);

    if(!participante){

        throw new Error(
            "Participante não encontrado."
        );

    }

    const palpites = {

        ...(participante.palpitesMataMata || {}),

        [idJogo]: vencedor

    };

    await updateDoc(

        doc(
            db,
            "participantes",
            participante.id
        ),

        {

            palpitesMataMata: palpites

        }

    );

}
