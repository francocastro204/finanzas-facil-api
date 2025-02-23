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
exports.IncomeController = void 0;
const income_service_1 = require("../services/income.service");
class IncomeController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const systemId = req.params.systemId;
                const input = req.body;
                const income = yield income_service_1.IncomeService.create(systemId, input);
                res.json(income);
            }
            catch (error) {
                res.status(500).json({ error: 'Error al crear el ingreso' });
            }
        });
    }
    static getBySystem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const systemId = req.params.systemId;
                const incomes = yield income_service_1.IncomeService.getBySystem(systemId);
                res.json(incomes);
            }
            catch (error) {
                res.status(500).json({ error: 'Error al obtener los ingresos' });
            }
        });
    }
    static getMonthlyTotal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const systemId = req.params.systemId;
                const { month, year } = req.query;
                const total = yield income_service_1.IncomeService.getMonthlyTotal(systemId, parseInt(month), parseInt(year));
                res.json({ total });
            }
            catch (error) {
                res.status(500).json({ error: 'Error al calcular el total mensual' });
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield income_service_1.IncomeService.delete(id);
                res.json({ message: 'Ingreso eliminado' });
            }
            catch (error) {
                res.status(500).json({ error: 'Error al eliminar el ingreso' });
            }
        });
    }
}
exports.IncomeController = IncomeController;
