import { db }
from './firebase.js';

import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    orderBy,
    limit
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

            const adversario =
                document.getElementById(
                    'golsAdversario'
                ).value;

            if(
                !nome ||
                brasil === '' ||
                adversario === ''
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

                        golsBrasil:Number(brasil),

                        golsAdversario:Number(adversario),

                        selecaoA:'Brasil',

                        selecaoB:'Haiti',

                        jogo:'Brasil x Haiti',

                        criadoEm:new Date().toISOString()
                    }

                );

                document.getElementById(
                    'mensagemRelampago'
                ).innerHTML =
                    '✅ Palpite registrado!';
               
                document.getElementById(
                    
                            'nomeBolao'
                        ).value = '';
                        
                        document.getElementById(
                            'golsBrasil'
                        ).value = 0;
                        
                        document.getElementById(
                            'golsAdversario'
                        ).value = 0;
                //carregarPalpitesRelampago();

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

async function carregarPalpitesRelampago(){

    const container =
        document.getElementById(
            'listaPalpitesRelampago'
        );

    if(!container) return;

    try{

        const q =
        query(
        collection(db, 'placar-relampago'),
        where('jogo', '==', 'Brasil x Haiti'),
        orderBy('criadoEm', 'desc'),
        limit(20)
    );

        const snapshot =
            await getDocs(q);

        container.innerHTML = '';

        snapshot.forEach(doc => {

            const p =
                doc.data();

            const golsBrasil =
            p.golsBrasil ?? p.brasil;

            const golsAdversario =
            p.golsAdversario ?? p.marrocos;

            container.innerHTML += `

                <div style="
                    padding:10px;
                    margin-bottom:8px;
                    border-bottom:1px solid #e5e7eb;
                ">

                    <strong>
                        ${p.nome}
                    </strong>

                    <br>

                    ${p.selecaoA === 'Brasil' ? '🇧🇷' : ''}

                    ${golsBrasil}

                    x

                    ${golsAdversario}

                    ${p.selecaoB === 'Haiti' ? '🇭🇹' : p.selecaoB}

                </div>

            `;

        });

    }
    catch(erro){

        console.error(erro);

    }

}

carregarPalpitesRelampago();
