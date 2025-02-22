import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { TransactionInput, AuthRequest } from '../types';

const prisma = new PrismaClient();

export class TransactionController {
  static async createTransaction(req: AuthRequest, res: Response) {
    try {
      const { amount, type, description, date, accountId, categoryId }: TransactionInput = req.body;
      const userId = req.user.id;

      const transaction = await prisma.$transaction(async (tx: PrismaClient) => {
        const newTransaction = await tx.transaction.create({
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

        const account = await tx.account.findUnique({ where: { id: accountId } });
        if (!account) throw new Error('Cuenta no encontrada');

        const newBalance = type === 'INCOME' 
          ? account.balance + amount 
          : account.balance - amount;

        await tx.account.update({
          where: { id: accountId },
          data: { balance: newBalance }
        });

        return newTransaction;
      });

      res.json(transaction);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la transacción' });
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