import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import Users from '../models/Users';
import authConfig from '../../config/auth';
import AppError from '../../errors/AppError';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: Users;
    token: string;
}

class SessionsUsersControllers {
    public async store({ email, password}: Request): Promise<Response> {
        const usersRepository = getRepository(Users);
        const user = await usersRepository.findOne({ where: { email }});
        if (!user) {
            throw new AppError('Combinação de email/senha incorretos', 401);
        }
        const checkPassword = await compare(password, user.password);
        if (!checkPassword) {
            throw new AppError('Combinação de email/senha incorretos', 401);
        }

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        })
        return {
            user,
            token
        }
    }
}

export default SessionsUsersControllers;