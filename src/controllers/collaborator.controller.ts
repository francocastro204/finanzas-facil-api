import { Response } from 'express';
import { CollaboratorService } from '../services/collaborator.service';
import { CollaboratorInput, AuthRequest } from '../types';

export class CollaboratorController {
  static async create(req: AuthRequest, res: Response) {
    try {
      const systemId = req.params.systemId;
      const input: CollaboratorInput = req.body;
      
      const collaborator = await CollaboratorService.create(systemId, input);
      res.json(collaborator);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error al crear el colaborador' });
      }
    }
  }

  static async getBySystem(req: AuthRequest, res: Response) {
    try {
      const systemId = req.params.systemId;
      const collaborators = await CollaboratorService.getBySystem(systemId);
      res.json(collaborators);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los colaboradores' });
    }
  }

  static async update(req: AuthRequest, res: Response) {
    try {
      const id = req.params.id;
      const { percentage } = req.body;
      
      const collaborator = await CollaboratorService.update(id, percentage);
      res.json(collaborator);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el colaborador' });
    }
  }

  static async delete(req: AuthRequest, res: Response) {
    try {
      const id = req.params.id;
      await CollaboratorService.delete(id);
      res.json({ message: 'Colaborador eliminado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el colaborador' });
    }
  }
} 