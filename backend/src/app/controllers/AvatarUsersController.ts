import { updateArrayBindingPattern } from "typescript";

interface Request {
    user_id: string;
    avatarFileName: string;
}

class AvatarUsersController {
    public async update({ user_id, avatarFileName}: Request): Promise<void> {

    }
}

export default AvatarUsersController;