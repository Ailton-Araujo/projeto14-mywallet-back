import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { unauthorizedError } from '@/errors';
import { sessionRepository } from '@/repositories';

export async function validateAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header('Authorization');
  if (!authHeader) throw unauthorizedError('Token não foi fornecido');

  const token = authHeader.split(' ')[1];
  if (!token) throw unauthorizedError('Token fornecido no formato incorreto');

  const { userId } = jwt.verify(token, process.env.JWT_SECRET || '') as JWTPayload;

  const session = await sessionRepository.findSession(userId, token);
  if (!session || session.signOut) throw unauthorizedError('Usuario não está logado');

  const userInfo = { userId, sessionId: session.id };
  res.locals = userInfo;
  next();
}

type JWTPayload = {
  userId: string;
};
