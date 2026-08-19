from flask import Blueprint, render_template, request, redirect, url_for

from controller.cadastro_controller import (
    processar_cadastro,
    validar_codigo,
    cadastrar_usuario
)


cadastro_route = Blueprint('cadastro', __name__)


@cadastro_route.route('/cadastro', methods=['GET', 'POST'])
def cadastro():

    if request.method == 'POST':

        nome = request.form['nome']
        email = request.form['email']

        sucesso, erro = processar_cadastro(
            nome,
            email
        )

        if not sucesso:

            return render_template(
                'cadastro.html',
                erro=erro
            )

        return redirect(url_for('cadastro.codigo'))

    return render_template('cadastro.html')


@cadastro_route.route('/cadastro/codigo', methods=['GET', 'POST'])
def codigo():

    if request.method == 'POST':

        codigo_digitado = request.form['codigo']

        if validar_codigo(codigo_digitado):
            return redirect(url_for('cadastro.criar_senha'))

        return render_template(
            'codigo.html',
            erro='Código incorreto!'
        )

    return render_template('codigo.html')


@cadastro_route.route('/cadastro/criar-senha', methods=['GET', 'POST'])
def criar_senha():

    if request.method == 'POST':

        senha = request.form['senha']
        confirmar_senha = request.form['confirmar_senha']

        sucesso, erro = cadastrar_usuario(
            senha,
            confirmar_senha
        )

        if not sucesso:
            return render_template(
                'criar_senha.html',
                erro=erro
            )

        return redirect(url_for('login'))

    return render_template('criar_senha.html')