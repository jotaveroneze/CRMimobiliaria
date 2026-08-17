from extensions import db


class Usuario(db.Model):

    __tablename__ = 'usuario'

    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True
    )

    nome = db.Column(
        db.String(100),
        nullable=False
    )

    email = db.Column(
        db.String(150),
        nullable=False,
        unique=True
    )

    senha = db.Column(
        db.String(255),
        nullable=False
    )

    id_tipo_imobiliaria = db.Column(
        db.Integer,
        db.ForeignKey('tipo_imobiliaria.id'),
        nullable=True
    )

    tipo_usuario = db.Column(
        db.Integer,
        nullable=False,
        default=0
    )

    foto = db.Column(
        db.String(255),
        nullable=True
    )

    quantidade_vendas = db.Column(
        db.Integer,
        nullable=False,
        default=0
    )

    nota = db.Column(
        db.Integer,
        nullable=True
    )

    tempo_area = db.Column(
        db.Integer,
        nullable=True
    )

    whatsapp = db.Column(
        db.String(20),
        nullable=True
    )

    descricao = db.Column(
        db.Text,
        nullable=True
    )