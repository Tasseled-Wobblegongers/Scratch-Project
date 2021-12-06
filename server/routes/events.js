import express from 'express';
const router = express.Router();
import eventsController from '../controllers/eventsControllers.js';

// all requests are prefixed by /api...

router.get('/all',
  eventsController.getEvents,
  (req, res) => res.status(200).json(res.locals)
)

/*
router.get('/memory/:bank/:slot', loadPattern);
request from front end to 'api/memory/OH/8' 
request.params. = {bank: 'OH', slot: 8}
request.body ={ post request stuff here }
*/


// router.get('/',
//   coursesController.getCourses,
//   (req, res) => res.status(200).json(res.locals.courses)
// )

export default router;