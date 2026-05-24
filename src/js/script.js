// ================================
// DADOS DOS PRODUTOS
// ================================

const produtos = [

    {
        id: 1,
        nome: "VOLT CITY",
        categoria: "",
        descricao: "Ideal no dia a dia na cidade com economia e eficiência.",
        preco: 12990.90,
        imagem: "/src/assets/img/voltcity.png"
    },

    {
        id: 2,
        nome: "VOLT SPORT",
        categoria: "",
        descricao: "Mais potência e velocidade para quem busca adrenalina.",
        preco: 18990.00,
        imagem: "/src/assets/img/voltsport.png"
    },

    {
        id: 3,
        nome: "VOLT TRAIL",
        categoria: "",
        descricao: "Aventure-se em qualquer terreno com liberdade.",
        preco: 21900.00,
        imagem: "/src/assets/img/volttrail.png"
    },

    {
        id: 4,
        nome: "VOLT RACER",
        categoria: "",
        descricao: "Perfomace máxima com design arrojado.",
        preco: 28000.00,
        imagem: "/src/assets/img/voltracer.png"
    },

    {
        id: 5,
        nome: "VOLT CARGO",
        categoria: "",
        descricao: "Perfeita para trabalho e entregas urbanas.",
        preco: 16000.00,
        imagem: "/src/assets/img/volt cargo.png"
    },

];

// ================================
// LOCAL STORAGE
// ================================

let carrinho = JSON.parse(
    localStorage.getItem("volt-carrinho")
) || [];

let descontoAplicado = false;

// ================================
// FORMATAR MOEDA
// ================================

function formatarMoeda(valor) {

    return valor.toLocaleString('pt-BR', {

        style: 'currency',
        currency: 'BRL'

    });

}

// ================================
// SALVAR CARRINHO
// ================================

function salvarCarrinho() {

    localStorage.setItem(
        "volt-carrinho",
        JSON.stringify(carrinho)
    );

}

// ================================
// CONTADOR NAVBAR
// ================================

function atualizarContadorCarrinho() {

    const contador =
        document.getElementById(
            "contador-carrinho"
        );

    if (!contador) return;

    const totalItens =
        carrinho.reduce((acc, item) => {

            return acc + item.qtd;

        }, 0);

    contador.textContent =
        totalItens;

}

// ================================
// ADICIONAR AO CARRINHO
// ================================

function adicionarAoCarrinho(id) {

    const produto =
        produtos.find(prod => prod.id === id);

    if (!produto) return;

    const itemExistente =
        carrinho.find(item => item.id === id);

    // JÁ EXISTE

    if (itemExistente) {

        itemExistente.qtd++;

    } else {

        carrinho.push({

            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            imagem: produto.imagem,
            qtd: 1

        });

    }

    salvarCarrinho();
    atualizarContadorCarrinho();

    mostrarNotificacao(produto.nome);

}

// ================================
// NOTIFICAÇÃO
// ================================

function mostrarNotificacao(nomeProduto) {

    const notificacao =
        document.createElement("div");

    notificacao.classList.add("notificacao");

    notificacao.innerHTML = `

        <i class='bx bx-check'></i>

        <span>
            ${nomeProduto} adicionado ao carrinho
        </span>

    `;

    document.body.appendChild(notificacao);

    setTimeout(() => {

        notificacao.classList.add("mostrar");

    }, 100);

    setTimeout(() => {

        notificacao.classList.remove("mostrar");

        setTimeout(() => {

            notificacao.remove();

        }, 300);

    }, 2500);

}

// ================================
// RENDERIZAR PRODUTOS
// ================================

function renderizarProdutos() {

    const grade =
        document.getElementById('grade-produtos');

    if (!grade) return;

    grade.innerHTML = '';

    produtos.forEach(produto => {

        const card =
            document.createElement('article');

        card.classList.add('card-produto');

        card.innerHTML = `

            <img
                src="${produto.imagem}"
                alt="${produto.nome}"
                loading="lazy"
            />

            <div class="card-info">

                <p class="card-categoria">
                    ${produto.categoria}
                </p>

                <h2 class="card-nome">
                    ${produto.nome}
                </h2>

                <p class="card-descricao">
                    ${produto.descricao}
                </p>

                <div class="card-rodape">

                    <span class="card-preco">

                        ${formatarMoeda(produto.preco)}

                    </span>

                </div>

                <button
                    class="btn-comprar"
                    onclick="adicionarAoCarrinho(${produto.id})"
                >

                    COMPRAR

                </button>

            </div>

        `;

        grade.appendChild(card);

    });

}

// ================================
// CALCULAR TOTAL
// ================================

function calcularTotal() {

    return carrinho.reduce((acc, item) => {

        return acc + (item.preco * item.qtd);

    }, 0);

}

// ================================
// ATUALIZAR TOTAL
// ================================

