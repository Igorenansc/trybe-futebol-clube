import { ModelStatic } from 'sequelize';
import Team from '../database/models/team.model';

export default class TeamService {
  private _model : ModelStatic<Team>;

  constructor(model:ModelStatic<Team>) {
    this._model = model;
  }

  async getAll():Promise<{ type: null; message: Team[]; }> {
    const teams = await this._model.findAll();

    return { type: null, message: teams };
  }

  async getById(id:number)
    :Promise<{ type: string; message: string; } | { type: null; message: Team; }> {
    const team = await this._model.findByPk(id);

    if (!team) return { type: 'NOT_FOUND', message: 'Team not found!' };

    return { type: null, message: team };
  }
}
