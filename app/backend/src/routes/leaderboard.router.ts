import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';
import Match from '../database/models/match.model';
import Team from '../database/models/team.model';
import LeaderboardService from '../services/leaderboard.service';

const leaderboardRouter = Router();

const leaderboardService = new LeaderboardService(Match, Team);
const controller = new LeaderboardController(leaderboardService);

leaderboardRouter.get('/home', (req: Request, res: Response) => controller.getHomeLB(req, res));
leaderboardRouter.get('/away', (req: Request, res: Response) => controller.getAwayLB(req, res));
leaderboardRouter.get('/', (req: Request, res: Response) => controller.getAllLB(req, res));

export default leaderboardRouter;
