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
exports.IncomeService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class IncomeService {
    static create(systemId, input) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.income.create({
                data: Object.assign(Object.assign({}, input), { systemId })
            });
        });
    }
    static getBySystem(systemId) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.income.findMany({
                where: { systemId },
                orderBy: {
                    date: 'desc'
                }
            });
        });
    }
    static getMonthlyTotal(systemId, month, year) {
        return __awaiter(this, void 0, void 0, function* () {
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 0);
            const incomes = yield prisma.income.findMany({
                where: {
                    systemId,
                    date: {
                        gte: startDate,
                        lte: endDate
                    }
                }
            });
            return incomes.reduce((total, income) => total + income.amount, 0);
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.income.delete({
                where: { id }
            });
        });
    }
}
exports.IncomeService = IncomeService;
