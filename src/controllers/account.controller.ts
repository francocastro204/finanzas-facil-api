import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AccountInput, AuthRequest } from '../types';

const prisma = new PrismaClient();

export class AccountController {
  static async createAccount(req: AuthRequest, res: Response) {
    try {
      const { name, type, balance = 0 }: AccountInput = req.body;
      const userId = req.user.id;

      const account = await prisma.account.create({
        data: {
          name,
          type,
          balance,
          userId
        }
      });

      res.json(account);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la cuenta' });
    }
  }

  static async getAccounts(req: AuthRequest, res: Response) {
    try {
      const accounts = await prisma.account.findMany({
        where: { userId: req.user.id }
      });
      res.json(accounts);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las cuentas' });
    }
  }
} 