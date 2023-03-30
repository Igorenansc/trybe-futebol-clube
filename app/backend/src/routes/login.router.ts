import { Request, Response, Router } from 'express';
import UserController from '../controllers/user.controller';
import User from '../database/models/user.model';
import validateToken from '../middlewares/validateToken';
import UserService from '../services/user.service';

const loginRouter = Router();

const userService = new UserService(User);
const userController = new UserController(userService);

loginRouter.post('/', (req: Request, res: Response) => userController.login(req, res));
loginRouter.get(
  '/role',
  validateToken,
  (req: Request, res: Response) => userController.getRole(req, res),
);

export default loginRouter;
