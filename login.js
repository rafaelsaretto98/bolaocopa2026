import { login } from './auth.js';

document
    .getElementById('entrar')
    .addEventListener('click', async (e) => {

        e.preventDefault();

        const email =
            document.getElementById('email').value.trim();

        const senha =
            document.getElementById('senha').value;

        if (!email || !senha) {
            alert('Informe email e senha.');
            return;
        }

        try {

            await login(email, senha);

            localStorage.setItem(
                'adminLogado',
                'true'
            );

            window.location.href =
                'admin.html';

        } catch (erro) {

            console.error(erro);

            alert(
                'Erro ao fazer login:\n\n' +
                erro.message
            );
        }

    });
