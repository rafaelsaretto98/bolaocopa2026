import {
    criarNavbar
}
from "./navbar.js";

import {
    carregarJogosMataMata
}
from "./mata-mata-firebase.js";

import {
    desenharChaveamento
}
from "./mata-mata-v2-layout.js";

document.getElementById(
    "navbar"
).innerHTML =
    criarNavbar("mata-mata");

async function iniciar(){

    const jogos =

        await carregarJogosMataMata();

    console.log(jogos);

    desenharChaveamento(jogos);

}

iniciar();
