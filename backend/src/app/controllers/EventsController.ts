import { getRepository } from 'typeorm';
import Events from '../models/Events';
import Likes from '../models/Likes';

interface Request {
    name: string;
    local: string;
    remark: string;
    author: string;
    date_event: Date;
}

interface responseLike{
    user_id: string;
    event_id: string;
    like: boolean;
}

interface RequestLikes {
    user_id: string;
    event_id: string;
}
class EventsController {
    public async store({ name, local, remark, author, date_event }: Request): Promise<Events> {
        const eventsRepository = getRepository(Events);
        const event = eventsRepository.create({
            name, 
            local,
            remark,
            author,
            date_event,
        });
        await eventsRepository.save(event);
        return event;
    }
    public async likes({ user_id, event_id }: RequestLikes): Promise<responseLike> {
        const likesRepository = getRepository(Likes);
        const testLike = await likesRepository.findOne({ where: { user_id, event_id }});
        if (!testLike) {
            const like = likesRepository.create({
                user_id, 
                event_id
            });
            await likesRepository.save(like);
            return { 
                user_id: user_id,
                event_id: event_id,
                like: true 
            };
        }
        else{
            await likesRepository.delete(testLike);
            return { 
                user_id: user_id,
                event_id: event_id,
                like: false 
            };
        }
    }
}

export default EventsController;