// favoritos.js
function obterFavoritos() {
  return JSON.parse(localStorage.getItem('favoritos')) || [];
}

fetch('locais.json')
  .then(response => response.json())
  .then(locais => {
    const lista = document.getElementById('favoritos-lista');
    const favoritos = obterFavoritos();

    const locaisFavoritos = locais.filter(local => favoritos.includes(local.nome));

    locaisFavoritos.forEach(local => {
      const item = document.createElement('li');
      item.classList.add('item-local');

      const titulo = document.createElement('strong');
      titulo.textContent = local.nome;

      const descricao = document.createElement('p');
      descricao.textContent = local.descricao || '';

      item.appendChild(titulo);
      item.appendChild(descricao);
      lista.appendChild(item);
    });
  })
  .catch(error => {
    console.error('Erro ao carregar os locais favoritos:', error);
  });
