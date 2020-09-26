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
eventsRouter.post('/', upload.single('photo'), async (req, res) => {
    const { name, local, remark, author, date_event} = req.body;
    const eventsController = new EventsController()
    const event = await eventsController.store({
        name,
        local,
        remark,
        author,
        date_event,
        photoFileName: req.file.filename,
    });
    return res.json(event);
})

eventsRouter.put('/:id', upload.single('photo'), async (req, res) => {
    const { id } = req.params;
    const { name, local, remark, date_event } = req.body;
    const eventsController = new EventsController()
    const event = await eventsController.update({
        name,
        local,
        remark,
        date_event,
        photoFileName: req.file.filename,
        id
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