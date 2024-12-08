"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Carrega as variáveis de ambiente, incluindo a chave secreta do JWT
// Middleware para autenticação de administradores
const authenticateAdmin = (req, res, next) => {
    // Extrai o token do cabeçalho Authorization no formato "Bearer <token>"
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Acesso negado, token não fornecido' });
        return; // Encerra o middleware se o token não for encontrado
    }
    try {
        // Verifica e decodifica o token usando a chave secreta
        const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.admin = verified; // Anexa os dados do admin ao request
        next(); // Chama o próximo middleware ou controlador
    }
    catch (error) {
        // Caso o token seja inválido ou ocorra algum erro, retorna um erro 400
        res.status(400).json({ message: 'Token inválido' });
    }
};
exports.authenticateAdmin = authenticateAdmin;
