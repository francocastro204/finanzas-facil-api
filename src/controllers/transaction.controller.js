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
exports.TransactionController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class TransactionController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { amount, type, description, date, accountId, categoryId } = req.body;
                const userId = req.user.id;
                const transaction = yield prisma.transaction.create({
                    data: {
                        amount,
                        type,
                        description,
                        date,
                        accountId,
                        categoryId,
                        userId
                    }
                });
                res.json(transaction);
            }
            catch (error) {
                console.error('Error creating transaction:', error);
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'Error al crear la transacción' });
                }
            }
        });
    }
    static getTransactions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactions = yield prisma.transaction.findMany({
                    where: { userId: req.user.id },
                    include: {
                        account: true,
                        category: true
                    }
                });
                res.json(transactions);
            }
            catch (error) {
                res.status(500).json({ error: 'Error al obtener las transacciones' });
            }
        });
    }
}
exports.TransactionController = TransactionController;
