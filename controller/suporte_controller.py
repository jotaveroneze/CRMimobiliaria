from flask import request, jsonify
from flask_login import current_user
from flask import current_app
from flask_mail import Message

from extensions import mail


def enviar_suporte():

    try:

        # ==============================
        # DADOS RECEBIDOS
        # ==============================

        dados = request.get_json()

        descricao = dados.get('descricao', '').strip()


        # ==============================
        # VALIDAÇÃO
        # ==============================

        if not descricao:

            return jsonify({
                'erro': 'A descrição é obrigatória.'
            }), 400


        if not current_user.is_authenticated:

            return jsonify({
                'erro': 'Usuário não autenticado.'
            }), 401


        # ==============================
        # DADOS DO USUÁRIO
        # ==============================

        nome_usuario = current_user.nome
        email_usuario = current_user.email


        print('USUÁRIO:', nome_usuario)
        print('EMAIL:', email_usuario)
        print('DESCRIÇÃO:', descricao)


        # ==============================
        # E-MAIL
        # ==============================

        mensagem = Message(
            subject='Nova solicitação de suporte - CRM Imobiliária',

            sender=current_app.config['MAIL_USERNAME'],

            recipients=[
                current_app.config['MAIL_USERNAME']
            ]
        )

        mensagem.body = f"""
        Nova solicitação de suporte

        ----------------------------------------

        Usuário:
        {nome_usuario}

        E-mail:
        {email_usuario}

        Descrição:
        {descricao}

        ----------------------------------------
        Mensagem enviada pelo sistema CRM Imobiliária.
        """


        # ==============================
        # ENVIO
        # ==============================

        mail.send(mensagem)


        print('E-MAIL ENVIADO COM SUCESSO')


        return jsonify({

            'sucesso': True,

            'mensagem':
                'Solicitação enviada com sucesso.'

        }), 200


    except Exception as erro:

        print(
            'ERRO AO ENVIAR E-MAIL:',
            erro
        )


        return jsonify({

            'erro':
                'Não foi possível enviar a solicitação.'

        }), 500