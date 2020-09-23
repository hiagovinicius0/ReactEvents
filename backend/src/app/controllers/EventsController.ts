import { getRepository } from 'typeorm';
import Events from '../models/Events';

interface Request {
    name: string;
    local: string;
    remark: string;
    author: string;
    date_event: Date;
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
}

export default EventsController;