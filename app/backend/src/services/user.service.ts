import * as bcrypt from 'bcryptjs';
import { ModelStatic } from 'sequelize';
import User from '../database/models/user.model';
import * as token from '../utils/token';

export default class UserService {
  private _model: ModelStatic<User>;

  constructor(model: ModelStatic<User>) {
    this._model = model;
  }

  async login(email: string, pass: string):Promise<{ type: string | null; message: string }> {
    const user = await this._model.findOne({ where: { email } });
    const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email || !pass) {
      return { type: 'MISSING_VALUE', message: 'All fields must be filled' };
    }

    if (!user || !emailRegEx.test(email)) {
      return { type: 'NOT_AUTHORIZED', message: 'Invalid email or password' };
    }

    if (!bcrypt.compareSync(pass, user.dataValues.password) || pass.length < 6) {
      return { type: 'NOT_AUTHORIZED', message: 'Invalid email or password' };
    }

    const { password, ...userWithoutPassword } = user.dataValues;
    const generatedToken = token.generate(userWithoutPassword);

    return { type: null, message: generatedToken };
  }
}
