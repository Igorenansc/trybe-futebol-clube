export interface ITeam {
  id: number,
  teamName: string,
}

export interface IUser {
  id: number,
  username: string,
  role: string,
  email: string,
  password?: string,
}

export interface IMatch extends IGoals {
  id?: number,
  homeTeamId: number,
  awayTeamId: number,
  inProgress?: boolean,
}

export interface IGoals {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface ILeaderboard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string,
}

export interface IToken {
  data: {
    id: number,
    username: string,
    role: string,
    email: string,
    password: string,
  }
  iat: number,
  exp: number
}
