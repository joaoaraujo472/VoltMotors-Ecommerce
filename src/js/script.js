// DADOS DOS PRODUTOS

const produtos = [
    {
        id: 1,
        nome: "VOLT CITY",
        categoria: "",
        descricao: "Ideal no dia a dia na cidade com economia e eficiência.",
        preco: 12990.90,
        imagem: "./src/assets/img/voltcity.png"
    },
    
    {
        id: 2,
        nome: "VOLT SPORT",
        categoria: "",
        descricao: "Mais potência e velocidade para quem busca adrenalina.",
        preco: 18990.00,
        imagem: "./src/assets/img/voltsport.png"
    },
    
    {
        id: 3,
        nome: "VOLT TRAIL",
        categoria: "",
        descricao: "Aventure-se em qualquer terreno com liberdade.",
        preco: 21900.00,
        imagem: "./src/assets/img/volttrail.png"
    },
    
    {
        id: 4,
        nome: "VOLT RACER",
        categoria: "",
        descricao: "Perfomace màxima com design arrojado.",
        preco: 28000.00,
        imagem: "./src/assets/img/voltracer.png"
    },
    
    {
        id: 5,
        nome: "VOLT CARGO",
        categoria: "",
        descricao: "Perfeita para trabalho e entregas urbanas.",
        preco: 16000.00,
        imagem: "./src/assets/img/volt cargo.png"
    },
];

// FORMATAR MOEDA

function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

//  INDEX

function renderizarProdutos() {
  const grade = document.getElementById('grade-produtos');
  if (!grade) return;

  grade.innerHTML = '';

  produtos.forEach(produto => {
    const card = document.createElement('article');
    card.classList.add('card-produto');

    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy" />
      <div class="card-info">
        <p class="card-categoria">${produto.categoria}</p>
        <h2 class="card-nome">${produto.nome}</h2>
        <p class="card-descricao">${produto.descricao}</p>
        <div class="card-rodape">
          <span class="card-preco">${formatarMoeda(produto.preco)}</span>
        </div>
        <button class="btn-comprar" onclick="mostrarNotificacao('${produto.nome}')">
            COMPRAR
        </button>
      </div>
    `;

    grade.appendChild(card);
  });
}

// ================================
// CARRINHO
// ================================

const carrinho = [
  {
    nome: "VOLT CITY",
    preco: 12990.90
  },

  {
    nome: "VOLT SPORT",
    preco: 18990.00
  },

  {
    nome: "VOLT TRAIL",
    preco: 21900.00
  }
];

// RENDERIZAR CARRINHO

function renderizarCarrinho() {

  const listaCarrinho = document.getElementById("lista-carrinho");

  if (!listaCarrinho) return;

  listaCarrinho.innerHTML = "";

  carrinho.forEach(item => {

    const produto = document.createElement("div");

    produto.classList.add("item-carrinho");

    produto.innerHTML = `
      <h3>${item.nome}</h3>
      <p>${formatarMoeda(item.preco)}</p>
    `;

    listaCarrinho.appendChild(produto);

  });

  atualizarTotal();

}

// TOTAL COM REDUCE

function atualizarTotal() {

  const totalElemento = document.getElementById("total-compra");

  if (!totalElemento) return;

  const total = carrinho.reduce((acumulador, item) => {
    return acumulador + item.preco;
  }, 0);

  totalElemento.textContent = formatarMoeda(total);

}

// DESCONTO

const btnDesconto = document.getElementById("btn-desconto");

if (btnDesconto) {

  btnDesconto.addEventListener("click", () => {

    const totalElemento = document.getElementById("total-compra");

    const total = carrinho.reduce((acumulador, item) => {
      return acumulador + item.preco;
    }, 0);

    const totalComDesconto = total * 0.9;

    totalElemento.textContent =
      formatarMoeda(totalComDesconto);

  });

}

// CHAMAR
renderizarCarrinho();
