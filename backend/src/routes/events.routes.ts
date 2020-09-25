import { Router } from 'express';
import multer from 'multer';
import EventsController from '../app/controllers/EventsController';
import uploadConfig from '../config/uploadPhotoEvent';
const eventsRouter = Router();
const upload = multer(uploadConfig);

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
  
export default eventsRouter;