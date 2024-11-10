import { Knex } from 'knex';

// Função responsável pela criação da tabela 'admins' no banco de dados
exports.up = function (knex: Knex): Promise<void> {
  return knex.schema.createTable('admins', (table) => {
    table.increments('id').primary();
    table.string('username').notNullable().unique();
    table.string('password').notNullable();

    // Criação dos campos 'created_at' e 'updated_at' com valores automáticos
    table.timestamps(true, true);
  });
};

// Função responsável por desfazer a migração, excluindo a tabela 'admins'
exports.down = function (knex: Knex): Promise<void> {
  return knex.schema.dropTable('admins');
};
