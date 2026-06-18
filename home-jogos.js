export async function carregarProximosJogos(){

const jogos =
await carregarJogos();

const futuros =
jogos
.filter(j => !j.encerrado)
.sort((a,b) => {

const dataA =
new Date(
`${a.data}T${a.horario}`
);

const dataB =
new Date(
`${b.data}T${b.horario}`
);

return dataA - dataB;

})
.slice(0,3);

const container =
document.getElementById(
'proximosJogos'
);

container.innerHTML = '';

futuros.forEach(jogo => {

const jogoBrasil =

jogo.timeA === 'Brasil' ||

jogo.timeB === 'Brasil';

const div =
document.createElement('div');

div.style.marginBottom =
'15px';

div.style.padding =
'10px';

div.style.borderRadius =
'8px';

if(jogoBrasil){

div.style.border =
'2px solid #facc15';

div.style.background =
'#fffbeb';
}

div.innerHTML = `

           <strong>
               ${
                   jogoBrasil
                   ? '⭐ '
                   : ''
               }

               ${jogo.timeA}
               x
               ${jogo.timeB}
           </strong>

           <br>

           📅 ${formatarData(jogo.data)}

           •

           🕒 ${jogo.horario}

       `;

container.appendChild(div);

});

}
carregarProximosJogos();

function formatarData(data){

const partes =
data.split('-');

return `${partes[2]}/${partes[1]}`;

}
