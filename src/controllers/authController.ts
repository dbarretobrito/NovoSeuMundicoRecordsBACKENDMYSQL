import { Request, Response, NextFunction } from 'express';
import knex from '../database/connection'; // Certifique-se de importar a conexão correta
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Para carregar as variáveis de ambiente

export const loginAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { username, password } = req.body;

  try {
    // Verificar se o admin existe
    const admin = await knex('admins').where({ username }).first();

    if (!admin) {
      res.status(404).json({ message: 'Admin não encontrado' });
      return;
    }

    // Verificar se a senha está correta
    const validPassword = await bcrypt.compare(password, admin.password);

    if (!validPassword) {
      res.status(401).json({ message: 'Senha incorreta' });
      return;
    }

    // Gerar um token JWT
    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    // Resposta com uma mensagem de sucesso e o token
    res.status(200).json({
      message: 'Login feito com sucesso',
      token: token
    });
  } catch (error) {
    next(error); // Chama o próximo middleware para tratar o erro
  }
};
