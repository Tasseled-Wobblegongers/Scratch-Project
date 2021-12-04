import db from '../models/boardGameModels.js';


const eventController = {};

eventController.getEvents = (req, res, next) => {
  console.log('Made it to event controller, getting events!');
  const sql = 
  `SELECT *, events._id AS event_id, events.name AS event_name, events.time AS event_time, comments.time AS comment_time FROM events
  LEFT OUTER JOIN games ON games._id = events.game_id
  LEFT OUTER JOIN comments ON comments.event_id = events._id
  `

  db.query(sql)
  .then ((data) => {
    res.locals.events = []
    console.log(data)
    const tempObj = {};
    data.rows.forEach((datum) => {
      // if the event details haven't been recorded in tempObj, add a new event object with game details and empty comments array
      if (!tempObj[datum.event_id]) {
        tempObj[datum.event_id] = {
          event: {
            _id: datum.event_id,
            host: datum.host,
            location: datum.location,
            name: datum.event_name,
            time: datum.event_time,
            date: datum.date,
            gameID: datum.game_id
          },
          game: {
            _id: datum.game_id,
            image: datum.image,
            playerCount: datum.player_count,
            playTime: datum.play_time,
            name: datum.name
          }, 
          comments: []
        }
      }
      // if the object has comment info, push it into comments array
      if (datum._id) {
        tempObj[datum.event_id].comments.push({
          username: datum.username,
          body: datum.body,
          time: datum.comment_time,
        })
      }
    })
    // console.log(tempObj)
    // push all properties from tempObj into res.locals.events
    for (let event in tempObj) {
      res.locals.events.push(tempObj[event]);
    }
    return next();
  })
  .catch((err) => console.log(err))
  // return next();
}

export default eventController;

/*
res.locals.events = []

create an obejct tp store events
  for each commentObj from db.query
  if object.event_id doesn't exist, 
    make one
    populate with all event detals from that object
    create property game and fill it with game details from object
    create property comments set to empty array
  if the object has comment info
    push it into an array at object.event_id.comments

convert event object to an array of events
*/ 

