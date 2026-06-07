import { login }
from './auth.js';

document
.getElementById('entrar')
.onclick = async () => {
    console.log('Botão clicado');

    const email =
        document.getElementById('email').value;

    const senha =
        document.getElementById('senha').value;

    try{

        await login(
            email,
            senha
        );

        window.location.href =
            'admin.html';

    }catch(e){
    
        console.error(e);
    
        alert(
            'Erro: ' + e.message
        );
    
    }

};
