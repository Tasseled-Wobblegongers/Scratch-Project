import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Events from './components/EventContainer.js';

const App = () => {
  /* State management through React Hooks */
  const [addNewEvent, setNewEvent] = useState({
    game: '',
    host: '',
    location: '',
    date: '',
    time: ''
  });
  const [allGames, setListOfGames] = useState([]);
  // const [eventInfo, setEvent] = useState([]);
  // const [messages, setMessages] = useState([]);

  const onChangeHandler = (event) => {
    setNewEvent((addNewEvent) => ({
      ...addNewEvent,
      [event.target.id]: event.target.value
    }))
  }
  
  useEffect(() => {
    axios
      .get('http://localhost:3000/events/all')
      .then((res) => {
        setListOfGames(res.data.events.sort((a, b) => {
          if (a.event._id < b.event._id) return 1;
          if (a.event._id > b.event._id) return -1;
          else return 0;
        }));
      });
  }, []);

  const handleSearchGame = (newGame) => {
    axios({ method: 'POST', url: 'http://localhost:3000/events/new', data: newGame })
      .then((res) => {
        const previous = [...allGames, res.data]
        setListOfGames(previous.sort((a, b) => {
          if (a.event._id < b.event._id) return 1;
          if (a.event._id > b.event._id) return -1;
          else return 0;
        }));
      })
  };
  
  const handleDeleteGame = (eventId) => {
    axios({method: 'DELETE', url: `http://localhost:3000/events/${eventId}` })
    .then((res) => {
      setListOfGames(res.data);
    })
  }

  const handleAddComment = (id, commentObj) => {
    axios({ method: 'POST', url: `http://localhost:3000/events/${id}/comments`, body: commentObj })
      .then((res) => {
        console.log(res);
        const previous = [...messages, res.data]
        setListOfGames(previous);
      });
  };

  return (
    /* Title and Search Bar Container */
    <>
      <div className='titlebar'>
        <h1>Placeholder Title</h1>
        <form>
         
        <input key="name" id="game" onChange={onChangeHandler} value={addNewEvent.game} placeholder='Search for a game'/>
        <input key="host" id="host" onChange={onChangeHandler} value={addNewEvent.host} placeholder='Enter host name'/>
        <input key="location" id="location" onChange={onChangeHandler} value={addNewEvent.location} placeholder='Enter location'/>
        <input key="date" id="date" onChange={onChangeHandler} value={addNewEvent.date} type='date'/>
        <input key="time" id="time" onChange={onChangeHandler} value={addNewEvent.time} type='time'/>
   
        </form>
        <button
            className='gameSearchButton'
            onClick={() => {handleSearchGame(addNewEvent)}}
          >
            Add Event
          </button>
      </div>
      {/* Container for all Game Cards */}
      <div className='eventsContainer'>
        <Events allEvents={allGames} addComments = {setListOfGames} deleteEvent={handleDeleteGame} />
      </div>
    </>
  );
};

export default App;
