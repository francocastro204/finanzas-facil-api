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
exports.FinancialSystemController = void 0;
const financial_system_service_1 = require("../services/financial-system.service");
const plan_middleware_1 = require("../middlewares/plan.middleware");
class FinancialSystemController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, plan_middleware_1.validateFinancialSystemLimit)(req, res, () => __awaiter(this, void 0, void 0, function* () {
                    const input = req.body;
                    const profileId = req.params.profileId;
                    const system = yield financial_system_service_1.FinancialSystemService.create(profileId, input);
                    res.json(system);
                }));
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'Error al crear el sistema financiero' });
                }
            }
        });
    }
    static getByProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profileId = req.params.profileId;
                const systems = yield financial_system_service_1.FinancialSystemService.getByProfile(profileId);
                res.json(systems);
            }
            catch (error) {
                res.status(500).json({ error: 'Error al obtener los sistemas financieros' });
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const input = req.body;
                const system = yield financial_system_service_1.FinancialSystemService.update(id, input);
                res.json(system);
            }
            catch (error) {
                res.status(500).json({ error: 'Error al actualizar el sistema financiero' });
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield financial_system_service_1.FinancialSystemService.delete(id);
                res.json({ message: 'Sistema financiero eliminado' });
            }
            catch (error) {
                res.status(500).json({ error: 'Error al eliminar el sistema financiero' });
            }
        });
    }
}
exports.FinancialSystemController = FinancialSystemController;
