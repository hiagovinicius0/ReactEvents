import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import Users from '../models/Users';
import uploadConfig from '../../config/upload';
import { fstat } from 'fs';
import AppError from '../../errors/AppError';

interface Request {
    user_id: string;
    avatarFileName: string;
}

class AvatarUsersController {
    public async update({ user_id, avatarFileName}: Request): Promise<Users> {
        const usersRepository = getRepository(Users);
        const user = await usersRepository.findOne(user_id);
        if (!user){
            throw new AppError('Somente usuários autenticados podem alterar o avatar', 401);
        }
        if (user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }
        user.avatar = avatarFileName;
        await usersRepository.save(user);
        return user;
    }
}

export default AvatarUsersController;