const express = require('express');
const mysql = require('mysql');
const app = express();
const PORT = 3000;

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'mysql',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'people'
});

connection.connect(err => {
  if (err) throw err;

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS people (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    )
  `;

  connection.query(createTableQuery, err => {
    if (err) throw err;
    console.log('Tabela "people" verificada/criada com sucesso!');

    // Insere os dados só depois da tabela existir
    connection.query(`INSERT INTO people(name) VALUES('Aline')`);
  });
});

app.get('/', (req, res) => {
  connection.query('SELECT name FROM people', (err, results) => {
    if (err) throw err;

    let list = results.map(r => `<li>${r.name}</li>`).join('');
    res.send(`<h1>Full Cycle Rocks!</h1><ul>${list}</ul>`);
  });
});

app.listen(PORT, () => console.log(`Node server running on ${PORT}`));