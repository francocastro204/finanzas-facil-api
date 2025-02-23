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
exports.FinancialRuleService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class FinancialRuleService {
    static update(id, input) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.financialRule.update({
                where: { id },
                data: input
            });
        });
    }
    static validateRules(systemId, newPercentage, excludeRuleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rules = yield prisma.financialRule.findMany({
                where: {
                    systemId,
                    NOT: excludeRuleId ? { id: excludeRuleId } : undefined
                }
            });
            const totalPercentage = rules.reduce((sum, rule) => sum + rule.percentage, 0);
            if (totalPercentage + newPercentage > 100) {
                throw new Error('La suma de los porcentajes no puede superar el 100%');
            }
        });
    }
    static getBySystem(systemId) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.financialRule.findMany({
                where: { systemId },
                include: {
                    expenses: true
                }
            });
        });
    }
}
exports.FinancialRuleService = FinancialRuleService;
