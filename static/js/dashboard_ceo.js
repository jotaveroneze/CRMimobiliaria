document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // ELEMENTOS DO MODAL PRINCIPAL
    // ==========================================

    const btnAdicionar = document.getElementById(
        'btnAdicionarCategoria'
    );

    const modal = document.getElementById(
        'modalAdicionarImobiliaria'
    );

    const fecharModal = document.getElementById(
        'fecharModal'
    );

    const listaTipos = document.getElementById(
        'listaTiposImobiliaria'
    );


    // ==========================================
    // ELEMENTOS DO MODAL DE CADASTRO
    // ==========================================

    const btnNovoTipo = document.getElementById(
        'btnNovoTipo'
    );

    const modalCadastrarTipo = document.getElementById(
        'modalCadastrarTipo'
    );

    const fecharModalCadastrar = document.getElementById(
        'fecharModalCadastrar'
    );


    // ==========================================
    // ELEMENTOS DO FORMULÁRIO
    // ==========================================

    const fotoTipo = document.getElementById(
        'fotoTipo'
    );

    const previewFoto = document.getElementById(
        'previewFoto'
    );

    const previewImagem = document.getElementById(
        'previewImagem'
    );

    const formCadastrarTipo = document.getElementById(
        'formCadastrarTipo'
    );


    // ==========================================
    // ELEMENTOS DO CROP
    // ==========================================

    const areaCorte = document.getElementById(
        'areaCorte'
    );

    const imagemCorte = document.getElementById(
        'imagemCorte'
    );

    const confirmarCorte = document.getElementById(
        'confirmarCorte'
    );


    // ==========================================
    // VARIÁVEIS DO CROP
    // ==========================================

    let cropper = null;

    let arquivoCortado = null;


    console.log(
        'Dashboard CEO JS carregado'
    );


    // ==========================================
    // CARREGAR TIPOS DISPONÍVEIS
    // ==========================================

    async function carregarTiposDisponiveis() {

        listaTipos.innerHTML = `
            <p>Carregando...</p>
        `;


        try {

            const resposta = await fetch(
                '/dashboard/ceo/tipos-disponiveis'
            );


            const tipos = await resposta.json();


            listaTipos.innerHTML = '';


            if (tipos.length === 0) {

                listaTipos.innerHTML = `
                    <p>
                        Todas as categorias já foram adicionadas.
                    </p>
                `;

                return;

            }


            tipos.forEach(tipo => {

                const item =
                    document.createElement('div');


                item.classList.add(
                    'tipo-item'
                );


                item.innerHTML = `

                    <div class="tipo-info">

                        ${
                            tipo.foto
                            ? `
                                <img
                                    src="/static/imagens/tipos/${tipo.foto}"
                                    alt="${tipo.nome}"
                                >
                            `
                            : ''
                        }

                        <span>
                            ${tipo.nome}
                        </span>

                    </div>


                    <button
                        type="button"
                        onclick="adicionarTipo(${tipo.id})">

                        Adicionar

                    </button>

                `;


                listaTipos.appendChild(
                    item
                );

            });


        } catch (erro) {

            console.error(
                erro
            );


            listaTipos.innerHTML = `
                <p>
                    Erro ao carregar categorias.
                </p>
            `;

        }

    }


    // ==========================================
    // ABRIR MODAL PRINCIPAL
    // ==========================================

    btnAdicionar.addEventListener(
        'click',
        async () => {

            console.log(
                'Botão + clicado'
            );


            modal.classList.add(
                'ativo'
            );


            await carregarTiposDisponiveis();

        }
    );


    // ==========================================
    // FECHAR MODAL PRINCIPAL
    // ==========================================

    fecharModal.addEventListener(
        'click',
        () => {

            modal.classList.remove(
                'ativo'
            );

        }
    );


    modal.addEventListener(
        'click',
        (event) => {

            if (
                event.target === modal
            ) {

                modal.classList.remove(
                    'ativo'
                );

            }

        }
    );


    // ==========================================
    // ADICIONAR TIPO AO DASHBOARD
    // ==========================================

    window.adicionarTipo = async function(
        idTipo
    ) {

        console.log(
            'Adicionando tipo:',
            idTipo
        );


        try {

            const resposta = await fetch(
                '/dashboard/ceo/adicionar-tipo',
                {

                    method: 'POST',

                    headers: {
                        'Content-Type':
                            'application/json'
                    },

                    body: JSON.stringify({
                        id_tipo: idTipo
                    })

                }
            );


            const resultado =
                await resposta.json();


            console.log(
                'Resposta do servidor:',
                resultado
            );


            if (!resposta.ok) {

                alert(
                    resultado.erro ||
                    'Não foi possível adicionar a categoria.'
                );

                return;

            }


            if (
                resultado.sucesso
            ) {

                modal.classList.remove(
                    'ativo'
                );


                location.reload();

            }


        } catch (erro) {

            console.error(
                erro
            );


            alert(
                'Erro ao adicionar a categoria.'
            );

        }

    };


    // ==========================================
    // ABRIR MODAL DE NOVO TIPO
    // ==========================================

    btnNovoTipo.addEventListener(
        'click',
        () => {

            modal.classList.remove(
                'ativo'
            );


            modalCadastrarTipo.classList.add(
                'ativo'
            );

        }
    );


    // ==========================================
    // FECHAR MODAL DE NOVO TIPO
    // ==========================================

    fecharModalCadastrar.addEventListener(
        'click',
        () => {

            modalCadastrarTipo.classList.remove(
                'ativo'
            );

        }
    );


    // ==========================================
    // SELECIONAR FOTO
    // ==========================================

    fotoTipo.addEventListener(
        'change',
        () => {

            const arquivo =
                fotoTipo.files[0];


            if (!arquivo) {

                return;

            }


            // Limpa corte anterior

            arquivoCortado = null;


            // Se já existir um Cropper,
            // destrói antes de criar outro

            if (cropper) {

                cropper.destroy();

                cropper = null;

            }


            // Cria URL temporária

            const url =
                URL.createObjectURL(
                    arquivo
                );


            imagemCorte.src =
                url;


            // Mostra área de corte

            areaCorte.style.display =
                'block';


            // Esconde preview anterior

            previewFoto.style.display =
                'none';


            previewImagem.src =
                '';


            // Aguarda imagem carregar

            imagemCorte.onload = () => {

                cropper =
                    new Cropper(
                        imagemCorte,
                        {

                            // Quadrado

                            aspectRatio: 1,

                            // Mantém o crop dentro da imagem

                            viewMode: 1,

                            // Permite mover a imagem

                            dragMode: 'move',

                            // Tamanho inicial do corte

                            autoCropArea: 0.8,

                            responsive: true,

                            background: false,

                            movable: true,

                            zoomable: true,

                            rotatable: false,

                            scalable: false

                        }
                    );

            };

        }
    );


    // ==========================================
    // CONFIRMAR CORTE
    // ==========================================

    confirmarCorte.addEventListener(
        'click',
        () => {

            if (!cropper) {

                console.error(
                    'Cropper não inicializado.'
                );

                return;

            }


            // Gera imagem cortada

            const canvas =
                cropper.getCroppedCanvas(
                    {

                        width: 500,

                        height: 500,

                        imageSmoothingEnabled:
                            true,

                        imageSmoothingQuality:
                            'high'

                    }
                );


            // ==================================
            // MOSTRA PREVIEW
            // ==================================

            previewImagem.src =
                canvas.toDataURL(
                    'image/jpeg',
                    0.90
                );


            previewFoto.style.display =
                'block';


            // ==================================
            // TRANSFORMA EM ARQUIVO
            // ==================================

            canvas.toBlob(
                (blob) => {

                    if (!blob) {

                        console.error(
                            'Não foi possível gerar a imagem.'
                        );

                        return;

                    }


                    arquivoCortado =
                        new File(
                            [blob],
                            'foto-cortada.jpg',
                            {
                                type:
                                    'image/jpeg'
                            }
                        );


                    console.log(
                        'Imagem cortada:',
                        arquivoCortado
                    );


                    // Agora que o arquivo foi criado,
                    // podemos destruir o Cropper

                    if (cropper) {

                        cropper.destroy();

                        cropper = null;

                    }


                    areaCorte.style.display =
                        'none';

                },
                'image/jpeg',
                0.90
            );

        }
    );


    // ==========================================
    // CADASTRAR NOVO TIPO
    // ==========================================

    formCadastrarTipo.addEventListener(
        'submit',
        async (event) => {

            event.preventDefault();


            const nome =
                document.getElementById(
                    'nomeTipo'
                ).value.trim();


            const erroFoto =
                document.getElementById(
                    'erroFotoTipo'
                );

            const erroNome =
                document.getElementById(
                    'erroNomeTipo'
                );


            erroFoto.textContent =
                '';

            erroNome.textContent =
                '';


            // ==================================
            // VALIDAÇÃO DO NOME
            // ==================================

            if (!nome) {

                erroNome.textContent =
                    'O nome é obrigatório.';

                return;

            }


            // ==================================
            // VALIDAÇÃO DA FOTO
            // ==================================

            if (!arquivoCortado) {

                erroFoto.textContent =
                    'Selecione uma foto e confirme o corte.';

                return;

            }


            // ==================================
            // FORM DATA
            // ==================================

            const formData =
                new FormData();


            formData.append(
                'nome',
                nome
            );


            // IMPORTANTE:
            // envia a imagem CORTADA

            formData.append(
                'foto',
                arquivoCortado
            );


            console.log(
                'Enviando foto:',
                arquivoCortado
            );


            try {

                const resposta =
                    await fetch(
                        '/dashboard/ceo/cadastrar-tipo',
                        {

                            method: 'POST',

                            body: formData

                        }
                    );


                const resultado =
                    await resposta.json();


                console.log(
                    'Cadastro:',
                    resultado
                );


                // ==================================
                // ERRO
                // ==================================

                if (!resposta.ok) {

                    erroNome.textContent =
                        resultado.erro ||
                        'Erro ao cadastrar tipo.';

                    return;

                }


                // ==================================
                // SUCESSO
                // ==================================

                if (
                    resultado.sucesso
                ) {

                    // Fecha modal

                    modalCadastrarTipo.classList.remove(
                        'ativo'
                    );


                    // Limpa formulário

                    formCadastrarTipo.reset();


                    // Limpa preview

                    previewFoto.style.display =
                        'none';

                    previewImagem.src =
                        '';


                    // Limpa arquivo cortado

                    arquivoCortado =
                        null;


                    // Limpa erros

                    erroNome.textContent =
                        '';

                    erroFoto.textContent =
                        '';


                    // Abre modal principal

                    modal.classList.add(
                        'ativo'
                    );


                    // Atualiza lista

                    await carregarTiposDisponiveis();

                }

            } catch (erro) {

                console.error(
                    erro
                );


                erroNome.textContent =
                    'Erro de comunicação com o servidor.';

            }

        }
    );

});