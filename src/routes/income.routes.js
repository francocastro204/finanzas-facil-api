"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const income_controller_1 = require("../controllers/income.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
// Rutas para ingresos de un sistema financiero
router.post('/system/:systemId', income_controller_1.IncomeController.create);
router.get('/system/:systemId', income_controller_1.IncomeController.getBySystem);
router.get('/system/:systemId/monthly', income_controller_1.IncomeController.getMonthlyTotal);
router.delete('/:id', income_controller_1.IncomeController.delete);
exports.default = router;
