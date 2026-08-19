document.addEventListener('DOMContentLoaded', function () {

    const senha = document.getElementById('senha');
    const mostrarSenha = document.getElementById('mostrarSenha');

    if (!senha || !mostrarSenha) {
        return;
    }

    mostrarSenha.addEventListener('click', function () {

        if (senha.type === 'password') {

            senha.type = 'text';

            mostrarSenha.textContent = 'Ocultar';

        } else {

            senha.type = 'password';

            mostrarSenha.textContent = 'Mostrar';

        }

    });

});