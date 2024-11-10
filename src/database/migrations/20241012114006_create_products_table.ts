import { Knex } from 'knex';

// Função responsável pela criação da tabela 'products' no banco de dados
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

    // Criação dos campos 'created_at' e 'updated_at' com valores automáticos
    table.timestamps(true, true);
  });
}

// Função responsável por desfazer a migração, excluindo a tabela 'products'
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('products');
}
