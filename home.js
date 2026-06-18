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

criarDashboard();

await carregarResumoBolao();

await carregarProximosJogos();

await carregarTopRanking();

await carregarUltimoRecado();
