import { ModelStatic } from 'sequelize';
import Match from '../database/models/match.model';
import Team from '../database/models/team.model';
import { IGoals, IMatch } from '../interfaces';
import TeamService from './team.service';

export default class MatchService {
  private _model: ModelStatic<Match>;

  constructor(model: ModelStatic<Match>) {
    this._model = model;
  }

  async getAll(inProgress: undefined | boolean): Promise<{ type: null, message: Match[] }> {
    const where = (typeof inProgress === 'boolean') ? { inProgress } : {};
    const matches = await this._model.findAll({
      where,
      include: [{ model: Team, as: 'awayTeam' }, { model: Team, as: 'homeTeam' }],
    });
    return { type: null, message: matches };
  }

  async finishMatch(id: number) {
    await this._model.update({ inProgress: false }, { where: { id } });
    return { type: null, message: 'Finished' };
  }

  async updateMatch(id: number, data: IGoals) {
    await this._model.update({ ...data }, { where: { id } });
  }

  async createMatch(matchInfo: IMatch) {
    const teamService = new TeamService(Team);

    let error = await teamService.getById(matchInfo.homeTeamId);
    if (error.type) return { type: error.type, message: 'There is no team with such id!' };

    error = await teamService.getById(matchInfo.awayTeamId);
    if (error.type) return { type: error.type, message: 'There is no team with such id!' };

    const newMatch = await this._model.create({ ...matchInfo, inProgress: true });
    return { type: null, message: newMatch };
  }
}
