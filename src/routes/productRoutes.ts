import { Router } from 'express';
import * as ProductController from '../controllers/ProductController';
import { authenticateAdmin } from '../middlewares/authMiddleware';

const router = Router();

// Rotas protegidas com autenticação de admin
router.post('/products', authenticateAdmin, ProductController.createProductController);

router.put('/products/:id', authenticateAdmin, ProductController.updateProductController);

router.delete('/products/:id', authenticateAdmin, ProductController.deleteProductController);

// Rotas públicas para visualização
router.get('/products/:id', ProductController.getProductByIdController);
router.get('/products', ProductController.getAllProductsController);

export default router;
