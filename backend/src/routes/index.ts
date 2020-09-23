import { Router } from 'express';
import usersRoutes from './users.routes';
import eventsRouter from './events.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/events', eventsRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
