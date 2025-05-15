function obterFavoritos() {
  return JSON.parse(localStorage.getItem('favoritos')) || [];
}

function salvarFavoritos(favoritos) {
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

fetch('locais.json')
  .then(response => response.json())
  .then(locais => {
    const lista = document.getElementById('lista-locais');
    const favoritos = obterFavoritos();

    locais.forEach(local => {
      // Cria o link que envolverá toda a caixa
      const link = document.createElement('a');
      link.href = `detalhes.html?nome=${encodeURIComponent(local.nome)}`;
      link.classList.add('item-link');

      // Cria a estrutura da caixa
      const item = document.createElement('li');
      item.classList.add('item-local');

      const titulo = document.createElement('strong');
      titulo.textContent = local.nome;

      const descricao = document.createElement('p');
      descricao.textContent = local.descricao || '';

      // Botão de favorito
      const favoritoBtn = document.createElement('button');
      const estaFavorito = favoritos.includes(local.nome);
      favoritoBtn.innerHTML = `<i class="${estaFavorito ? 'fa-solid' : 'fa-regular'} fa-star"></i>`;
      favoritoBtn.classList.add('btn-favorito');
      if (estaFavorito) favoritoBtn.classList.add('favorito');

      favoritoBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // impede que o clique acione o link
        e.preventDefault();
        const icone = favoritoBtn.querySelector('i');
        favoritoBtn.classList.toggle('favorito');

        if (favoritoBtn.classList.contains('favorito')) {
          icone.classList.replace('fa-regular', 'fa-solid');
          favoritos.push(local.nome);
        } else {
          icone.classList.replace('fa-solid', 'fa-regular');
          const index = favoritos.indexOf(local.nome);
          if (index !== -1) favoritos.splice(index, 1);
        }

        salvarFavoritos(favoritos);
      });

      item.appendChild(titulo);
      item.appendChild(descricao);
      item.appendChild(favoritoBtn);

      link.appendChild(item); // torna o <li> inteiro clicável
      lista.appendChild(link);
    });
  })
  .catch(error => {
    console.error('Erro ao carregar os locais:', error);
  });