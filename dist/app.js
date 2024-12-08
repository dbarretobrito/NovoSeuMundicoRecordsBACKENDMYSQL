"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const connection_1 = __importDefault(require("./database/connection")); // Importando a conexão
const path_1 = __importDefault(require("path"));
// Carrega as variáveis de ambiente do arquivo .env, incluindo PORT e JWT_SECRET
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') }); // Carrega variáveis de ambiente
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3333; // Porta de execução do servidor, priorizando a variável de ambiente
// Middleware para permitir Cross-Origin Resource Sharing (CORS)
app.use((0, cors_1.default)());
// Middleware de segurança para configurar cabeçalhos HTTP (proteção básica)
app.use((0, helmet_1.default)());
// Middleware para interpretar requisições com corpo em JSON
app.use(express_1.default.json());
// Configuração das rotas de autenticação
app.use('/auth', authRoutes_1.default);
// Configuração das rotas de produtos
app.use('/api', productRoutes_1.default); // Prefixo '/api' para rotas relacionadas aos produtos
// Testa a conexão com o banco de dados utilizando a função 'raw'
connection_1.default.raw('SELECT 1 + 1 AS result')
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
