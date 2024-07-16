import express from 'express';
import router from './Router/index';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

// Middleware para permitir CORS
app.use(cors());

// Middleware para interpretar JSON no corpo da requisição
app.use(bodyParser.json());

// Rotas
app.use('/', router);

app.listen(5000, () => {
    console.log('Servidor ligado!');
});
