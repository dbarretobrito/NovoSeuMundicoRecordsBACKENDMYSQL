import knex from '../database/connection';

export interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  year?: number;
  tags?: string[];  // Tags como array de strings
  front_image: string;
  back_image?: string | null;
  detail_image?: string | null;
  detail2_image?: string | null;
  created_at?: string;
  updated_at?: string;
}

// Função para criar um produto
// Função para criar um produto
export const createProduct = async (product: Product) => {
  const productData = {
    ...product,
    created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
    tags: JSON.stringify(product.tags),  // Converte o array de tags para JSON aqui
  };

  // Inserir o produto e retornar o ID gerado
  const [id] = await knex('products').insert(productData);
  return id;
};

// Função para atualizar um produto
export const updateProduct = async (id: number, product: Product) => {
  const { created_at, ...productData } = product;

  const productToUpdate = {
    ...productData,
    updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
    tags: JSON.stringify(product.tags),  // Converte o array de tags para JSON aqui
  };

  // Atualizar o produto no banco de dados
  return knex('products').where({ id }).update(productToUpdate);
};

// Função para deletar um produto
export const deleteProduct = async (id: number) => {
  return knex('products').where({ id }).del();
};

// Função para obter um produto pelo ID
export const getProductById = async (id: number) => {
  return knex('products').where({ id }).first();
};

// Função para obter todos os produtos
export const getAllProducts = async () => {
  return knex('products').select('*');
};
