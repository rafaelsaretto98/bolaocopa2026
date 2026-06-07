const SENHA_ADMIN = "copa2026";

document.getElementById('entrar').onclick = () => {

    const senha =
        document.getElementById('senha').value;

    if(senha === SENHA_ADMIN){

        localStorage.setItem(
            'adminLogado',
            'true'
        );

        window.location.href =
            'admin.html';

    } else {

        alert('Senha incorreta.');

    }
};