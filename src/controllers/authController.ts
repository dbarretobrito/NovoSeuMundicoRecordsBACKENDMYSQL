import { Request, Response, NextFunction } from 'express';
import knex from '../database/connection';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

// Função para fazer login do administrador
export const loginAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { username, password } = req.body;

  try {
    // Verifica se o administrador existe no banco de dados
    const admin = await knex('admins').where({ username }).first();

    if (!admin) {
      res.status(404).json({ message: 'Admin não encontrado' });
      return;
    }

    // Verifica se a senha fornecida corresponde à senha armazenada no banco
    const validPassword = await bcrypt.compare(password, admin.password);

    if (!validPassword) {
      res.status(401).json({ message: 'Senha incorreta' });
      return;
    }

    // Se a autenticação for bem-sucedida, gera um token JWT
    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    // Resposta com uma mensagem de sucesso e o token
    res.status(200).json({
      message: 'Login feito com sucesso',
      token: token
    });
  } catch (error) {
    // Se ocorrer um erro durante o processo, chama o próximo middleware de erro
    next(error);
  }
};
