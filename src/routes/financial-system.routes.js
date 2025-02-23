"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const financial_system_controller_1 = require("../controllers/financial-system.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
// Rutas para sistemas financieros por perfil
router.post('/profile/:profileId', financial_system_controller_1.FinancialSystemController.create);
router.get('/profile/:profileId', financial_system_controller_1.FinancialSystemController.getByProfile);
// Rutas para un sistema financiero específico
router.put('/:id', financial_system_controller_1.FinancialSystemController.update);
router.delete('/:id', financial_system_controller_1.FinancialSystemController.delete);
exports.default = router;
