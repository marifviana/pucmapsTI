// Carrega os favoritos do JSON
fetch('locais.json')
  .then(response => response.json())
  .then(locais => {
    const lista = document.getElementById('favoritos-lista');
    
    locais.forEach(local => {
      const item = document.createElement('li');
      item.innerHTML = `<strong>${local.nome}</strong>`;
      lista.appendChild(item);
    });
  })
  .catch(error => {
    console.error('Erro ao carregar os locais:', error);
  });

  