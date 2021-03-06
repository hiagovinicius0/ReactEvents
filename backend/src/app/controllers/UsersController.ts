import { getRepository } from 'typeorm';
import Users from '../models/Users';
import AppError from '../../errors/AppError';
import { hash } from 'bcryptjs';

interface Request {
  name: string;
  email: string;
  password: string;
}
class UsersController {
  public async store({ name, email, password }: Request): Promise<Users> {
    const userRepository = getRepository(Users);

    const UserAlreadyExist = await userRepository.findOne({
      where: { email },
    });

    if (UserAlreadyExist) {
      throw new AppError('Endereço de E-mail já cadastrado!', 401);
    }

    const hashPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashPassword,
    });
    await userRepository.save(user);
    return user;
  }
}

export default UsersController;
