import { request, response, Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import UsersController from '../app/controllers/UsersController';
import Users from '../app/models/Users';
import ensureAuthenticated from '../middleawares/ensureAuthenticated'
import uploadConfig from '../config/upload';
import AvatarUsersController from '../app/controllers/AvatarUsersController';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const usersController = new UsersController();

  const user = await usersController.store({
    name,
    email,
    password,
  });
  delete user.password;
  return res.json(user);
});
usersRouter.use(ensureAuthenticated);
usersRouter.get('/', async (req, res) => {
  const userRepository = getRepository(Users);
  const user = await userRepository.find({ select: [ "id", "name", "email", "avatar" ]});
  return res.json(user);
});

usersRouter.get('/:id', async (req, res) => {
  const userRepository = getRepository(Users);
  const { id } = req.params;
  const user = await userRepository.findOne(id, { select: [ "id", "name", "email", "avatar" ]});
  delete user?.password;
  return res.json(user);
});

usersRouter.delete('/:id', async (req, res) => {
  const userRepository = getRepository(Users);
  const { id } = req.params;
  await userRepository.delete(id);
  return res.send();
});

usersRouter.patch('/avatar',upload.single('avatar'), async (request, response) => {
  const avatarUsersController = new AvatarUsersController();
  const user = await avatarUsersController.update({
    user_id: request.user.id,
    avatarFileName: request.file.filename,
  });
  response.json({avatar: user.avatar});
});
export default usersRouter;
