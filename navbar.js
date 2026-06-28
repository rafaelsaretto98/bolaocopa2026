export const MENU = [

    {
        id:"inicio",
        nome:"Início",
        icone:"🏠",
        link:"home.html"
    },

    {
        id:"ranking",
        nome:"Ranking",
        icone:"🏆",
        link:"ranking.html"
    },

    {
        id:"jogos",
        nome:"Jogos",
        icone:"📅",
        link:"jogos.html"
    },

    {
        id:"classificacao",
        nome:"Classificação",
        icone:"📊",
        link:"classificacao.html"
    },

    {
        id:"mata",
        nome:"Mata-Mata",
        icone:"🏆",
        link:"mata-mata.html"
    },

    {
        id:"meus-palpites",
        nome:"Meus Palpites",
        icone:"👤",
        link:"meus-palpites.html"
    },

];

export function criarNavbar(paginaAtual){

    return `

<nav class="navbar">

${MENU.map(item=>`

<a

href="${item.link}"

class="${
item.id === paginaAtual
?
"active"
:
""
}"

>

${item.icone} ${item.nome}

</a>

`).join("")}

</nav>

`;

}
