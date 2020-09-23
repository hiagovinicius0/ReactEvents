import { Router } from 'express';
import EventsController from '../app/controllers/EventsController';

const eventsRouter = Router();

eventsRouter.post('/', async (req, res) => {
    try {
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
    } catch (erro) {
        return res.status(400).json({ error: erro.message });
    }
})

export default eventsRouter;