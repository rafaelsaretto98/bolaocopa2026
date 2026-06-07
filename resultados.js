const grupos = {
    A: ['México', 'África do Sul', 'Coreia do Sul', 'Chéquia'],
    B: ['Canadá', 'Bósnia e Herzegovina', 'Catar', 'Suíça'],
    C: ['Brasil', 'Marrocos', 'Haiti', 'Escócia'],
    D: ['Estados Unidos', 'Paraguai', 'Austrália', 'Turquia'],
    E: ['Alemanha', 'Curaçao', 'Costa do Marfim', 'Equador'],
    F: ['Holanda', 'Japão', 'Suécia', 'Tunísia'],
    G: ['Bélgica', 'Egito', 'Irã', 'Nova Zelândia'],
    H: ['Espanha', 'Cabo Verde', 'Arábia Saudita', 'Uruguai'],
    I: ['França', 'Senegal', 'Iraque', 'Noruega'],
    J: ['Argentina', 'Argélia', 'Áustria', 'Jordânia'],
    K: ['Portugal', 'RD Congo', 'Uzbequistão', 'Colômbia'],
    L: ['Inglaterra', 'Croácia', 'Gana', 'Panamá']
};

const STORAGE_KEY = 'resultadosOficiais';

const estruturaPadrao = {
    A:{'1º':'','2º':'','3º':'','4º':''},
    B:{'1º':'','2º':'','3º':'','4º':''},
    C:{'1º':'','2º':'','3º':'','4º':''},
    D:{'1º':'','2º':'','3º':'','4º':''},
    E:{'1º':'','2º':'','3º':'','4º':''},
    F:{'1º':'','2º':'','3º':'','4º':''},
    G:{'1º':'','2º':'','3º':'','4º':''},
    H:{'1º':'','2º':'','3º':'','4º':''},
    I:{'1º':'','2º':'','3º':'','4º':''},
    J:{'1º':'','2º':'','3º':'','4º':''},
    K:{'1º':'','2º':'','3º':'','4º':''},
    L:{'1º':'','2º':'','3º':'','4º':''}
};

let resultados =
    JSON.parse(
        localStorage.getItem(STORAGE_KEY)
    ) || estruturaPadrao;

const container =
    document.getElementById('containerResultados');

for(const grupo in grupos){

    const card =
        document.createElement('div');

    card.className = 'grupo';

    let html =
        `<h3>Grupo ${grupo}</h3>`;

    ['1º','2º','3º','4º'].forEach(pos => {

        html += `
            <div style="padding:10px">

                <label>${pos}</label>

                <select
                    data-grupo="${grupo}"
                    data-pos="${pos}"
                >

                    <option value="">
                        Selecione
                    </option>

                    ${grupos[grupo]
                        .map(time => `
                            <option
                                value="${time}"
                                ${
                                    resultados[grupo][pos] === time
                                        ? 'selected'
                                        : ''
                                }
                            >
                                ${time}
                            </option>
                        `)
                        .join('')
                    }

                </select>

            </div>
        `;
    });

    card.innerHTML = html;

    container.appendChild(card);
}

document
.getElementById('salvarResultados')
.onclick = () => {

    document
        .querySelectorAll('select')
        .forEach(select => {

            const grupo =
                select.dataset.grupo;

            const pos =
                select.dataset.pos;

            resultados[grupo][pos] =
                select.value;
        });

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(resultados)
    );

    document
        .getElementById('statusResultados')
        .innerHTML =
        '✅ Resultados salvos com sucesso';
};