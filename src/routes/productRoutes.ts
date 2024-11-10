import { Router } from 'express';
import * as ProductController from '../controllers/ProductController';
import { authenticateAdmin } from '../middlewares/authMiddleware'; // Importa o middleware de autenticação de admin

const router = Router(); // Cria uma nova instância de roteador

// Rotas protegidas com autenticação de admin
// Rota para criar um produto (somente admin pode acessar)
router.post('/products', authenticateAdmin, ProductController.createProductController);

// Rota para atualizar um produto (somente admin pode acessar)
router.put('/products/:id', authenticateAdmin, ProductController.updateProductController);

// Rota para deletar um produto (somente admin pode acessar)
router.delete('/products/:id', authenticateAdmin, ProductController.deleteProductController);

// Rotas públicas para visualização de produtos
// Rota para obter um produto pelo ID (acessível publicamente)
router.get('/products/:id', ProductController.getProductByIdController);

// Rota para obter todos os produtos (acessível publicamente)
router.get('/products', ProductController.getAllProductsController);

export default router;
