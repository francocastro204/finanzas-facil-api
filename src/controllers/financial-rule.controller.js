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
exports.FinancialRuleController = void 0;
const financial_rule_service_1 = require("../services/financial-rule.service");
class FinancialRuleController {
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const input = req.body;
                const systemId = req.params.systemId;
                yield financial_rule_service_1.FinancialRuleService.validateRules(systemId, input.percentage, id);
                const rule = yield financial_rule_service_1.FinancialRuleService.update(id, input);
                res.json(rule);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'Error al actualizar la regla financiera' });
                }
            }
        });
    }
    static getBySystem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const systemId = req.params.systemId;
                const rules = yield financial_rule_service_1.FinancialRuleService.getBySystem(systemId);
                res.json(rules);
            }
            catch (error) {
                res.status(500).json({ error: 'Error al obtener las reglas financieras' });
            }
        });
    }
}
exports.FinancialRuleController = FinancialRuleController;
