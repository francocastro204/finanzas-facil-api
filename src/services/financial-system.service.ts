import { PrismaClient } from '@prisma/client';
import { FinancialSystemInput } from '../types';

const prisma = new PrismaClient();

export class FinancialSystemService {
  static async create(profileId: string, input: FinancialSystemInput) {
    return prisma.financialSystem.create({
      data: {
        ...input,
        profileId,
        icon: '💰' // default icon
      }
    });
  }

  static async getByProfile(profileId: string) {
    return prisma.financialSystem.findMany({
      where: { profileId },
      include: {
        rules: true,
        collaborators: true
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