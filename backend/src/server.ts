import express, { request, response } from 'express';
import 'express-async-errors';
import routes from './routes';
import uploadConfig from './config/upload';
import uploadConfigEvent from './config/uploadPhotoEvent';
import AppError from './errors/AppError';
import './database';
import { nextTick } from 'process';
import { NextFunction, Request } from 'express-serve-static-core';

const app = express();
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use('/eventPhoto', express.static(uploadConfigEvent.directory));
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError){
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }
  console.log(err)
  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  })
})

app.listen(3333, () => {
  console.log('Servidor Rodando');
});
