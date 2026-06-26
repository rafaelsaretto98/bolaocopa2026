export function criarNavbar(paginaAtual){

    return `

<nav class="navbar">

<a href="index.html"
class="${
paginaAtual==="inicio"
?
"active"
:
""
}">

🌎 Início

</a>

<a href="classificacao.html"
class="${
paginaAtual==="classificacao"
?
"active"
:
""
}">

📊 Classificação

</a>

<a href="mata-mata.html"
class="${
paginaAtual==="mata"
?
"active"
:
""
}">

🏆 Mata-Mata

</a>

<a href="meus-palpites.html"
class="${
paginaAtual==="palpites"
?
"active"
:
""
}">

✍️ Meus Palpites

</a>

</nav>

`;

}
