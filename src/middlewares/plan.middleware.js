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
exports.validateFinancialSystemLimit = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const systemLimits = {
    FREE: 1,
    PREMIUM: 2,
    PLUS: 4
};
const validateFinancialSystemLimit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({
            where: { id: req.user.id },
            include: {
                profiles: {
                    include: {
                        financialSystems: true
                    }
                }
            }
        });
        if (!user) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }
        const totalSystems = user.profiles.reduce((acc, profile) => acc + profile.financialSystems.length, 0);
        if (totalSystems >= systemLimits[user.planType]) {
            return res.status(403).json({
                error: 'Has alcanzado el límite de sistemas financieros para tu plan'
            });
        }
        next();
    }
    catch (error) {
        res.status(500).json({ error: 'Error al validar límite de sistemas' });
    }
});
exports.validateFinancialSystemLimit = validateFinancialSystemLimit;
