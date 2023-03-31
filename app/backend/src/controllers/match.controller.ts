import { Request, Response } from 'express';
import { IMatch } from '../interfaces';
import MatchService from '../services/match.service';
import { mapError } from '../utils/errorMap';

export default class MatchController {
  private _service: MatchService;

  constructor(service: MatchService) {
    this._service = service;
  }

  async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const aux = ['true', 'false'];
    const bool = (aux.includes(inProgress as string)) ? inProgress === 'true' : undefined;

    const teams = await this._service.getAll(bool);
    return res.status(200).json(teams.message);
  }

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { message } = await this._service.finishMatch(Number(id));

    return res.status(200).json(message);
  }

  async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const rawData = req.body;
    const data = {
      homeTeamGoals: Number(rawData.homeTeamGoals),
      awayTeamGoals: Number(rawData.awayTeamGoals),
    };
    await this._service.updateMatch(Number(id), data);
    return res.status(200).json({ message: 'Match updated!' });
  }

  async newMatch(req: Request, res: Response) {
    const data: IMatch = req.body;
    const { type, message } = await this._service.createMatch(data);
    if (type) return res.status(mapError(type)).json({ message });

    return res.status(201).json(message);
  }
}
