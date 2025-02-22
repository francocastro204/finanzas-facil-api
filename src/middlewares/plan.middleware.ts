import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../types';

const prisma = new PrismaClient();

const systemLimits = {
  FREE: 1,
  PREMIUM: 2,
  PLUS: 4
} as const;

export const validateFinancialSystemLimit = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.findUnique({
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

    const totalSystems = user.profiles.reduce(
      (acc: number, profile: { financialSystems: any[] }) => acc + profile.financialSystems.length,
      0
    );

    if (totalSystems >= systemLimits[user.planType as keyof typeof systemLimits]) {
      return res.status(403).json({ 
        error: 'Has alcanzado el límite de sistemas financieros para tu plan' 
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'Error al validar límite de sistemas' });
  }
}; 