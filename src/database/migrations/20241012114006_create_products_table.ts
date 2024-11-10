import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('products', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('front_image').notNullable();
    table.string('back_image');
    table.string('detail_image');
    table.string('detail2_image');
    table.text('description');
    table.decimal('price', 10, 2).notNullable();
    table.integer('year');
    table.text('tags');
    table.timestamps(true, true);  // Cria os campos 'created_at' e 'updated_at'
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('products');
}
