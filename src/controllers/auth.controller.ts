import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { RegisterInput, LoginInput } from '../types';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const input: RegisterInput = req.body;
      const result = await AuthService.register(input);
      res.json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error al registrar usuario' });
      }
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const input: LoginInput = req.body;
      const result = await AuthService.login(input);
      res.json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error al iniciar sesión' });
      }
    }
  }
} 