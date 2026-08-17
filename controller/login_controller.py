from model.usuario_model import Usuario
from werkzeug.security import check_password_hash


def autenticar_usuario(login, senha):

    usuario = Usuario.query.filter(
        (Usuario.email == login) |
        (Usuario.nome == login)
    ).first()

    if not usuario:
        return False

    senha_correta = check_password_hash(
        usuario.senha,
        senha
    )

    if not senha_correta:
        return False

    return usuario