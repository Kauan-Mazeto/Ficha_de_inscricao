document.addEventListener('DOMContentLoaded', () => {

    const users = [
        { id: 1, name: 'João Silva', email: 'joao.silva@email.com', idade: 14 },
        { id: 2, name: 'Maria Santos', email: 'maria.santos@email.com', idade: 15 },
        { id: 3, name: 'Pedro Souza', email: 'pedro.souza@email.com', idade: 15 },
        { id: 4, name: 'Ana Costa', email: 'ana.costa@email.com', idade: 14 },
        { id: 5, name: 'Carlos Oliveira', email: 'carlos.oliveira@email.com', idade: 14 }
    ];

    const userListBody = document.getElementById('user-list');
    const totalUsersElement = document.getElementById('total-users');
    const modal = document.getElementById('edit-user-modal');
    const closeBtn = document.querySelector('.close-btn');


    function renderUserList() {
        userListBody.innerHTML = ''; 
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.idade}</td>
            `;
            row.addEventListener('click', () => {
                showEditModal(user);
            });
            userListBody.appendChild(row);
        });
    }


    function showEditModal(user) {
    modal.style.display = 'block';

    const ficha = modal.querySelector('.inscricao-table');

    if (ficha) {
        const linhas = ficha.querySelectorAll('tr');
        if (linhas.length >= 3) {

            linhas[1].cells[1].textContent = user.name;
        }
    }
}

    function closeModal() {
        modal.style.display = 'none';
    }

    closeBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });

    totalUsersElement.textContent = users.length;

    renderUserList();

    let msg = document.createElement('div');
    msg.id = 'msg-salvo';
    msg.style.position = 'fixed';
    msg.style.top = '30px';
    msg.style.left = '50%';
    msg.style.transform = 'translateX(-50%)';
    msg.style.background = '#4caf50';
    msg.style.color = '#fff';
    msg.style.padding = '16px 32px';
    msg.style.borderRadius = '8px';
    msg.style.fontSize = '18px';
    msg.style.zIndex = '9999';
    msg.style.display = 'none';
    msg.textContent = 'Informações salvas com sucesso!';
    document.body.appendChild(msg);


    const saveBtn = document.getElementById('save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            modal.style.display = 'none';

            msg.style.display = 'block';
            setTimeout(() => {
                msg.style.display = 'none';
            }, 2500);
        });
    }
});