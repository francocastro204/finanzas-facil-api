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
exports.AccountController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class AccountController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, type, balance = 0 } = req.body;
                const userId = req.user.id;
                console.log('Creating account with data:', { name, type, balance, userId }); // Debug log
                const account = yield prisma.account.create({
                    data: {
                        name,
                        type,
                        balance,
                        userId
                    }
                });
                res.json(account);
            }
            catch (error) {
                console.error('Error creating account:', error);
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'Error al crear la cuenta' });
                }
            }
        });
    }
    static getAccounts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accounts = yield prisma.account.findMany({
                    where: { userId: req.user.id }
                });
                res.json(accounts);
            }
            catch (error) {
                console.error('Error getting accounts:', error);
                res.status(500).json({ error: 'Error al obtener las cuentas' });
            }
        });
    }
}
exports.AccountController = AccountController;
