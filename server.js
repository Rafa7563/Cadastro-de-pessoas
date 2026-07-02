const express = require('express');
const path = require('path');
const Pessoa = require('./models/Pessoa');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const pessoas = [];

app.get('/api/pessoas', (req, res) => {
  res.json(pessoas.map((p) => p.toJSON()));
});

app.post('/api/pessoas', (req, res) => {
  const { nome, dataNascimento } = req.body;
  const data = new Date(dataNascimento);

  if (!nome || !dataNascimento || Number.isNaN(data.getTime())) {
    return res.status(400).json({ error: 'Nome e data de nascimento são obrigatórios.' });
  }

  const novaPessoa = new Pessoa(nome, data);
  pessoas.push(novaPessoa);
  res.status(201).json(novaPessoa.toJSON());
});

app.delete('/api/pessoas/:id', (req, res) => {
  const index = parseInt(req.params.id, 10);
  if (Number.isNaN(index) || index < 0 || index >= pessoas.length) {
    return res.status(400).json({ error: 'Pessoa não encontrada.' });
  }

  pessoas.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
