import knex from '../database/connection';

// Interface que define a estrutura de um produto
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
export const createProduct = async (product: Product) => {
  // Preparando os dados para inserção, incluindo a data de criação e atualização
  const productData = {
    ...product,
    created_at: new Date().toISOString().slice(0, 19).replace('T', ' '), // Formato para data e hora
    updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '), // Formato para data e hora
    tags: JSON.stringify(product.tags),  // Converte o array de tags para JSON aqui
  };

  // Inserir o produto no banco de dados e retornar o ID gerado
  const [id] = await knex('products').insert(productData);
  return id;
};

// Função para atualizar um produto
export const updateProduct = async (id: number, product: Product) => {
  // Remover a data de criação do objeto para não ser atualizada
  const { created_at, ...productData } = product;

  // Preparando os dados para atualização, incluindo a data de atualização
  const productToUpdate = {
    ...productData,
    updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '), // Formato para data e hora
    tags: JSON.stringify(product.tags),  // Converte o array de tags para JSON aqui
  };

  // Atualizar o produto no banco de dados
  return knex('products').where({ id }).update(productToUpdate);
};

// Função para deletar um produto
export const deleteProduct = async (id: number) => {
  // Deletar o produto com o ID fornecido
  return knex('products').where({ id }).del();
};

// Função para obter um produto pelo ID
export const getProductById = async (id: number) => {
  // Retornar o produto com o ID fornecido
  return knex('products').where({ id }).first();
};

// Função para obter todos os produtos
export const getAllProducts = async () => {
  // Retornar todos os produtos
  return knex('products').select('*');
};
