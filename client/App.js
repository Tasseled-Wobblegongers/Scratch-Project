import React, { useState, useEffect, useCallback } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Events from './components/EventContainer.js';

const App = () => {
  /* State management through React Hooks */
  const [addNewEvent, setNewEvent] = useState({});
  const [allGames, setListOfGames] = useState([]);
  // const [eventInfo, setEvent] = useState([]);
  // const [messages, setMessages] = useState([]);
  const onChangeHandler = useCallback(
    ({target:{name,value}}) => setNewEvent(state => ({ ...state, [name]:value }), [])
  );

  useEffect(() => {
    axios
      .get('http://localhost:3000/events/all')
      .then((res) => {
        console.log(res.data.events);
        setListOfGames(res.data.events);
      });
  }, []);

  const handleSearchGame = (newGame) => {
    axios({ method: 'POST', url: 'http://localhost:3000/events/new', body: newGame })
      .then((res) => console.log(res))
      .then((res) => {
        setListOfGames(res.data);
      });
  };

  const handleAddComment = (id, commentObj) => {
    axios({ method: 'POST', url: `/events/${id}/comments`, body: commentObj })
      .then((res) => console.log(res))
      .then((res) => {
        setListOfGames(res.data);
      });
  };

console.log(addNewEvent);

  return (
    /* Title and Search Bar Container */
    <>
      <div className='titlebar'>
        <h1>Placeholder Title</h1>
        <form method='POST' action='/new'>
         
        <input key="name" name="name" onChange={onChangeHandler} value={addNewEvent.name} placeholder='Search for a game'/>
        <input key="host" name="host" onChange={onChangeHandler} value={addNewEvent.host} placeholder='Enter host name'/>
        <input key="location" name="location" onChange={onChangeHandler} value={addNewEvent.location} placeholder='Enter location'/>
        <input key="date" name="date" onChange={onChangeHandler} value={addNewEvent.date} type='date'/>
        <input key="time" name="time" onChange={onChangeHandler} value={addNewEvent.time} type='time'/>

          <button
            className='gameSearchButton'
            onClick={() => handleSearchGame(addNewEvent)}
          >
            Add Event
          </button>
        </form>
      </div>
      {/* Container for all Game Cards */}
      <div className='eventsContainer'>
        <Events allEvents={allGames} commentReload={handleAddComment} />
      </div>
    </>
  );
};

export default App;
