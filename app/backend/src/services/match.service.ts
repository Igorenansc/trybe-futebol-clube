import { ModelStatic } from 'sequelize';
// import models from '../database/models';
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

  // static async getAllLeaderboards() {
  //   const leaderboards = await models.query(`
  //     SELECT team.team_name AS name,
  //     ((SUM(matches.home_team_goals AS htg > matches.away_team_goals AS atg) * 3) + SUM(htg = atg))
  //       AS totalPoints,
  //     COUNT(matches.home_team_id) AS totalGames,
  //     SUM(htg > atg) AS totalVictories,
  //     SUM(htg = atg) AS totalDraws,
  //     SUM(htg < atg) AS totalLosses,
  //     SUM(htg) AS goalsFavor,
  //     SUM(atg) AS goalsOwn,
  //     SUM(htg) - SUM(atg) AS goalsBalance
  //     FROM teams JOIN matches ON teams.id = matches.home_team_id
  //     WHERE matches.in_progress = false
  //     GROUP BY name
  //     ORDER BY totalPoints DESC
  //   `);
  //   return { type: null, message: leaderboards };
  // }
}
