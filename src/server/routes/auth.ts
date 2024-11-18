import { Router } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { statements } from '../lib/db';
import { randomUUID } from 'crypto';

const router = Router();

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  companyName: z.string().min(2, 'Company name must be at least 2 characters')
});

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, companyName } = registerSchema.parse(req.body);

    const existingUser = statements.findUserByEmail.get(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const companyId = randomUUID();
    const userId = randomUUID();

    statements.createCompany.run(companyId, companyName, null);
    statements.createUser.run(
      userId,
      email,
      name,
      hashedPassword,
      'ADMIN',
      JSON.stringify(['*']),
      companyId
    );

    const token = jwt.sign(
      { userId, companyId },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.json({
      user: {
        id: userId,
        name,
        email,
        role: 'ADMIN',
        permissions: ['*']
      },
      token
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = statements.findUserByEmail.get(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, companyId: user.company_id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: JSON.parse(user.permissions)
      },
      token
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
});

export { router as authRouter };