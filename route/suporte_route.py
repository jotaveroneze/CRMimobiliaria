from flask import Blueprint

from controller.suporte_controller import enviar_suporte


suporte_bp = Blueprint(
    'suporte',
    __name__,
    url_prefix='/suporte'
)


@suporte_bp.route(
    '/enviar',
    methods=['POST']
)
def enviar():

    return enviar_suporte()