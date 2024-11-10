import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import productRoutes from './routes/productRoutes';
import authRoutes from './routes/authRoutes';
import connection from './database/connection'; // Importando a conexão
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') }); // Carrega variáveis de ambiente

const app = express();
const PORT = process.env.PORT || 3333; // Prioriza a variável de ambiente

app.use(cors());
app.use(helmet());
app.use(express.json()); // Middleware para body parser JSON

// Definir rotas com prefixos adequados
app.use('/auth', authRoutes); // Rotas de autenticação
app.use('/api', productRoutes); // Rotas de produtos

// Testar a conexão com o banco de dados
connection.raw('SELECT 1 + 1 AS result')
  .then(() => {
    console.log('Conexão com o banco de dados bem-sucedida!');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
