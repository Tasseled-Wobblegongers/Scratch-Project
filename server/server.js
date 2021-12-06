import express from 'express';
// import Path from 'path';
import eventsRouter from './routes/events.js'
import cors from 'cors';

const PORT = 3000;
const app = express();

// use express, convert request bodies to js objects and convert urls to params
app.use(express());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// define the route handlers
app.use('/events', eventsRouter);

// catch-all route handler for any request to unknown endpoints
app.use((req, res) => res.status(404).send('Endpoint could not be found'));

// default error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'A default server error occurred',
    status: 500,
    message: { err: 'Sorry guys, an error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});


app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
});