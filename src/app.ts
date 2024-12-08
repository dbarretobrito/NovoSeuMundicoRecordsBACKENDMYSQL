import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import productRoutes from './routes/productRoutes';
import authRoutes from './routes/authRoutes';
import connection from './database/connection'; // Importando a conexão
import path from 'path';

// Carrega as variáveis de ambiente do arquivo .env, incluindo PORT e JWT_SECRET
dotenv.config({ path: path.resolve(__dirname, '../.env') }); // Carrega variáveis de ambientee

const app = express();
const PORT = process.env.PORT || 3333; // Porta de execução do servidor, priorizando a variável de ambiente

// Middleware para permitir Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Middleware de segurança para configurar cabeçalhos HTTP (proteção básica)
app.use(helmet());

// Middleware para interpretar requisições com corpo em JSON
app.use(express.json());

// Configuração das rotas de autenticação
app.use('/auth', authRoutes);

// Configuração das rotas de produtos
app.use('/api', productRoutes); // Prefixo '/api' para rotas relacionadas aos produtos

// Testa a conexão com o banco de dados utilizando a função 'raw'
connection.raw('SELECT 1 + 1 AS result')
  .then(() => {
    console.log('Conexão com o banco de dados bem-sucedida!');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });

// Inicia o servidor e o faz escutar na porta especificada
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
