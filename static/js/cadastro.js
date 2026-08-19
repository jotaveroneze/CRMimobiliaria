document.addEventListener('DOMContentLoaded', function () {

    const contador = document.getElementById('contador');

    if (!contador) {
        return;
    }

    let segundos = 3;

    const intervalo = setInterval(function () {

        segundos--;

        contador.textContent = segundos;

        if (segundos <= 0) {

            clearInterval(intervalo);

            window.location.href = '/';

        }

    }, 1000);

});