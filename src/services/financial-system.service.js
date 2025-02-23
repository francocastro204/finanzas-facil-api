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
exports.FinancialSystemService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class FinancialSystemService {
    static create(profileId, input) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.financialSystem.create({
                data: Object.assign(Object.assign({}, input), { profileId, icon: '💰' // default icon
                 })
            });
        });
    }
    static getByProfile(profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.financialSystem.findMany({
                where: { profileId },
                include: {
                    rules: true,
                    collaborators: true
                }
            });
        });
    }
    static update(id, input) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.financialSystem.update({
                where: { id },
                data: input,
                include: {
                    rules: true
                }
            });
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.financialSystem.delete({
                where: { id }
            });
        });
    }
}
exports.FinancialSystemService = FinancialSystemService;
