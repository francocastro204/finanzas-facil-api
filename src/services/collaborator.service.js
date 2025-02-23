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
exports.CollaboratorService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CollaboratorService {
    static create(systemId, input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { profileId, percentage } = input;
            // Verificar que el perfil existe
            const profile = yield prisma.profile.findUnique({
                where: { id: profileId }
            });
            if (!profile) {
                throw new Error('Perfil no encontrado');
            }
            // Verificar que el colaborador no existe ya en el sistema
            const existingCollaborator = yield prisma.collaborator.findFirst({
                where: {
                    systemId,
                    profileId
                }
            });
            if (existingCollaborator) {
                throw new Error('Este perfil ya es colaborador del sistema');
            }
            // Crear el colaborador
            return prisma.collaborator.create({
                data: {
                    systemId,
                    profileId,
                    percentage
                }
            });
        });
    }
    static getBySystem(systemId) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.collaborator.findMany({
                where: { systemId }
            });
        });
    }
    static update(id, percentage) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.collaborator.update({
                where: { id },
                data: { percentage }
            });
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.collaborator.delete({
                where: { id }
            });
        });
    }
}
exports.CollaboratorService = CollaboratorService;
