const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Suporte a forms HTML

// Array para armazenar os dados recebidos
const formularios = [];

// Endpoint para receber e exibir os dados do formulário
app.post('/api/formulario', (req, res) => {
  formularios.push(req.body);
  res.json({
    mensagem: 'Dados recebidos com sucesso!',
    dadosRecebidos: req.body
  });
});

// Endpoint para mostrar todos os dados recebidos
app.get('/api/formulario', (req, res) => {
  res.json({

    mensagem: 'Todos os formulários recebidos:',
    formularios: formularios.filter(f => f && typeof f === 'object')
  });
});

app.listen(3000, () => {
  console.log('API rodando em http://localhost:3000');
});
