import {
    salvarParticipante,
    participanteExiste
}
from './firestore.js';

document.addEventListener('DOMContentLoaded', () => {

// 1. Dicionário de Grupos
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

// 2. GABARITO OFICIAL (Altere no final do campeonato para calcular)
const resultadosOficiais = {
    A: { '1º': 'México', '2º': 'Coreia do Sul', '3º': 'Chéquia', '4º': 'África do Sul' },
    B: { '1º': 'Suíça', '2º': 'Canadá', '3º': 'Catar', '4º': 'Bósnia e Herzegovina' },
    C: { '1º': 'Brasil', '2º': 'Escócia', '3º': 'Marrocos', '4º': 'Haiti' },
    D: { '1º': 'Estados Unidos', '2º': 'Austrália', '3º': 'Paraguai', '4º': 'Turquia' },
    E: { '1º': 'Alemanha', '2º': 'Equador', '3º': 'Costa do Marfim', '4º': 'Curaçao' },
    F: { '1º': 'Holanda', '2º': 'Japão', '3º': 'Suécia', '4º': 'Tunísia' },
    G: { '1º': 'Bélgica', '2º': 'Irã', '3º': 'Egito', '4º': 'Nova Zelândia' },
    H: { '1º': 'Espanha', '2º': 'Uruguai', '3º': 'Cabo Verde', '4º': 'Arábia Saudita' },
    I: { '1º': 'França', '2º': 'Noruega', '3º': 'Senegal', '4º': 'Iraque' },
    J: { '1º': 'Argentina', '2º': 'Áustria', '3º': 'Argélia', '4º': 'Jordânia' },
    K: { '1º': 'Portugal', '2º': 'Colômbia', '3º': 'Uzbequistão', '4º': 'RD Congo' },
    L: { '1º': 'Inglaterra', '2º': 'Croácia', '3º': 'Gana', '4º': 'Panamá' }
};

const coresPaises = {
    'México': '#006847, #ce1126', 'África do Sul': '#007749, #ffb81c', 'Coreia do Sul': '#c60c30, #0047a0', 'Chéquia': '#11457e, #d7141a',
    'Canadá': '#d50000, #ff0000', 'Bósnia e Herzegovina': '#002395, #fecb00', 'Catar': '#8a1538, #6d102c', 'Suíça': '#ff0000, #cc0000',
    'Brasil': '#009b3a, #fedf00', 'Marrocos': '#c1272d, #006233', 'Haiti': '#00209f, #d21034', 'Escócia': '#005eb8, #004b93',
    'Estados Unidos': '#002868, #bf0a30', 'Paraguai': '#d52b1e, #0038a8', 'Austrália': '#008751, #fcd116', 'Turquia': '#e30a17, #b30000',
    'Alemanha': '#000000, #dd0000', 'Curaçao': '#002b7f, #f9e814', 'Costa do Marfim': '#f77f00, #009e60', 'Equador': '#ffdd00, #034ea2',
    'Holanda': '#ff4f00, #cc3f00', 'Japão': '#000555, #bc002d', 'Suécia': '#004b87, #ffcd00', 'Tunísia': '#e70013, #b30000',
    'Bélgica': '#e30613, #000000', 'Egito': '#ce1126, #000000', 'Irã': '#239f40, #da0000', 'Nova Zelândia': '#000000, #444444',
    'Espanha': '#aa151b, #f1bf00', 'Cabo Verde': '#003893, #cf2027', 'Arábia Saudita': '#006c35, #004d25', 'Uruguai': '#55b5e5, #0038a8',
    'França': '#002395, #ed2939', 'Senegal': '#00853f, #e31b23', 'Iraque': '#ce1126, #007a3d', 'Noruega': '#ba0c2f, #00205b',
    'Argentina': '#43a1d5, #ffffff', 'Argélia': '#006233, #d21034', 'Áustria': '#ed2939, #c1222e', 'Jordânia': '#000000, #ce1126',
    'Portugal': '#046a38, #da291c', 'RD Congo': '#007fff, #ce1021', 'Uzbequistão': '#0099b5, #1eb53a', 'Colômbia': '#fcd116, #003893',
    'Inglaterra': '#ce1126, #ffffff', 'Croácia': '#ff0000, #ffffff', 'Gana': '#ce1126, #006b3f', 'Panamá': '#005293, #d21034'
};

const c = document.getElementById('container');
let dragged = null;
let timeSelecionadoMobile = null; 
let festaDisparada = false; 

function animarElemento(elemento) {
    elemento.classList.remove('animate-pop');
    void elemento.offsetWidth; 
    elemento.classList.add('animate-pop');
}

let indexAtraso = 0; 
for(const g in grupos){
    const card = document.createElement('div');
    card.className = 'grupo';
    card.style.animationDelay = `${indexAtraso * 0.08}s`;
    indexAtraso++;

    card.innerHTML = `<h3>Grupo ${g}</h3><div class="area"><div class="sel" data-grupo="${g}"><h4>Seleções</h4></div><div class="cla"><h4>Classificação</h4></div></div>`;
    c.appendChild(card);
    const sel = card.querySelector('.sel');
    const cla = card.querySelector('.cla');

    grupos[g].forEach(t => {
        const d = document.createElement('div');
        d.className = 'time'; 
        d.draggable = true; 
        d.textContent = t;
        d.dataset.grupo = g;
        if(coresPaises[t]) d.style.backgroundImage = `linear-gradient(135deg, ${coresPaises[t]})`;
        sel.appendChild(d);
    });

    ['1º','2º','3º','4º'].forEach(p => {
        const s = document.createElement('div');
        s.className = 'slot';
        s.dataset.grupo = g;
        s.dataset.pos = p;
        s.innerHTML = `<strong>${p} Lugar</strong>`;
        cla.appendChild(s);
    });
}

// ARRASTAR
document.addEventListener('dragstart', e => { if(e.target.classList.contains('time')) dragged = e.target; });
document.addEventListener('dragover', e => { const slot = e.target.closest('.slot'); if(slot){ e.preventDefault(); slot.classList.add('over'); } });
document.addEventListener('dragleave', e => { const slot = e.target.closest('.slot'); if(slot) slot.classList.remove('over'); });
document.addEventListener('dragover', e => { const sel = e.target.closest('.sel'); if(sel){ e.preventDefault(); sel.classList.add('over-sel'); } });
document.addEventListener('dragleave', e => { const sel = e.target.closest('.sel'); if(sel) sel.classList.remove('over-sel'); });

document.addEventListener('drop', e => {
    const slot = e.target.closest('.slot');
    const sel = e.target.closest('.sel');
    e.preventDefault();

    if(slot){
        slot.classList.remove('over');
        if(dragged.dataset.grupo !== slot.dataset.grupo) { alert(`Esta equipa pertence ao Grupo ${dragged.dataset.grupo}!`); return; }
        const existing = slot.querySelector('.time');
        if(existing) existing.closest('.grupo').querySelector('.sel').appendChild(existing);
        
        slot.appendChild(dragged);
        const txt = slot.querySelector('strong');
        if(txt) txt.style.display = 'none';
        
        animarElemento(dragged); 
        updateProgress();
    }

    if(sel){
        sel.classList.remove('over-sel');
        if(dragged.dataset.grupo !== sel.dataset.grupo) return; 
        const antigoSlot = dragged.closest('.slot');
        sel.appendChild(dragged);
        if(antigoSlot && antigoSlot.querySelector('strong')) antigoSlot.querySelector('strong').style.display = 'block';
        updateProgress();
    }
});

// CLIQUE / TOQUE
document.addEventListener('click', e => {
    if(e.target.classList.contains('time') && e.target.closest('.slot')){
        const slot = e.target.closest('.slot');
        const sel = e.target.closest('.grupo').querySelector('.sel');
        sel.appendChild(e.target);
        
        const txt = slot.querySelector('strong');
        if(txt) txt.style.display = 'block';
        updateProgress();
        return;
    }

    if(e.target.classList.contains('time') && e.target.closest('.sel')){
        if(timeSelecionadoMobile) timeSelecionadoMobile.classList.remove('selecionado');
        timeSelecionadoMobile = e.target;
        timeSelecionadoMobile.classList.add('selecionado');
        return;
    }

    const slotVazio = e.target.closest('.slot');
    if(slotVazio && timeSelecionadoMobile){
        if(timeSelecionadoMobile.dataset.grupo !== slotVazio.dataset.grupo) {
            alert(`Esta equipa pertence ao Grupo ${timeSelecionadoMobile.dataset.grupo}!`);
            timeSelecionadoMobile.classList.remove('selecionado');
            timeSelecionadoMobile = null;
            return;
        }

        const existing = slotVazio.querySelector('.time');
        if(existing) existing.closest('.grupo').querySelector('.sel').appendChild(existing);
        
        slotVazio.appendChild(timeSelecionadoMobile);
        const txt = slotVazio.querySelector('strong');
        if(txt) txt.style.display = 'none';
        
        animarElemento(timeSelecionadoMobile); 
        timeSelecionadoMobile.classList.remove('selecionado');
        timeSelecionadoMobile = null;
        updateProgress();
    }
});

// MEMÓRIA
function updateProgress(){
    let completos = 0;
    const estadoSalvar = {};

    document.querySelectorAll('.grupo').forEach(g => {
        const idGrupo = g.querySelector('.sel').dataset.grupo;
        estadoSalvar[idGrupo] = {};
        const filled = g.querySelectorAll('.slot .time').length;
        
        g.querySelectorAll('.slot').forEach(s => {
            if(!s.querySelector('.time') && s.querySelector('strong')){
                s.querySelector('strong').style.display = 'block';
            } else if(s.querySelector('.time')) {
                estadoSalvar[idGrupo][s.dataset.pos] = s.querySelector('.time').textContent;
            }
        });
        
        if(filled === 4) completos++;
    });

    document.getElementById('progressText').textContent = `${completos}/12 grupos concluídos`;
    document.getElementById('progressBar').value = completos;
    document.getElementById('copiarCodigo').disabled = completos !== 12;

    localStorage.setItem('bolaoCopa2026', JSON.stringify(estadoSalvar));

    if(completos === 12 && !festaDisparada) {
        festaDisparada = true;
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    } else if (completos < 12) {
        festaDisparada = false;
    }
}

function carregarEstado(){
    const salvo = localStorage.getItem('bolaoCopa2026');
    if(!salvo) return;
    
    const estado = JSON.parse(salvo);
    for(const g in estado) {
        const grupoDiv = document.querySelector(`.sel[data-grupo="${g}"]`).closest('.grupo');
        for(const pos in estado[g]) {
            const nomeTime = estado[g][pos];
            const timesNaBase = Array.from(grupoDiv.querySelectorAll('.sel .time'));
            const timeElement = timesNaBase.find(t => t.textContent === nomeTime);
            
            if(timeElement) {
                const slot = grupoDiv.querySelector(`.slot[data-pos="${pos}"]`);
                slot.appendChild(timeElement);
                const txt = slot.querySelector('strong');
                if(txt) txt.style.display = 'none';
            }
        }
    }
    updateProgress();
}

carregarEstado();


// ----------------------------------------------------
// NOVA FUNÇÃO: COPIAR CÓDIGO PARA O ADMIN
// ----------------------------------------------------
document.getElementById('copiarCodigo').onclick = () => {

    const nome = document.getElementById('nome').value.trim();

    if (!nome) {
        alert('Por favor, informe seu nome.');
        return;
    }

    const salvo = localStorage.getItem('bolaoCopa2026');

    if (!salvo) {
        alert('Nenhum palpite encontrado.');
        return;
    }

    const estado = JSON.parse(salvo);

    let faltamGrupos = false;

    for (const grupo in estado) {
        if (Object.keys(estado[grupo]).length !== 4) {
            faltamGrupos = true;
            break;
        }
    }

    if (faltamGrupos) {
        alert('Preencha todos os grupos antes de finalizar.');
        return;
    }

    await salvarParticipante(codigo);

    const codigoTexto = JSON.stringify(codigo, null, 2);


};

function gerarHash() {

    const caracteres =
        'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

    let hash = '';

    for (let i = 0; i < 8; i++) {
        hash += caracteres.charAt(
            Math.floor(Math.random() * caracteres.length)
        );
    }

    return hash;
}

});
