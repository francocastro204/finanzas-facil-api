import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CategoryInput, AuthRequest } from '../types';

const prisma = new PrismaClient();

export class CategoryController {
  static async createCategory(req: AuthRequest, res: Response) {
    try {
      const { name, type }: CategoryInput = req.body;
      const userId = req.user.id;

      const category = await prisma.category.create({
        data: {
          name,
          type,
          userId
        }
      });

      res.json(category);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la categoría' });
    }
  }

  static async getCategories(req: AuthRequest, res: Response) {
    try {
      const categories = await prisma.category.findMany({
        where: { userId: req.user.id }
      });
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las categorías' });
    }
  }
} 