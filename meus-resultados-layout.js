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
