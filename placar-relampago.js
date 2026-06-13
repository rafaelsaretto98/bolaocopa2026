import { db }
from './firebase.js';

import {
    collection,
    addDoc
}
from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js';

const btn =
    document.getElementById(
        'enviarPalpiteRelampago'
    );

if(btn){

    btn.addEventListener(
        'click',
        async () => {

            const nome =
                document.getElementById(
                    'nomeBolao'
                ).value.trim();

            const brasil =
                document.getElementById(
                    'golsBrasil'
                ).value;

            const marrocos =
                document.getElementById(
                    'golsMarrocos'
                ).value;

            if(
                !nome ||
                brasil === '' ||
                marrocos === ''
            ){
                alert(
                    'Preencha todos os campos.'
                );
                return;
            }

            try{

                await addDoc(

                    collection(
                        db,
                        'placar-relampago'
                    ),

                    {
                        nome,
                        brasil:Number(brasil),
                        marrocos:Number(marrocos),
                        jogo:'Brasil x Marrocos',
                        criadoEm:
                            new Date()
                            .toISOString()
                    }

                );

                document.getElementById(
                    'mensagemRelampago'
                ).innerHTML =
                    '✅ Palpite registrado!';

            }
            catch(erro){

                console.error(erro);

                alert(
                    'Erro ao salvar.'
                );

            }

        }
    );

}
