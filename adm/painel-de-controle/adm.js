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
    users.forEach(usuario => {
      let tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${usuario.id}</td>
        <td>${usuario.name}</td>
        <td>${usuario.email}</td>
        <td>${usuario.idade}</td>
      `;
      tr.onclick = () => abrirModal(usuario.id - 1);
      userListBody.appendChild(tr);
    });
    totalUsersElement.textContent = users.length;
  }

  function abrirModal(indice) {
    modal.style.display = 'block';
    let ficha = modal.querySelector('.inscricao-table');
    if (ficha) {
      let linhas = ficha.querySelectorAll('tr');
      if (linhas.length >= 2) {
        linhas[1].cells[1].textContent = users[indice].name;
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

  mostrarUsuarios();


  // Formulário
  let form = document.getElementById('form-inscricao');

  form.onsubmit = function(e) {
    e.preventDefault();

    let dados = {};
    let formData = new FormData(form);

    formData.forEach((value, key) => {
      dados[key] = value;
    });

    fetch('http://localhost:3000/api/formulario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    })
    .then(res => res.json())
    .then(data => {
      console.log('Resposta da API:', data);

      //Adiciona o novo usuário na tabela
      let novoUsuario = {
        id: users.length + 1,
        name: dados.nome_candidato || "Sem nome",
        email: dados.email || "Sem email",
        idade: dados.idade || "-"
      };

      users.push(novoUsuario);
      mostrarUsuarios();

      fecharModal();
      alert('200 - Formulário enviado e salvo na tabela!');
    })
    .catch(() => {
      alert('Erro ao enviar para a API!');
    });
  };

  function calcularMedia(disciplina) {
    let soma = 0;
    let qtd = 0;
    let campos = document.querySelectorAll(`input[name^="${disciplina}_"]`);
    campos.forEach(campo => {
      let valor = parseFloat(campo.value);
      if (!isNaN(valor)) {
        soma += valor;
        qtd++;
      }
    });
    let mediaInput = document.querySelector(`input[name="media_${disciplina}"]`);
    mediaInput.value = qtd > 0 ? (soma / qtd).toFixed(2) : '';
    calcularMediaFinal();
  }

  function calcularMediaFinal() {
    let disciplinas = ["portugues", "matematica"];
    let soma = 0;
    let qtd = 0;
    disciplinas.forEach(disciplina => {
      let mediaInput = document.querySelector(`input[name="media_${disciplina}"]`);
      let valor = parseFloat(mediaInput.value);
      if (!isNaN(valor)) {
        soma += valor;
        qtd++;
      }
    });
    let mediaFinalInput = document.querySelector(`input[name="media_final"]`);
    mediaFinalInput.value = qtd > 0 ? (soma / qtd).toFixed(2) : '';
  }

  ["portugues", "matematica"].forEach(disciplina => {
    let campos = document.querySelectorAll(`input[name^="${disciplina}_"]`);
    campos.forEach(campo => {
      campo.addEventListener("input", () => calcularMedia(disciplina));
    });
  });

  let origemCheckboxes = document.querySelectorAll(".origem");
  let totalGeralInput = document.querySelector('input[name="total_geral"]');
  let mediaFinalInput = document.querySelector('input[name="media_final"]');

  function atualizarPontuacaoOrigem() {
    let soma = 0;

    origemCheckboxes.forEach(cb => {
      if (cb.checked) soma += parseInt(cb.value);
    });

    let mediaFinal = parseFloat(mediaFinalInput.value);
    if (!isNaN(mediaFinal)) {
      soma += mediaFinal * 10;
    }

    totalGeralInput.value = soma;
  }

  origemCheckboxes.forEach(cb => {
    cb.addEventListener("change", atualizarPontuacaoOrigem);
  });

  mediaFinalInput.addEventListener("input", atualizarPontuacaoOrigem);
});
