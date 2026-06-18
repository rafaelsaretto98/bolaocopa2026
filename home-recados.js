export async function carregarUltimoRecado(){

const recados =
await carregarRecados();

const container =
document.getElementById(
'ultimoRecado'
);

if(
!recados ||
recados.length === 0
){

container.innerHTML =
'Nenhum recado ainda.';

return;

}

const ultimo =
recados[
recados.length - 1
];



container.innerHTML = `

   <div style="
       background:#f8fafc;
       padding:15px;
       border-radius:12px;
       margin-bottom:15px;
       border-left:5px solid #2563eb;
       font-style:italic;
       line-height:1.5;
   ">
       "${ultimo.texto}"
   </div>

   <div style="
       font-weight:700;
       color:#1e3a8a;
       text-align:right;
   ">
       — ${ultimo.nome}
   </div>

`;
}

carregarUltimoRecado();
