import express, { json, urlencoded } from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Middlewares básicos
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// Array simples para armazenar dados
let dados = [];

// Middleware de log simples
app.use((req, res, next) => {
  console.log(`${new Date().toLocaleTimeString()} - ${req.method} ${req.path}`);
  next();
});

// POST - Salvar formulário
app.post('/api/formulario', (req, res) => {
  try {
    console.log('Dados recebidos:', req.body);
    
    // Adiciona os dados com timestamp
    const novoItem = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...req.body
    };
    
    dados.push(novoItem);
    console.log('Total de formulários:', dados.length);
    
    res.json({
      sucesso: true,
      mensagem: 'Formulário salvo!',
      total: dados.length
    });
    
  } catch (error) {
    console.error('Erro POST:', error.message);
    res.status(500).json({ erro: 'Erro interno' });
  }
});

// GET - Buscar formulários
app.get('/api/formulario', (req, res) => {
  try {
    console.log('Retornando', dados.length, 'formulários');
    
    res.json({
      sucesso: true,
      formularios: dados,
      total: dados.length
    });
    
  } catch (error) {
    console.error('Erro GET:', error.message);
    res.status(500).json({ erro: 'Erro interno' });
  }
});

// Rota de teste
app.get('/api/test', (req, res) => {
  res.json({ status: 'OK', time: new Date().toISOString() });
});

// Tratamento de erros globais
process.on('uncaughtException', (err) => {
  console.error('Erro não capturado:', err.message);
  console.log('Servidor continuando...');
});

process.on('unhandledRejection', (reason) => {
  console.error('Promise rejeitada:', reason);
  console.log('Servidor continuando...');
});

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log('===================');
  console.log('SERVIDOR INICIADO');
  console.log(`Porta: ${PORT}`);
  console.log(`URL: http://localhost:${PORT}/api/test`);
  console.log('===================');
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Porta ${PORT} em uso! Tentando porta ${PORT + 1}...`);
    app.listen(PORT + 1, () => {
      console.log(`Servidor rodando na porta ${PORT + 1}`);
    });
  } else {
    console.error('Erro do servidor:', err.message);
  }
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nEncerrando servidor...');
  server.close(() => {
    console.log('Servidor encerrado');
    process.exit(0);
  });
});