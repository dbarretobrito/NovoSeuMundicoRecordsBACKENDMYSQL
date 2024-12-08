"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProductsController = exports.getProductByIdController = exports.deleteProductController = exports.updateProductController = exports.createProductController = void 0;
const Product_1 = require("../models/Product");
// Método de criação de produto
const createProductController = async (req, res) => {
    try {
        // Extrai os dados do produto da requisição
        const { name, description, price, year, tags, front_image, back_image, detail_image, detail2_image } = req.body;
        const product = {
            name,
            description,
            price,
            year,
            tags,
            front_image,
            back_image: back_image || null,
            detail_image: detail_image || null,
            detail2_image: detail2_image || null,
        };
        // Chama a função para criar o produto
        const productId = await (0, Product_1.createProduct)(product);
        // Retorna a resposta com o ID do produto criado
        res.status(201).json({ id: productId, ...product });
    }
    catch (error) {
        console.error("Erro ao criar produto:", error);
        const errorMessage = error.message || 'Erro desconhecido';
        res.status(500).json({ message: 'Erro ao criar produto', error: errorMessage });
    }
};
exports.createProductController = createProductController;
// Método de atualização de produto
const updateProductController = async (req, res) => {
    try {
        const { id } = req.params; // Obtém o ID do produto da URL
        const { name, description, price, year, tags, front_image, back_image, detail_image, detail2_image } = req.body;
        const product = {
            name,
            description,
            price,
            year,
            tags, // Mantém como array de strings
            front_image,
            back_image: back_image || null,
            detail_image: detail_image || null,
            detail2_image: detail2_image || null,
        };
        // Chama a função para atualizar o produto no banco
        const updatedRows = await (0, Product_1.updateProduct)(Number(id), product);
        if (updatedRows === 0) {
            // Caso o produto não seja encontrado
            res.status(404).json({ message: 'Produto não encontrado' });
            return; // Adiciona o return para evitar continuar após o erro
        }
        // Retorna o produto atualizado
        res.status(200).json({ message: 'Produto atualizado com sucesso', product });
    }
    catch (error) {
        console.error("Erro ao atualizar produto:", error);
        res.status(500).json({ message: 'Erro ao atualizar produto', error: error.message });
    }
};
exports.updateProductController = updateProductController;
// Método de exclusão de produto
const deleteProductController = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await (0, Product_1.deleteProduct)(Number(id));
        if (result) {
            // Caso o produto seja deletado com sucesso
            res.status(200).json({ message: 'Produto deletado com sucesso' });
        }
        else {
            // Caso o produto não seja encontrado
            res.status(404).json({ message: 'Produto não encontrado' });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Erro ao deletar produto', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Erro desconhecido ao deletar produto' });
        }
    }
};
exports.deleteProductController = deleteProductController;
// Método para obter produto por ID
const getProductByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await (0, Product_1.getProductById)(Number(id));
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.status(404).json({ message: 'Produto não encontrado' });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Erro ao obter produto', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Erro desconhecido ao obter produto' });
        }
    }
};
exports.getProductByIdController = getProductByIdController;
// Método para obter todos os produtos
const getAllProductsController = async (req, res) => {
    try {
        const products = await (0, Product_1.getAllProducts)();
        res.status(200).json(products);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Erro ao obter produtos', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Erro desconhecido ao obter produtos' });
        }
    }
};
exports.getAllProductsController = getAllProductsController;
