import { Request, Response } from 'express';
import { IToken } from '../interfaces';
import UserService from '../services/user.service';
import { mapError } from '../utils/errorMap';
import { extract } from '../utils/token';

export default class UserController {
  private _service: UserService;
  private _role: string;

  constructor(service: UserService) {
    this._service = service;
    this._role = '';
  }

  // async getAll(_req: Request, res: Response) {
  //   const teams = await this._service.getAll();
  //   return res.status(200).json(teams);
  // }

  // async getById(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const team = await this._service.getById(Number(id));
  //   return res.status(200).json(team);
  // }
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { type, message } = await this._service.login(email, password);
    if (type) return res.status(mapError(type)).json({ message });

    return res.status(200).json({ token: message });
  }

  async getRole(req: Request, res: Response) {
    const { authorization } = req.headers;
    try {
      const { data: { role } } = extract(authorization as string) as IToken;

      this._role = role;
      return res.status(200).json({ role });
    } catch (e) {
      return res.status(500).send();
    }
  }
}
