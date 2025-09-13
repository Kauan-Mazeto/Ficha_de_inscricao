import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Suporte a forms HTML

const formularios = [];

app.post('/api/formulario', (req, res) => {
  formularios.push(req.body);
  res.json({
    mensagem: 'Dados recebidos com sucesso!',
    dadosRecebidos: req.body
  });
});


app.get('/api/formulario', (req, res) => {

  const formulariosValidos = formularios.filter(f => f && typeof f === 'object');
  res.json({
    mensagem: 'Todos os formulários recebidos:',
    formularios: formulariosValidos
  });
});

app.listen(3000, () => {
  console.log('API rodando em http://localhost:3000');
});
