if (
    localStorage.getItem('adminLogado')
    !== 'true'
){
    window.location.href = 'login.html';
}

let jogosSalvos =
    JSON.parse(
        localStorage.getItem(
            'jogosCopa2026'
        )
    );

if(!jogosSalvos){

    jogosSalvos = jogos;

    localStorage.setItem(
        'jogosCopa2026',
        JSON.stringify(jogos)
    );
}

const lista =
    document.getElementById('listaJogos');

jogosSalvos.forEach(jogo => {

    const card =
        document.createElement('div');

    card.className = 'regras-card';

    card.innerHTML = `

        <h3>
            Grupo ${jogo.grupo}
        </h3>

        <p>
            📅 ${jogo.data}
        </p>

        <p>
            🏟 ${jogo.estadio}
        </p>

        <p>
            📍 ${jogo.cidade}
        </p>

        <div style="
            display:flex;
            gap:10px;
            align-items:center;
        ">

            <strong>${jogo.timeA}</strong>

                <input
                    type="number"
                    min="0"
                    class="golsA"
                    data-id="${jogo.id}"
                    value="${jogo.golsA}"
                    style="width:60px"
                >

                x

                <input
                    type="number"
                    min="0"
                    class="golsB"
                    data-id="${jogo.id}"
                    value="${jogo.golsB}"
                    style="width:60px"
                >

                <br><br>

                <button
                    class="salvarJogo"
                    data-id="${jogo.id}"
                >
                    💾 Salvar Resultado
                </button>

            <strong>${jogo.timeB}</strong>

        </div>

    `;

    lista.appendChild(card);

    const botao =
    card.querySelector('.salvarJogo');

botao.onclick = () => {

    const golsA =
        card.querySelector('.golsA').value;

    const golsB =
        card.querySelector('.golsB').value;

    const jogosSalvos =
        JSON.parse(
            localStorage.getItem(
                'jogosCopa2026'
            )
        ) || jogos;

    const jogoSalvar =
        jogosSalvos.find(
            j => j.id == jogo.id
        );

    jogoSalvar.golsA = golsA;
    jogoSalvar.golsB = golsB;

    localStorage.setItem(
        'jogosCopa2026',
        JSON.stringify(jogosSalvos)
    );

    alert('Resultado salvo.');
};

});