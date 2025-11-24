let dados = [];

let campoBusca = document.querySelector("header input");
let cardContainer = document.querySelector(".card-container");

function renderizarCards(dados) {
   cardContainer.innerHTML = "";
   for (let dado of dados) {
      let article = document.createElement("article");
      article.classList.add("card");
      article.innerHTML = `
      <H2>${dado.nome}</H2>
      <p>${dado.ano}</p>
      <p>${dado.descricao}</p>
      <a href="${dado.link}" target="_blank">Ouça-me</a>`;	
      cardContainer.appendChild(article);
   }
}

async function IniciarBusca() {
   let resposta = await fetch("data.json");
   dados = await resposta.json();
   renderizarCards(dados);

   if (dados.length === 0) {
      try {
         let resposta = await fetch("backup.json");
         dados = await resposta.json();
      } catch (erro) {
         console.log("Falha ao buscar dados:", error);
         return
      }
   }

   const termoBusca = campoBusca.value.toLowerCase();
   const dadosFiltrados = dados.filter(dado => 
      dado.nome.toLowerCase().includes(termoBusca) || dado.descricao.toLowerCase().includes(termoBusca));
   
   renderizarCards(dadosFiltrados);
}

