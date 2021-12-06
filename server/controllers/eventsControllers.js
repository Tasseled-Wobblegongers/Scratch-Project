import axios from 'axios';
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
    // console.log(data)
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

eventController.getEventComments = (req, res, next) => {
  const sql = `SELECT * FROM comments WHERE event_id = ${req.params.event_id}`;
  db.query(sql)
    .then((data) => {
      const comments = [];
      data.rows.forEach((datum) => {
        comments.push({
          username: datum.username,
          body: datum.body,
          timestamp: datum.timestamp,
          comment_id: datum._id,
        })
      });
      res.locals.comments = comments;
      
      return next();
    })
    .catch((err) => {
      console.log("ERROR: Cannot find comments from the database", err);
      return next(err);
    })
}

eventController.findGame = (req, res, next) => {
  const sql = `SELECT * FROM games WHERE name~*'${req.body.game}'`;

  db.query(sql)
    // first, check if game exists in database. if so, return game info
    .then((data) => {
      if (data.rows.length) {
        res.locals.game = data.rows[0];
        console.log(res.locals.game);
        return next();
      }
      else {
        // if not, find game information from the Board Game Atlas api
        console.log('####### fetching from api... #######')
        axios.get(`https://api.boardgameatlas.com/api/search?name=${req.body.game}&fuzzy_match=true&order_by=rank&client_id=4bmYMEDgHW`)
        .then((data) => {
          console.log(data.data.games[0]);
          let game = data.data.games[0];
          // if game has extremely high placeholder rank, it's probably not the game we're looking for. choose next one
          if (data.data.games.length > 1 && game.rank > 100000) game = data.data.games[1];
          res.locals.game = {
            name: game.name,
            image: game.image_url,
            playerCount: game.max_players,
            gameTime: game.max_playtime,
          }
        })
        .then((data) => {
          // then log the data into the games dartabase and add database id for game to response info
          const params = [res.locals.game.name, res.locals.game.image, res.locals.game.playerCount, res.locals.game.gameTime];
          const postSql = `INSERT INTO games (name, image, player_count, play_time)
          VALUES ($1, $2, $3, $4)
          RETURNING _id;`;
          db.query(postSql, params)
            .then((dbData) => {
              res.locals.game._id = dbData.rows[0]._id;
              return next();
            })
            .catch((err) => {
              console.log("ERROR: Database entry went wrong", err);
              return next(err);
            })
        })
        .catch((err) => {
          console.log("ERROR: Games not found", err);
          return next(err);
        })
      }
    })
}

eventController.addEvent = (req, res, next) => {
  // insert row into events table in database with event details from request
  const sql = `INSERT INTO events (name, host, date, time, location, game_id)
              VALUES ($1, $2, $3, $4, $5, $6)
              RETURNING *`;
  // return event details, including db _id, in res.locals
  const params = ['placeholder_event_name', req.body.host, req.body.date, req.body.time, req.body.location, res.locals.game._id];
  db.query(sql, params)
    .then((data) => {
      console.log(data.rows);
      const event = data.rows[0];
      res.locals.event = {
        name: event.name,
        time: event.time,
        date: event.date,
        host: event.host,
        location: event.location,
        game_id: event.game_id,
        _id: event._id,
      };
      return next();
    })
    .catch((err) => {
      console.log("ERROR: Games not found", err);
      return next(err);
    });
}

eventController.addComment = (req, res, next) => {
  const sql = `INSERT INTO comments (username, body, event_id, time)
              VALUES ($1, $2, $3, $4)`;
  const params = [req.body.username, req.body.body, req.params.event_id, 'now'];
  console.log(req.params);
  db.query(sql, params)
    .then((data) => {
      return next();
    })
    .catch((err) => {
      console.log("ERROR: Something went wrong adding comment to database", err);
      return next(err);
    });
}



export default eventController;

/* <-- ~~**~~**~~**~~** SCRATCHPAD **~~**~~**~~**~~**~~ -->


*/ 

