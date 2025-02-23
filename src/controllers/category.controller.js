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
exports.CategoryController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CategoryController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, type } = req.body;
                const userId = req.user.id;
                console.log('Creating category with data:', { name, type, userId });
                const category = yield prisma.category.create({
                    data: {
                        name,
                        type,
                        userId
                    }
                });
                res.json(category);
            }
            catch (error) {
                console.error('Error creating category:', error);
                // Manejo de errores de Prisma
                const prismaError = error;
                if (prismaError.code) {
                    switch (prismaError.code) {
                        case 'P2002':
                            return res.status(400).json({ error: 'Ya existe una categoría con ese nombre' });
                        case 'P2003':
                            return res.status(400).json({ error: 'Usuario no encontrado' });
                        default:
                            return res.status(400).json({ error: `Error de base de datos: ${prismaError.message}` });
                    }
                }
                if (error instanceof Error) {
                    return res.status(400).json({ error: error.message });
                }
                res.status(500).json({ error: 'Error al crear la categoría' });
            }
        });
    }
    static getCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield prisma.category.findMany({
                    where: { userId: req.user.id }
                });
                res.json(categories);
            }
            catch (error) {
                console.error('Error getting categories:', error);
                res.status(500).json({ error: 'Error al obtener las categorías' });
            }
        });
    }
}
exports.CategoryController = CategoryController;
