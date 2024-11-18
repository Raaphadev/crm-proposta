import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';

export function authorize(requiredPermissions: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user?.id }
      });

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      const hasPermission = requiredPermissions.every(permission =>
        user.permissions.includes(permission)
      );

      if (!hasPermission) {
        return res.status(403).json({ message: 'Insufficient permissions' });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}