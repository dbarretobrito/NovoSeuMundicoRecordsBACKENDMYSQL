import { Knex } from 'knex';

exports.up = function (knex: Knex): Promise<void>{
  return knex.schema.createTable('admins', (table) => {
    table.increments('id').primary();
    table.string('username').notNullable().unique();
    table.string('password').notNullable();
    table.timestamps(true, true); // Cria os campos 'created_at' e 'updated_at'
  });
};

exports.down = function (knex: Knex): Promise<void> {
  return knex.schema.dropTable('admins');
};
