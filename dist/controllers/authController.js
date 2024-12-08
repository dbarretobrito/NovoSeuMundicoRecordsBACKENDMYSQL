"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdmin = void 0;
const connection_1 = __importDefault(require("../database/connection"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Carrega as variáveis de ambiente do arquivo .env
// Função para fazer login do administrador
const loginAdmin = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        // Verifica se o administrador existe no banco de dados
        const admin = await (0, connection_1.default)('admins').where({ username }).first();
        if (!admin) {
            res.status(404).json({ message: 'Admin não encontrado' });
            return;
        }
        // Verifica se a senha fornecida corresponde à senha armazenada no banco
        const validPassword = await bcryptjs_1.default.compare(password, admin.password);
        if (!validPassword) {
            res.status(401).json({ message: 'Senha incorreta' });
            return;
        }
        // Se a autenticação for bem-sucedida, gera um token JWT
        const token = jsonwebtoken_1.default.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Resposta com uma mensagem de sucesso e o token
        res.status(200).json({
            message: 'Login feito com sucesso',
            token: token
        });
    }
    catch (error) {
        // Se ocorrer um erro durante o processo, chama o próximo middleware de erro
        next(error);
    }
};
exports.loginAdmin = loginAdmin;
