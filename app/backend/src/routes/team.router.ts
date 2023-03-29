import { Request, Response, Router } from 'express';
import TeamController from '../controllers/team.controller';
import Team from '../database/models/team.model';
import TeamService from '../services/team.service';

const teamRouter = Router();

const teamService = new TeamService(Team);
const teamController = new TeamController(teamService);

teamRouter.get('/', (req: Request, res: Response) => teamController.getAll(req, res));
teamRouter.get('/:id', (req: Request, res: Response) => teamController.getById(req, res));

export default teamRouter;
