import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../types';

const prisma = new PrismaClient();

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ error: 'No se proporcionó token de autenticación' });
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    
    req.user = decoded as any;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ error: 'Token inválido' });
  }
}; 