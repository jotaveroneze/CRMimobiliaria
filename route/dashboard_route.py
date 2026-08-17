from flask import Blueprint, render_template, session, redirect, url_for


dashboard_route = Blueprint('dashboard', __name__)


@dashboard_route.route('/dashboard', methods=['GET'])
def dashboard():

    usuario_id = session.get('usuario_id')

    if usuario_id is None:
        return redirect(url_for('login.login'))

    return render_template(
        'dashboard.html',
        nome=session.get('usuario_nome')
    )