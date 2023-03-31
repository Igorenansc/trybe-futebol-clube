import { Request, Response, Router } from 'express';
import MatchController from '../controllers/match.controller';
import Match from '../database/models/match.model';
import validateTeams from '../middlewares/validateTeams';
import validateToken from '../middlewares/validateToken';
import MatchService from '../services/match.service';

const matchRouter = Router();

const matchService = new MatchService(Match);
const matchController = new MatchController(matchService);

matchRouter.get('/', (req: Request, res: Response) => matchController.getAll(req, res));
matchRouter.patch(
  '/:id/finish',
  validateToken,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);
matchRouter.patch(
  '/:id',
  validateToken,
  (req: Request, res: Response) => matchController.updateMatch(req, res),
);
matchRouter.post(
  '/',
  validateToken,
  validateTeams,
  (req: Request, res: Response) => matchController.newMatch(req, res),
);

export default matchRouter;
