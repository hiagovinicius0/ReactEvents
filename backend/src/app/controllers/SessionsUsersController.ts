import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import Users from '../models/Users';
import authConfig from '../../config/auth'

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
            throw new Error('Combinação de email/senha incorretos');
        }
        const checkPassword = await compare(password, user.password);
        if (!checkPassword) {
            throw new Error('Combinação de email/senha incorretos');
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