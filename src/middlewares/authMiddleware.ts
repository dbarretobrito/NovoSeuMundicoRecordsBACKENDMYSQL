import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Para acessar o JWT_SECRET

// Criação de um tipo para incluir os dados do admin no Request
interface AuthenticatedRequest extends Request {
  admin?: string | object; // Definindo o tipo do admin anexado
}

export const authenticateAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.split(' ')[1]; // Formato: "Bearer <token>"

  if (!token) {
    res.status(401).json({ message: 'Acesso negado, token não fornecido' });
    return; // Finaliza o middleware aqui se o token não for encontrado
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET as string);
    req.admin = verified; // Anexa os dados do admin ao request
    next(); // Chama o próximo middleware ou controlador
  } catch (error) {
    res.status(400).json({ message: 'Token inválido' });
  }
};
