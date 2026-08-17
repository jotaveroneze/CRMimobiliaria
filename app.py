from flask import Flask, render_template
from flask_mail import Mail

from extensions import db
from model.usuario_model import Usuario
from model.tipo_imobiliaria_model import TipoImobiliaria

from route.cadastro_route import cadastro_route
from route.dashboard_route import dashboard_route
from route.login_route import login_route


app = Flask(__name__)

app.config['SECRET_KEY'] = '34692b781c4c7cfa89c6e09601dca96f41de9a8dec769aad8d1f74cb34b9a2f7'


# Banco de dados
app.config['SQLALCHEMY_DATABASE_URI'] = (
    'mysql+pymysql://root:@127.0.0.1:3306/banco_imobiliaria'
)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)


# E-mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'imobiliariacrm2026@gmail.com'
app.config['MAIL_PASSWORD'] = 'jrai kkuu rslt ixgy'

mail = Mail(app)


app.register_blueprint(cadastro_route)
app.register_blueprint(login_route)
app.register_blueprint(dashboard_route)

@app.route('/')
def login():
    return render_template('login.html')


if __name__ == '__main__':
    app.run(debug=True)