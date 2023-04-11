import { ModelStatic } from 'sequelize';
import Match from '../database/models/match.model';
import Team from '../database/models/team.model';
import { ILeaderboard } from '../interfaces';

export default class LeaderboardService {
  private _matchModel: ModelStatic<Match>;
  private _teamModel: ModelStatic<Team>;

  constructor(matchModel: ModelStatic<Match>, teamModel: ModelStatic<Team>) {
    this._matchModel = matchModel;
    this._teamModel = teamModel;
  }

  async getAll() {
    const { message: homeLB } = await this.getAllHome();
    const { message: awayLB } = await this.getAllAway();
    const allLeaderboards = LeaderboardService.allLeaderboards(homeLB, awayLB);
    return { type: null, message: LeaderboardService.OrdenateLeaderboard(allLeaderboards) };
  }

  async getAllHome() {
    // const leaderboards = await models.query(query);
    const teams = await this._teamModel.findAll();
    const matches = await this._matchModel.findAll({ where: { inProgress: false } });

    const leaderboards = teams.map(({ id, teamName }) => {
      const played = matches.filter((match) => match.homeTeamId === id);
      const leaderboard = LeaderboardService.homeLeaderboard(played);
      return {
        name: teamName,
        ...leaderboard,
        goalsBalance: leaderboard.goalsFavor - leaderboard.goalsOwn,
        efficiency: ((leaderboard.totalPoints / (leaderboard.totalGames * 3)) * 100).toFixed(2),
      };
    });

    return { type: null, message: LeaderboardService.OrdenateLeaderboard(leaderboards) };
  }

  async getAllAway() {
    const teams = await this._teamModel.findAll();
    const matches = await this._matchModel.findAll({ where: { inProgress: false } });

    const leaderboards = teams.map(({ id, teamName }) => {
      const played = matches.filter((m) => m.awayTeamId === id);
      const leaderboard = LeaderboardService.awayLeaderboard(played);
      return {
        name: teamName,
        ...leaderboard,
        goalsBalance: leaderboard.goalsFavor - leaderboard.goalsOwn,
        efficiency: ((leaderboard.totalPoints / (leaderboard.totalGames * 3)) * 100).toFixed(2),
      };
    });

    return { type: null, message: LeaderboardService.OrdenateLeaderboard(leaderboards) };
  }

  static homeLeaderboard(matches: Match[]) {
    return {
      totalPoints: matches.reduce((acc: number, curr: Match) => {
        if (curr.homeTeamGoals < curr.awayTeamGoals) return acc;
        return ((curr.homeTeamGoals > curr.awayTeamGoals) ? acc + 3 : acc + 1);
      }, 0),
      totalGames: matches.length,
      totalVictories: matches.filter((match) => match.awayTeamGoals < match.homeTeamGoals).length,
      totalDraws: matches.filter((match) => match.awayTeamGoals === match.homeTeamGoals).length,
      totalLosses: matches.filter((match) => match.awayTeamGoals > match.homeTeamGoals).length,
      goalsFavor: matches.reduce((acc: number, curr: Match) => acc + curr.homeTeamGoals, 0),
      goalsOwn: matches.reduce((acc: number, curr: Match) => acc + curr.awayTeamGoals, 0),
    };
  }

  static awayLeaderboard(matches: Match[]) {
    return {
      totalPoints: matches.reduce((acc: number, curr: Match) => {
        if (curr.homeTeamGoals > curr.awayTeamGoals) return acc;
        return ((curr.homeTeamGoals < curr.awayTeamGoals) ? acc + 3 : acc + 1);
      }, 0),
      totalGames: matches.length,
      totalVictories: matches.filter((match) => match.awayTeamGoals > match.homeTeamGoals).length,
      totalDraws: matches.filter((match) => match.awayTeamGoals === match.homeTeamGoals).length,
      totalLosses: matches.filter((match) => match.awayTeamGoals < match.homeTeamGoals).length,
      goalsFavor: matches.reduce((acc: number, curr: Match) => acc + curr.awayTeamGoals, 0),
      goalsOwn: matches.reduce((acc: number, curr: Match) => acc + curr.homeTeamGoals, 0),
    };
  }

  static allLeaderboards(homeLB: ILeaderboard[], awayLB: ILeaderboard[]) {
    return homeLB.map((home) => {
      const away = awayLB.find(({ name }) => name === home.name) as ILeaderboard;
      return {
        name: home.name,
        totalPoints: home.totalPoints + away.totalPoints,
        totalGames: home.totalGames + away.totalGames,
        totalVictories: home.totalVictories + away.totalVictories,
        totalDraws: home.totalDraws + away.totalDraws,
        totalLosses: home.totalLosses + away.totalLosses,
        goalsFavor: home.goalsFavor + away.goalsFavor,
        goalsOwn: home.goalsOwn + away.goalsOwn,
        goalsBalance: (home.goalsFavor + away.goalsFavor) - (home.goalsOwn + away.goalsOwn),
        efficiency: (((home.totalPoints + away.totalPoints)
          / ((home.totalGames + away.totalGames) * 3)) * 100).toFixed(2),
      };
    });
  }

  static OrdenateLeaderboard(leaderboard: ILeaderboard[]) {
    return leaderboard.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      return b.goalsFavor - a.goalsFavor;
    });
  }
}
