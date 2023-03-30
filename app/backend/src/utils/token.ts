import * as jwt from 'jsonwebtoken';
import { IUser } from '../interfaces';

const secret = process.env.JWT_SECRET || 'Batatinha';
const JWT_CONFIG: jwt.SignOptions = {
  algorithm: 'HS256',
  expiresIn: '30min',
};

const generate = (data: IUser) => jwt.sign({ data }, secret, JWT_CONFIG);
const verify = (token: string) => jwt.verify(token, secret);
const extract = (token: string) => jwt.decode(token);

export { generate, verify, extract };
