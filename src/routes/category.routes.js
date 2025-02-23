"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
// Corregir los nombres de los métodos para que coincidan con el controlador
router.post('/', category_controller_1.CategoryController.create);
router.get('/', category_controller_1.CategoryController.getCategories);
exports.default = router;
