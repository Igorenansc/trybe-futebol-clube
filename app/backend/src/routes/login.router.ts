import { Request, Response, Router } from 'express';
import UserController from '../controllers/user.controller';
import User from '../database/models/user.model';
import UserService from '../services/user.service';

const loginRouter = Router();

const userService = new UserService(User);
const teamController = new UserController(userService);

loginRouter.post('/', (req: Request, res: Response) => teamController.login(req, res));

export default loginRouter;
