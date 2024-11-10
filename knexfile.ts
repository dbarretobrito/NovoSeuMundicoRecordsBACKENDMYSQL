import { Knex } from "knex";
import * as dotenv from "dotenv";

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Configuração do Knex para o ambiente de desenvolvimento
const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2", // Cliente do banco de dados, aqui estamos usando o MySQL
    connection: {
      host: process.env.DB_HOST, // Endereço do banco de dados, passado via variável de ambiente
      user: process.env.DB_USER, // Usuário para autenticação no banco de dados
      password: process.env.DB_PASSWORD, // Senha para autenticação no banco de dados
      database: process.env.DB_NAME, // Nome do banco de dados
      port: Number(process.env.DB_PORT), // Porta do banco de dados, também via variável de ambiente
    },
    migrations: {
      directory: "./src/database/migrations", // Diretório onde as migrações do banco de dados ficam armazenadas
    },
    seeds: {
      directory: "./src/database/seeds", // Diretório onde os arquivos de seeds (dados iniciais) ficam armazenados
    },
  },
};

export default config;
