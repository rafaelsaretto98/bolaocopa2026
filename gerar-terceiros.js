import fs from 'fs';

const texto = fs.readFileSync('anexo-fifa.txt','utf8');

const linhas =
texto
.split('\n')
.map(l=>l.trim())
.filter(l=>l.length);

const tabela = {};

for(let i=1;i<linhas.length;i++){

    const partes =
    linhas[i]
        .split(/\s+/);

    if(partes.length < 9)
        continue;

    const grupos = partes
        .slice(1)
        .map(x=>x.substring(1))
        .sort()
        .join('');

    tabela[grupos]={

        "3ABCDF": partes[1].substring(1),
        "3CDFGH": partes[2].substring(1),
        "3BEFIJ": partes[3].substring(1),
        "3AEHIJ": partes[4].substring(1),
        "3CEFHI": partes[5].substring(1),
        "3EHIJK": partes[6].substring(1),
        "3EFGIJ": partes[7].substring(1),
        "3DEIJL": partes[8].substring(1)

    };

}

const saida =
`export const tabelaTerceiros = ${
JSON.stringify(tabela,null,4)
};`;

fs.writeFileSync(
'terceiros-config.js',
saida
);

console.log('Arquivo criado.');
