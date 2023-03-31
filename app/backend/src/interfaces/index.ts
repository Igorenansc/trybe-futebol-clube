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
