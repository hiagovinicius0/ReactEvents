import { Router } from 'express';
import { getRepository } from 'typeorm';

import UsersController from '../app/controllers/UsersController';
import Users from '../app/models/Users';
import ensureAuthenticated from '../middleawares/ensureAuthenticated'

const usersRouter = Router();
usersRouter.use(ensureAuthenticated);
usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const usersController = new UsersController();

    const user = await usersController.store({
      name,
      email,
      password,
    });
    delete user.password;
    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});
usersRouter.get('/', async (req, res) => {
  const userRepository = getRepository(Users);
  const user = await userRepository.find();
  delete user[0].password;
  return res.json(user);
});

usersRouter.get('/:id', async (req, res) => {
  const userRepository = getRepository(Users);
  const { id } = req.params;
  const user = await userRepository.findOne(id);
  delete user?.password;
  return res.json(user);
});

usersRouter.delete('/:id', async (req, res) => {
  const userRepository = getRepository(Users);
  const { id } = req.params;
  await userRepository.delete(id);
  return res.send();
});
export default usersRouter;
