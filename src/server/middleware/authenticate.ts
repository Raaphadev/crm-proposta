import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { statements } from '../lib/db';

interface JwtPayload {
  userId: string;
  companyId: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        companyId: string;
      };
    }
  }
}

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const user = statements.findUserById.get(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = {
      id: user.id,
      companyId: user.company_id
    };

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}