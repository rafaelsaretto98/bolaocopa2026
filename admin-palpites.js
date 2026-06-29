import {

    criarNavbar

} from "./navbar.js";

import {

    carregarParticipantes

} from "./participantes-firebase.js";

document.getElementById(

    "navbar"

).innerHTML =

    criarNavbar("");

async function iniciar(){

    const participantes =

        await carregarParticipantes();

    console.log(participantes);

}

iniciar();
