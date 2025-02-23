import { Response } from 'express';
import { PrismaClient, TransactionType } from '@prisma/client';
import { CategoryInput, AuthRequest } from '../types';

const prisma = new PrismaClient();

type PrismaError = {
  code: string;
  message: string;
};

export class CategoryController {
  static async create(req: AuthRequest, res: Response) {
    try {
      const { name, type } = req.body;
      const userId = req.user.id;

      console.log('Creating category with data:', { name, type, userId });

      const category = await prisma.category.create({
        data: {
          name,
          type: type as TransactionType,
          userId
        }
      });

      res.json(category);
    } catch (error) {
      console.error('Error creating category:', error);
      
      // Manejo de errores de Prisma
      const prismaError = error as PrismaError;
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
  }

  static async getCategories(req: AuthRequest, res: Response) {
    try {
      const categories = await prisma.category.findMany({
        where: { userId: req.user.id }
      });
      res.json(categories);
    } catch (error) {
      console.error('Error getting categories:', error);
      res.status(500).json({ error: 'Error al obtener las categorías' });
    }
  }
} 