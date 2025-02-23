"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollaboratorController = void 0;
const collaborator_service_1 = require("../services/collaborator.service");
class CollaboratorController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const systemId = req.params.systemId;
                const input = req.body;
                const collaborator = yield collaborator_service_1.CollaboratorService.create(systemId, input);
                res.json(collaborator);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'Error al crear el colaborador' });
                }
            }
        });
    }
    static getBySystem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const systemId = req.params.systemId;
                const collaborators = yield collaborator_service_1.CollaboratorService.getBySystem(systemId);
                res.json(collaborators);
            }
            catch (error) {
                res.status(500).json({ error: 'Error al obtener los colaboradores' });
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const { percentage } = req.body;
                const collaborator = yield collaborator_service_1.CollaboratorService.update(id, percentage);
                res.json(collaborator);
            }
            catch (error) {
                res.status(500).json({ error: 'Error al actualizar el colaborador' });
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield collaborator_service_1.CollaboratorService.delete(id);
                res.json({ message: 'Colaborador eliminado' });
            }
            catch (error) {
                res.status(500).json({ error: 'Error al eliminar el colaborador' });
            }
        });
    }
}
exports.CollaboratorController = CollaboratorController;