function atualizarResumo() {

    const subtotal =
        document.getElementById("subtotal");

    const total =
        document.getElementById("total-compra");

    if (subtotal) {

        subtotal.textContent =
            formatarMoeda(calcularTotal());

    }

    if (total) {

        total.textContent =
            formatarMoeda(calcularTotal());

    }

}

// ================================
// CONTADOR DE ITENS
// ================================

function atualizarQuantidadeItens() {

    const span =
        document.querySelector(".quantidade-itens span");

    if (!span) return;

    const totalItens =
        carrinho.reduce((acc, item) => {

            return acc + item.qtd;

        }, 0);

    span.textContent =
        `${totalItens} itens`;

}

// ================================
// REMOVER ITEM
// ================================

function removerItem(id) {

    carrinho =
        carrinho.filter(item => item.id !== id);

    salvarCarrinho();

    renderizarCarrinho();

}

// ================================
// AUMENTAR QTD
// ================================

function aumentarQtd(id) {

    const item =
        carrinho.find(item => item.id === id);

    if (!item) return;

    item.qtd++;

    salvarCarrinho();

    renderizarCarrinho();

}

// ================================
// DIMINUIR QTD
// ================================

function diminuirQtd(id) {

    const item =
        carrinho.find(item => item.id === id);

    if (!item) return;

    if (item.qtd > 1) {

        item.qtd--;

    } else {

        removerItem(id);

        return;

    }

    salvarCarrinho();

    renderizarCarrinho();

}

// ================================
// RENDERIZAR CARRINHO
// ================================

function renderizarCarrinho() {

    const lista =
        document.getElementById("lista-carrinho");

    if (!lista) return;

    lista.innerHTML = "";

    // CARRINHO VAZIO

    if (carrinho.length === 0) {

        lista.innerHTML = `

            <div class="carrinho-vazio">

                <i class='bx bx-cart'></i>

                <h2>
                    Seu carrinho está vazio
                </h2>

                <p>
                    Adicione uma moto para continuar
                </p>

            </div>

        `;

        atualizarResumo();

        atualizarQuantidadeItens();

        atualizarContadorCarrinho();

        return;

    }

    carrinho.forEach(item => {

        const li =
            document.createElement("li");

        li.classList.add("item-carrinho");

        li.innerHTML = `

            <img
                class="item-img"
                src="${item.imagem}"
                alt="${item.nome}"
            >

            <div class="item-info">

                <p class="item-nome">
                    ${item.nome}
                </p>

                <p class="item-qtd">
                    Quantidade: ${item.qtd}
                </p>

                <div class="quantidade-box">

                    <button
                        onclick="diminuirQtd(${item.id})"
                    >
                        -
                    </button>

                    <span>
                        ${item.qtd}
                    </span>

                    <button
                        onclick="aumentarQtd(${item.id})"
                    >
                        +
                    </button>

                </div>

            </div>

            <div class="item-direita">

                <span class="item-preco">

                    ${formatarMoeda(item.preco * item.qtd)}

                </span>

                <button
                    class="btn-remover"
                    onclick="removerItem(${item.id})"
                >

                    Remover

                </button>

            </div>

        `;

        lista.appendChild(li);

    });

    atualizarResumo();

    atualizarQuantidadeItens();

}

// ================================
// APLICAR DESCONTO
// ================================

function aplicarDesconto() {

    if (descontoAplicado) return;

    descontoAplicado = true;

    const totalOriginal =
        calcularTotal();

    const totalComDesconto =
        totalOriginal * 0.9;

    // SUBTOTAL

    const subtotal =
        document.getElementById("subtotal");

    if (subtotal) {

        subtotal.textContent =
            formatarMoeda(totalOriginal);

    }

    // TOTAL

    const total =
        document.getElementById("total-compra");

    if (total) {

        total.textContent =
            formatarMoeda(totalComDesconto);

    }

    // LINHA DESCONTO

    const linha =
        document.getElementById("linha-desconto");

    if (linha) {

        linha.style.display = "flex";

        linha.querySelector(
            "span:last-child"
        ).textContent =
            `- ${formatarMoeda(totalOriginal - totalComDesconto)}`;

    }

    // BOTÃO

    const btn =
        document.getElementById("btn-desconto");

    if (btn) {

        btn.disabled = true;

        btn.innerHTML =
            "✓ Desconto aplicado";

    }

}

// ================================
// FINALIZAR COMPRA
// ================================

function finalizarCompra() {

    alert("Compra finalizada com sucesso ⚡");

    carrinho = [];

    salvarCarrinho();

    renderizarCarrinho();

}

// ================================
// INICIALIZAÇÃO
// ================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderizarProdutos();

        renderizarCarrinho();

        atualizarContadorCarrinho();

        const btnFinalizar =
            document.querySelector(".btn-finalizar");

        if (btnFinalizar) {

            btnFinalizar.addEventListener(
                "click",
                finalizarCompra
            );

        }

        const btnDesconto =
            document.getElementById("btn-desconto");

        if (btnDesconto) {

            btnDesconto.addEventListener(
                "click",
                aplicarDesconto
            );

        }

    }
    
);