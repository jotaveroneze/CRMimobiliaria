from flask import Blueprint, render_template, request, redirect, url_for, session
from flask_login import login_user
from controller.login_controller import autenticar_usuario


login_route = Blueprint('login', __name__)


@login_route.route('/', methods=['GET', 'POST'])
def login():

    if request.method == 'POST':

        login_digitado = request.form['login']
        senha = request.form['senha']

        usuario = autenticar_usuario(
            login_digitado,
            senha
        )

        if not usuario:
            return render_template(
                'login.html',
                erro='Nome, e-mail ou senha incorretos.'
            )

        login_user(usuario)

        session['usuario_id'] = usuario.id
        session['usuario_nome'] = usuario.nome
        session['usuario_email'] = usuario.email
        session['tipo_usuario'] = usuario.tipo_usuario

        # CEO
        if usuario.tipo_usuario == 1:
            return redirect(
                url_for('dashboard.dashboard_ceo_route')
            )

        # Usuário comum
        return redirect(
            url_for('dashboard.dashboard_usuario')
        )

    return render_template('login.html')