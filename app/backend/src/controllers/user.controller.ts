import { Request, Response } from 'express';
import UserService from '../services/user.service';
import { mapError } from '../utils/errorMap';

export default class UserController {
  private _service: UserService;

  constructor(service: UserService) {
    this._service = service;
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
}
