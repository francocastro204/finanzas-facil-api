import { PrismaClient, Prisma } from '@prisma/client';
import { FinancialSystemInput } from '../types';

const prisma = new PrismaClient();

export class FinancialSystemService {
  static async create(profileId: string, input: FinancialSystemInput) {
    const { name, color, currency, periodType } = input;

    // Crear sistema financiero
    const system = await prisma.financialSystem.create({
      data: {
        name,
        color,
        icon: '💰', // TODO: Implementar servicio de IA para seleccionar icono
        currency,
        periodType,
        profileId,
        // Crear reglas financieras por defecto (50/30/20)
        rules: {
          create: [
            {
              name: 'Necesidades',
              percentage: 50
            },
            {
              name: 'Deseos',
              percentage: 30
            },
            {
              name: 'Ahorros',
              percentage: 20
            }
          ]
        }
      },
      include: {
        rules: true
      }
    });

    return system;
  }

  static async getByProfile(profileId: string) {
    return prisma.financialSystem.findMany({
      where: { profileId },
      include: {
        rules: true,
        collaborators: {
          include: {
            profile: true
          }
        }
      }
    });
  }

  static async update(id: string, input: Partial<FinancialSystemInput>) {
    return prisma.financialSystem.update({
      where: { id },
      data: input,
      include: {
        rules: true
      }
    });
  }

  static async delete(id: string) {
    return prisma.financialSystem.delete({
      where: { id }
    });
  }
} 