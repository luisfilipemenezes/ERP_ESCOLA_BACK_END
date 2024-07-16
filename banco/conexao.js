// index.js
import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'campeonatos',
  password: 'root',
  port: 5432,
});

pool.connect((err, client, done) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados', err.stack);
  } else {
    console.log('Conectado ao banco de dados');
    
    client.query('SELECT * FROM alunos', (err, res) => {
      done(); // Libera o cliente de volta para o pool
      
      if (err) {
        console.error('Erro ao executar a consulta', err.stack);
      } else {
        console.log('Resultados da consulta:', res.rows);
      }
    });
  }
});

export default pool;
