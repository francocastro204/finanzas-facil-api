import { PrismaClient } from '@prisma/client';
import { CollaboratorInput } from '../types';

const prisma = new PrismaClient();

export class CollaboratorService {
  static async create(systemId: string, input: CollaboratorInput) {
    const { profileId, percentage } = input;

    // Verificar que el perfil existe
    const profile = await prisma.profile.findUnique({
      where: { id: profileId }
    });

    if (!profile) {
      throw new Error('Perfil no encontrado');
    }

    // Verificar que el colaborador no existe ya en el sistema
    const existingCollaborator = await prisma.collaborator.findFirst({
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
  }

  static async getBySystem(systemId: string) {
    return prisma.collaborator.findMany({
      where: { systemId }
    });
  }

  static async update(id: string, percentage: number) {
    return prisma.collaborator.update({
      where: { id },
      data: { percentage }
    });
  }

  static async delete(id: string) {
    return prisma.collaborator.delete({
      where: { id }
    });
  }
} 