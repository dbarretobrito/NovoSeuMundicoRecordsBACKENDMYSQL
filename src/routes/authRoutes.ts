import { Router } from 'express';
import { loginAdmin } from '../controllers/authController';

const router = Router();

// Define a rota para login de administradores
router.post('/login', loginAdmin);

export default router;
