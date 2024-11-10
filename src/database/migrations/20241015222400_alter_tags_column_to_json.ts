import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('products', (table) => {
    table.json('tags').alter(); // Altera a coluna de text para json
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('products', (table) => {
    table.text('tags').alter(); // Reverte a coluna para text
  });
}
