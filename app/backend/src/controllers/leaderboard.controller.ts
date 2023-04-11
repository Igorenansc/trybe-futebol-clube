import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';
// import { mapError } from '../utils/errorMap';

export default class LeaderboardController {
  private _service: LeaderboardService;

  constructor(service: LeaderboardService) {
    this._service = service;
  }

  async getAllLB(req: Request, res: Response) {
    const { message } = await this._service.getAll();
    return res.status(200).json(message);
  }

  async getHomeLB(req: Request, res: Response) {
    const { message } = await this._service.getAllHome();
    return res.status(200).json(message);
  }

  async getAwayLB(req: Request, res: Response) {
    const { message } = await this._service.getAllAway();
    return res.status(200).json(message);
  }
}
