import express from 'express';
const router = express.Router();
import eventsController from '../controllers/eventsControllers.js';

// all requests are prefixed by /api...

router.get('/all',
  eventsController.getEvents,
  (req, res) => res.status(200).json(res.locals)
)

router.get('/:event_id/comments', 
  eventsController.getEventComments,
  (req, res) => res.status(200).json(res.locals)
)

router.post('/new',
  eventsController.findGame,
  eventsController.addEvent,
    (req, res) => {
      res.status(200).json(res.locals)
    }
)

router.post('/:event_id/comments',
    eventsController.addComment,
    eventsController.getEventComments,
    (req, res) => res.status(200).json(res.locals)
)

router.delete('/:event_id', 
    eventsController.deleteEventComment,
    eventsController.deleteEvent,
    eventsController.getEvents,
    (req, res) => res.status(200).json(res.locals)
)

router.delete('/:event_id/comments/:comment_id', 
    eventsController.deleteEventComment,
    eventsController.getEventComments,
    (req, res) => res.status(200).json(res.locals)
)

/* <-- ~~**~~**~~**~~** SCRATCHPAD **~~**~~**~~**~~**~~ -->

*/ 

export default router;