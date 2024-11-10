import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis de ambiente, incluindo a chave secreta do JWT

// Define uma interface que estende o Request padrão do Express para incluir informações do admin autenticado
interface AuthenticatedRequest extends Request {
  admin?: string | object; // Tipo do objeto admin anexado ao request após a verificação do token
}

// Middleware para autenticação de administradores
export const authenticateAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  // Extrai o token do cabeçalho Authorization no formato "Bearer <token>"
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Acesso negado, token não fornecido' });
    return; // Encerra o middleware se o token não for encontrado
  }

  try {
    // Verifica e decodifica o token usando a chave secreta
    const verified = jwt.verify(token, process.env.JWT_SECRET as string);
    req.admin = verified; // Anexa os dados do admin ao request
    next(); // Chama o próximo middleware ou controlador
  } catch (error) {
    // Caso o token seja inválido ou ocorra algum erro, retorna um erro 400
    res.status(400).json({ message: 'Token inválido' });
  }
};
