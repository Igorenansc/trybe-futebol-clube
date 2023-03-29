import { Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  private _service: TeamService;

  constructor(service: TeamService) {
    this._service = service;
  }

  async getAll(_req: Request, res: Response) {
    const teams = await this._service.getAll();
    return res.status(200).json(teams);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await this._service.getById(Number(id));
    return res.status(200).json(team);
  }
}
