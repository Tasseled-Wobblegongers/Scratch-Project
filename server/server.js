import { express } from 'express';
import { appendFile } from 'fs';
import Path from 'path';
import apiRouter from './routes/api.js'

const PORT = 3000;
const app = express();

// use express, convert request bodies to js objects and convert urls to params
app.use(express());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// define the route handlers
app.use('/api', apiRouter);

// catch-all route handler for any request to unknown endpoints
app.use((req, res) => res.status(404).send('Endpoint could not be found'));

