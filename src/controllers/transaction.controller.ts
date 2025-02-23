import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { TransactionInput, AuthRequest } from '../types';

const prisma = new PrismaClient();

export class TransactionController {
  static async create(req: AuthRequest, res: Response) {
    try {
      const { amount, type, description, date, accountId, categoryId }: TransactionInput = req.body;
      const userId = req.user.id;

      const transaction = await prisma.transaction.create({
        data: {
          amount,
          type,
          description,
          date,
          accountId,
          categoryId,
          userId
        }
      });

      res.json(transaction);
    } catch (error) {
      console.error('Error creating transaction:', error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error al crear la transacción' });
      }
    }
  }

  static async getTransactions(req: AuthRequest, res: Response) {
    try {
      const transactions = await prisma.transaction.findMany({
        where: { userId: req.user.id },
        include: {
          account: true,
          category: true
        }
      });
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las transacciones' });
    }
  }
} 