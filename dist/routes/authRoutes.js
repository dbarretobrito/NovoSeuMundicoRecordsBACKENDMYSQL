"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
// Define a rota para login de administradores
router.post('/login', authController_1.loginAdmin);
exports.default = router;
