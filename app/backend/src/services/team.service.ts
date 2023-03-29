import { ModelStatic } from 'sequelize';
import Team from '../database/models/team.model';

export default class TeamService {
  private _model : ModelStatic<Team>;

  constructor(model:ModelStatic<Team>) {
    this._model = model;
  }

  async getAll():Promise<Team[]> {
    return this._model.findAll();
  }

  async getById(id:number):Promise<Team | null> {
    return this._model.findByPk(id);
  }
}
