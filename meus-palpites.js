const participante = {

    nome,

    pontosGrupo:0,

    pontosMataMata:0,

    total:0

};

document.getElementById(

    "dashboardParticipante"

).innerHTML = `

<h2>

👤 ${participante.nome}

</h2>

<div class="dashboard-pontos">

    <div>

        <strong>

            🏆 Grupo

        </strong>

        <br>

        ${participante.pontosGrupo}

    </div>

    <div>

        <strong>

            ⚽ Mata-Mata

        </strong>

        <br>

        ${participante.pontosMataMata}

    </div>

    <div>

        <strong>

            ⭐ Total

        </strong>

        <br>

        ${participante.total}

    </div>

</div>

`;
