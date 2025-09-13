document.addEventListener('DOMContentLoaded', function() {
  let users = [
    { id: 1, name: 'João Silva', email: 'joao.silva@email.com', idade: 14 },
    { id: 2, name: 'Maria Santos', email: 'maria.santos@email.com', idade: 15 },
    { id: 3, name: 'Pedro Souza', email: 'pedro.souza@email.com', idade: 15 },
    { id: 4, name: 'Ana Costa', email: 'ana.costa@email.com', idade: 14 },
    { id: 5, name: 'Carlos Oliveira', email: 'carlos.oliveira@email.com', idade: 14 }
  ];


  let userListBody = document.getElementById('user-list');
  let totalUsersElement = document.getElementById('total-users');
  let modal = document.getElementById('edit-user-modal');
  let closeBtn = document.querySelector('.close-btn');

  function mostrarUsuarios() {
    userListBody.innerHTML = '';
    for (let i = 0; i < users.length; i++) {

      let usuarios = users[i];
      let tr = document.createElement('tr');

      tr.innerHTML = 
        `<tr>
          <td>${usuarios.id}</td>
          <td>${usuarios.name}</td>
          <td>${usuarios.email}</td>
          <td>${usuarios.idade}</td>
        </tr>`;

      tr.onclick = () => {
        abrirModal(tr.rowIndex - 1);
      };

      userListBody.appendChild(tr);
    }
  }

  function abrirModal(indice) {
    modal.style.display = 'block';

    let ficha = modal.querySelector('.inscricao-table');

    if (ficha) {
      let linhas = ficha.querySelectorAll('tr');

      if (linhas.length >= 2) {
        linhas[1].cells[1].textContent = usuarios.name;
      }
    }
  }

  function fecharModal() {
    modal.style.display = 'none';
  }


  closeBtn.onclick = fecharModal;

  window.onclick = function(e) {
    if (e.target == modal) fecharModal();
  };

  totalUsersElement.textContent = users.length;
  mostrarUsuarios();

  let form1 = document.querySelector('form');

  form1.onsubmit = function(e) {
    e.preventDefault();

    fecharModal();

    setTimeout(function() {
      alert('200 - Formulário enviado com sucesso!');
    }, 300);
  };

  let form = document.querySelector('form');
  form.onsubmit = function(e) {
    e.preventDefault();
    let dados = {};
    let formData = new FormData(form);
    formData.forEach(function(value, key) {
      dados[key] = value;
    });
    fetch('http://localhost:3000/api/formulario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    })
    .then(res => res.json())
    .then(data => {
      fecharModal();
      setTimeout(function() {
        alert('200 - Formulário enviado com sucesso!');
        console.log('Resposta da API:', data);
      }, 300);
    })
    .catch(() => {
      alert('Erro ao enviar para a API!');
    });
  };
});