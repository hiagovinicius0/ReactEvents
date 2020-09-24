import { Router } from 'express';
import SessionsUsersController from '../app/controllers/SessionsUsersController';


const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  const sessionsUsersController = new SessionsUsersController();
  const { user, token } = await sessionsUsersController.store({
      email,
      password
  })
  delete user.password;
  return res.json({ user, token });
});

export default sessionsRouter;
