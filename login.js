import { login }
from './auth.js';

document
.getElementById('entrar')
.onclick = async () => {

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

        alert(
            'Usuário ou senha inválidos.'
        );

    }

};
