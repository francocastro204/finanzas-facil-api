"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const collaborator_controller_1 = require("../controllers/collaborator.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
// Rutas para colaboradores de un sistema financiero
router.post('/system/:systemId', collaborator_controller_1.CollaboratorController.create);
router.get('/system/:systemId', collaborator_controller_1.CollaboratorController.getBySystem);
// Rutas para un colaborador específico
router.put('/:id', collaborator_controller_1.CollaboratorController.update);
router.delete('/:id', collaborator_controller_1.CollaboratorController.delete);
exports.default = router;
