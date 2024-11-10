import bcrypt from 'bcryptjs';

const password = 'bitchow123'; // Defina sua senha
const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync(password, salt);

console.log(hashedPassword); // Exibe o hash gerado no console
