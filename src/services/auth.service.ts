import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RegisterInput, LoginInput } from '../types';

const prisma = new PrismaClient();

export class AuthService {
  static async register(input: RegisterInput) {
    const { email, password, firstName, lastName, phone } = input;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
      },
    });

    // Crear perfil por defecto
    await prisma.profile.create({
      data: {
        name: `${firstName} ${lastName}`,
        userId: user.id,
      },
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
    return { token };
  }

  static async login(input: LoginInput) {
    const { email, password } = input;

    const user = await prisma.user.findUnique({ 
      where: { email },
      include: { profiles: true }
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Contraseña incorrecta');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
    return { token, user };
  }
} 