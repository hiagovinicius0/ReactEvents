import { EventEmitter } from 'events';
import { Router } from 'express';
import multer from 'multer';
import EventsController from '../app/controllers/EventsController';
import uploadConfig from '../config/uploadPhotoEvent';
import Events from '../app/models/Events';
import { getRepository } from 'typeorm';
const eventsRouter = Router();
const upload = multer(uploadConfig);
import ensureAuthenticated from '../middleawares/ensureAuthenticated'
import auth from '../config/auth';

eventsRouter.use(ensureAuthenticated);
eventsRouter.post('/', async (req, res) => {
    const { name, local, remark, author, date_event} = req.body;
    const eventsController = new EventsController()
    const event = await eventsController.store({
        name,
        local,
        remark,
        author,
        date_event
    });
    return res.json(event);
})

eventsRouter.post('/likes', async (req, res) => {
    const { user_id, event_id } = req.body;
    const eventsController = new EventsController()
    const event = await eventsController.likes({
        user_id,
        event_id
    });
    return res.json(event);
})

eventsRouter.patch('/imageEvent', upload.single('photo'), async (request, response) => {
    const eventsController = new EventsController();
    const user = await eventsController.updatePhoto({
        event_id: request.body.event_id,
        photoFileName: request.file.filename,
    });
    response.json(user);
});

eventsRouter.get('/', async (req, res) => {
    const eventsRepository = getRepository(Events);
    const events = await eventsRepository.find({
        order: {
            date_event: "DESC"
        }
    });
    return res.json(events);
});

eventsRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const eventsRepository = getRepository(Events);
    const events = await eventsRepository.findOne(id, {
        order: {
            date_event: "DESC"
        }
    });
    return res.json(events);
});

eventsRouter.delete('/:id', async (req, res) => {
    const eventRepository = getRepository(Events);
    const { id } = req.params;
    const event = await eventRepository.findOne(id);
    if(event?.author === req.user.id){
        await eventRepository.delete(event);
        return res.send({ delete: true });
    }
    else{
        return res.send({ delete: false });
    }
});
  
export default eventsRouter;