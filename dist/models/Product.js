"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = exports.getProductById = exports.deleteProduct = exports.updateProduct = exports.createProduct = void 0;
const connection_1 = __importDefault(require("../database/connection"));
// Função para criar um produto
const createProduct = async (product) => {
    // Preparando os dados para inserção, incluindo a data de criação e atualização
    const productData = {
        ...product,
        created_at: new Date().toISOString().slice(0, 19).replace('T', ' '), // Formato para data e hora
        updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '), // Formato para data e hora
        tags: JSON.stringify(product.tags), // Converte o array de tags para JSON aqui
    };
    // Inserir o produto no banco de dados e retornar o ID gerado
    const [id] = await (0, connection_1.default)('products').insert(productData);
    return id;
};
exports.createProduct = createProduct;
// Função para atualizar um produto
const updateProduct = async (id, product) => {
    // Remover a data de criação do objeto para não ser atualizada
    const { created_at, ...productData } = product;
    // Preparando os dados para atualização, incluindo a data de atualização
    const productToUpdate = {
        ...productData,
        updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '), // Formato para data e hora
        tags: JSON.stringify(product.tags), // Converte o array de tags para JSON aqui
    };
    // Atualizar o produto no banco de dados
    return (0, connection_1.default)('products').where({ id }).update(productToUpdate);
};
exports.updateProduct = updateProduct;
// Função para deletar um produto
const deleteProduct = async (id) => {
    // Deletar o produto com o ID fornecido
    return (0, connection_1.default)('products').where({ id }).del();
};
exports.deleteProduct = deleteProduct;
// Função para obter um produto pelo ID
const getProductById = async (id) => {
    // Retornar o produto com o ID fornecido
    return (0, connection_1.default)('products').where({ id }).first();
};
exports.getProductById = getProductById;
// Função para obter todos os produtos
const getAllProducts = async () => {
    // Retornar todos os produtos
    return (0, connection_1.default)('products').select('*');
};
exports.getAllProducts = getAllProducts;
