const express = require('express');
const mysql = require('mysql');
const app = express();
const PORT = 3000;

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'people'
});

app.get('/', (req, res) => {
  connection.query('SELECT name FROM people', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao buscar dados');
    }

    const list = results.map(r => `<li>${r.name}</li>`).join('');
    res.send(`<h1>Full Cycle Rocks!</h1><ul>${list}</ul>`);
  });
});

app.listen(PORT, () => {
  connection.connect(err => {
    if (err) {
      console.error('Erro ao conectar ao MySQL:', err);
      return;
    }

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS people (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      )
    `;

    connection.query(createTableQuery, err => {
      if (err) return console.error('Erro ao criar tabela:', err);

      console.log('Tabela "people" verificada/criada com sucesso!');

      // Verifica se "Aline" já existe
      connection.query(`SELECT * FROM people WHERE name = 'Aline'`, (err, results) => {
        if (err) return console.error('Erro ao verificar nome:', err);

        if (results.length === 0) {
          connection.query(`INSERT INTO people(name) VALUES('Aline')`);
        }
      });
    });
  });

  console.log(`Node server running on ${PORT}`);
});