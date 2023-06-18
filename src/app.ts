import bodyParser from 'body-parser';
import express, { Request, Response, NextFunction } from 'express';
import ApplicationError from './errors/application-error';
import routes from './routes';
import {readCSVFile} from './models/db'
import {EventInput} from "./dtos/event";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 8080);

let data: unknown = [];
(async () => {
//    // data  =  await readCSVFile();
//     // eventsData =  await readCSVFile();
//
//    console.log('eventsData --3g: ', data)
//
//     console.log('Connected to the database successfully!');
})();

export const eventsData = data

app.use(routes);

app.use((err: ApplicationError, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err);
    }

    return res.status(err.status || 500).json({
        error: process.env.NODE_ENV === 'development' ? err : undefined,
        message: err.message,
    });
});

export default app;
