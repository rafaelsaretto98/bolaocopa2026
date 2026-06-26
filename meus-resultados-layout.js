export function desenharHistoricoGrupos(

    classificacoesOficiais,

    palpitesParticipante

){

    const container =
        document.getElementById(
            "historicoGrupos"
        );

    container.innerHTML = "";

    classificacoesOficiais.forEach(grupo=>{

        const palpite =
            palpitesParticipante?.[grupo.grupo] || [];

        container.appendChild(

            criarCardGrupo(

                grupo,

                palpite

            )

        );

    });

}

function criarCardGrupo(

    grupo,

    palpite

){

    const card =
        document.createElement("div");

    card.className =
        "regras-card";

        card.innerHTML = `

<h2>

🏆 Grupo ${grupo.grupo}

</h2>

`;


        const posicoes = [

        "🥇",

        "🥈",

        "🥉",

        "4️⃣"

    ];

    grupo.times.forEach(

        (time,index)=>{

            const linha =
                document.createElement(
                    "div"
                );

            linha.className =
                "linha-grupo";

                        const acertou =

                palpite[index] ===

                time.time;

                        linha.innerHTML = `

<span>

${posicoes[index]}

</span>

<img

class="bandeira-mata"

src="img/band_${time.time}.png"

onerror="this.src='img/band_placeholder.png'"

>

<span>

${time.time}

</span>

<span class="${
acertou ?
"acertou" :
"errou"
}">

${acertou ?

"✅"

:

"❌"

}

</span>

`;

                        card.appendChild(
                linha
            );

        }

    );

        let pontos = 0;

    grupo.times.forEach(

        (time,index)=>{

            if(

                palpite[index] ===

                time.time

            ){

                pontos++;

            }

        }

    );

        const rodape =
        document.createElement(
            "div"
        );

    rodape.className =
        "resultado-grupo";

    rodape.innerHTML = `

<strong>

${pontos}

/

4 pontos

</strong>

`;

        card.appendChild(
        rodape
    );

    return card;

}
