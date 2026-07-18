import { criarDashboard }
from './home-dashboard.js';

import { carregarResumoBolao }
from './home-resumo.js';

import { carregarProximosJogos }
from './home-jogos.js';

import { carregarTopRanking }
from './home-ranking.js';

import { carregarUltimoRecado }
from './home-recados.js';

import { iniciarPalpitesFinais }
from "./home-palpites.js";

import { criarNavbar }
from "./navbar.js";

document.getElementById("navbar").innerHTML =
    criarNavbar("inicio");

criarDashboard();

await carregarResumoBolao();

await carregarProximosJogos();

await carregarTopRanking();

await carregarUltimoRecado();

await iniciarPalpitesFinais();
