import { NextFunction, Request, Response } from 'express';
import * as token from '../utils/token';

export default function validateToken(req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    token.verify(authorization);
    return next();
  } catch (error) {
    return res.status(401).json({
      message: 'Token must be a valid token',
    });
  }
}
