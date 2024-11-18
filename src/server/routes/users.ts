import { Router } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma';
import { authorize } from '../middleware/authorize';

const router = Router();

const createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['ADMIN', 'MANAGER', 'COLLABORATOR']),
  permissions: z.array(z.string())
});

const updateUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  role: z.enum(['ADMIN', 'MANAGER', 'COLLABORATOR']).optional(),
  permissions: z.array(z.string()).optional()
});

// List users from the same company
router.get('/', authorize(['users.list']), async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        companyId: req.user!.companyId
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        permissions: true,
        avatar: true,
        createdAt: true
      }
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create new user
router.post('/', authorize(['users.create']), async (req, res) => {
  try {
    const { name, email, password, role, permissions } = createUserSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        permissions,
        companyId: req.user!.companyId
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        permissions: true,
        avatar: true,
        createdAt: true
      }
    });

    res.status(201).json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update user
router.put('/:id', authorize(['users.update']), async (req, res) => {
  try {
    const { id } = req.params;
    const updates = updateUserSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.companyId !== req.user!.companyId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updates,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        permissions: true,
        avatar: true,
        updatedAt: true
      }
    });

    res.json(updatedUser);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete user
router.delete('/:id', authorize(['users.delete']), async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.companyId !== req.user!.companyId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await prisma.user.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

export { router as usersRouter };