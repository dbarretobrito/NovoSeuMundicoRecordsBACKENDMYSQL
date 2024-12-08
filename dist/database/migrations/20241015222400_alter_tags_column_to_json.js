"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.alterTable('products', (table) => {
        table.json('tags').alter(); // Altera a coluna de text para json
    });
}
async function down(knex) {
    return knex.schema.alterTable('products', (table) => {
        table.text('tags').alter(); // Reverte a coluna para text
    });
}
