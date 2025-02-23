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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
class AuthService {
    static register(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, firstName, lastName, phone } = input;
            const existingUser = yield prisma.user.findUnique({ where: { email } });
            if (existingUser) {
                throw new Error('El email ya está registrado');
            }
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const user = yield prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    firstName,
                    lastName,
                    phone,
                },
            });
            // Crear perfil por defecto
            yield prisma.profile.create({
                data: {
                    name: `${firstName} ${lastName}`,
                    userId: user.id,
                },
            });
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET);
            return { token };
        });
    }
    static login(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = input;
            const user = yield prisma.user.findUnique({
                where: { email },
                include: { profiles: true }
            });
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            const validPassword = yield bcryptjs_1.default.compare(password, user.password);
            if (!validPassword) {
                throw new Error('Contraseña incorrecta');
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET);
            return { token, user };
        });
    }
}
exports.AuthService = AuthService;
