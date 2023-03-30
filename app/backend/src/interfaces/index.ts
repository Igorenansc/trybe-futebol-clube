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

export interface IMatch {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
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
