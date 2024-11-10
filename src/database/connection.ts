import knex from 'knex';
import { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

console.log('Conectando ao banco de dados:', process.env.DB_NAME);

const connection: Knex = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
  },
});

export default connection;
