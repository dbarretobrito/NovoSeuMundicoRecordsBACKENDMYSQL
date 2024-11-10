import { Knex } from 'knex';

// Função responsável pela criação da tabela 'products' no banco de dados
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('products', (table) => {
    // Coluna de ID, chave primária, com incremento automático
    table.increments('id').primary();

    // Coluna para o nome do produto, não pode ser nula
    table.string('name').notNullable();

    // Coluna para a imagem frontal do produto, não pode ser nula
    table.string('front_image').notNullable();

    // Coluna para a imagem traseira do produto (opcional)
    table.string('back_image');

    // Coluna para uma imagem de detalhes do produto (opcional)
    table.string('detail_image');

    // Coluna para uma segunda imagem de detalhes do produto (opcional)
    table.string('detail2_image');

    // Coluna para a descrição do produto (opcional)
    table.text('description');

    // Coluna para o preço do produto, com 10 dígitos e 2 casas decimais
    table.decimal('price', 10, 2).notNullable();

    // Coluna para o ano do produto (opcional)
    table.integer('year');

    // Coluna para tags associadas ao produto, armazenadas como texto
    table.text('tags');

    // Criação dos campos 'created_at' e 'updated_at' com valores automáticos
    table.timestamps(true, true);
  });
}

// Função responsável por desfazer a migração, excluindo a tabela 'products'
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('products');
}
