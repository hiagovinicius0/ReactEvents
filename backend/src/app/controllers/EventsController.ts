import { getRepository } from 'typeorm';
import Events from '../models/Events';
import Likes from '../models/Likes';
import AppError from '../../errors/AppError';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../../config/uploadPhotoEvent';

interface Request {
    name: string;
    local: string;
    remark: string;
    author: string;
    date_event: Date;
    photoFileName: string;
}

interface RequestUpdate {
    name: string;
    local: string;
    remark: string;
    date_event: Date;
    photoFileName: string;
    id: string;
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

interface RequestPhoto {
    event_id: string;
    photoFileName: string;
}
class EventsController {
    public async store({ name, local, remark, author, date_event, photoFileName }: Request): Promise<Events> {
        const eventsRepository = getRepository(Events);
        const event = eventsRepository.create({
            name, 
            local,
            remark,
            author,
            date_event,
        });
        await eventsRepository.save(event);
        const eventsController = new EventsController()
        await eventsController.updatePhoto({event_id: event.id, photoFileName});
        delete event.created_at;
        delete event.updated_at;
        return event;
    }
    public async update({ name, local, remark, date_event, photoFileName, id }: RequestUpdate): Promise<Events> {
        const eventsRepository = getRepository(Events);
        const event = await eventsRepository.findOne({ where: { id: id }});
        const update = await eventsRepository.update({
            name, 
            local,
            remark,
            date_event,
        }, {
            id: id
        })
        const eventsController = new EventsController()
        await eventsController.updatePhoto({event_id: id, photoFileName});
        delete event.created_at;
        delete event.updated_at;
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
    protected async updatePhoto({ event_id, photoFileName}: RequestPhoto): Promise<Events> {
        const eventsRepository = getRepository(Events);
        const event = await eventsRepository.findOne(event_id);
        if (!event){
            throw new AppError('Evento não encontrado', 401);
        }
        if (event.photo) {
            const photoFilePath = path.join(uploadConfig.directory, event.photo);
            const photoFileExists = await fs.promises.stat(photoFilePath);
            if (photoFileExists) {
                await fs.promises.unlink(photoFilePath);
            }
        }
        event.photo = photoFileName;
        await eventsRepository.save(event);
        return event;
    }
}

export default EventsController;