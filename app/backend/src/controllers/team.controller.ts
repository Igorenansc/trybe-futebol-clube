import { Request, Response } from 'express';
import TeamService from '../services/team.service';
import { mapError } from '../utils/errorMap';

export default class TeamController {
  private _service: TeamService;

  constructor(service: TeamService) {
    this._service = service;
  }

  async getAll(_req: Request, res: Response) {
    const teams = await this._service.getAll();
    return res.status(200).json(teams.message);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const { type, message } = await this._service.getById(Number(id));
    if (type) return res.status(mapError(type)).json({ message });

    return res.status(200).json({ message });
  }
}
