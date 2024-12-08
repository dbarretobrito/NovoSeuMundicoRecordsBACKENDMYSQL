"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const dotenv_1 = __importDefault(require("dotenv"));
// Carrega as variáveis de ambiente do arquivo .env
dotenv_1.default.config();
// Log de conexão, útil para debug, mostrando o banco de dados ao qual está se conectando
console.log('Conectando ao banco de dados:', process.env.DB_NAME);
// Criação da instância de conexão com o banco de dados usando o Knex
const connection = (0, knex_1.default)({
    client: 'mysql2', // Definindo o cliente de banco de dados, no caso MySQL (mysql2 é um driver para MySQL)
    connection: {
        host: process.env.DB_HOST, // Endereço do banco de dados, retirado das variáveis de ambiente
        user: process.env.DB_USER, // Usuário para autenticação no banco de dados
        password: process.env.DB_PASSWORD, // Senha para autenticação no banco de dados
        database: process.env.DB_NAME, // Nome do banco de dados
        port: Number(process.env.DB_PORT), // Porta do banco de dados, também via variável de ambiente
    },
});
exports.default = connection;
