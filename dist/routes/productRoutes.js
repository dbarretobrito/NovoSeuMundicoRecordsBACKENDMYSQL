"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController = __importStar(require("../controllers/ProductController"));
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Importa o middleware de autenticação de admin
const router = (0, express_1.Router)(); // Cria uma nova instância de roteador
// Rotas protegidas com autenticação de admin
// Rota para criar um produto (somente admin pode acessar)
router.post('/products', authMiddleware_1.authenticateAdmin, ProductController.createProductController);
// Rota para atualizar um produto (somente admin pode acessar)
router.put('/products/:id', authMiddleware_1.authenticateAdmin, ProductController.updateProductController);
// Rota para deletar um produto (somente admin pode acessar)
router.delete('/products/:id', authMiddleware_1.authenticateAdmin, ProductController.deleteProductController);
// Rotas públicas para visualização de produtos
// Rota para obter um produto pelo ID (acessível publicamente)
router.get('/products/:id', ProductController.getProductByIdController);
// Rota para obter todos os produtos (acessível publicamente)
router.get('/products', ProductController.getAllProductsController);
exports.default = router;
