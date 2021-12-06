import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Events from './components/EventContainer.js';

const App = () => {
  /* State management through React Hooks */
  const [addNewEvent, setNewEvent] = useState();
  const [allGames, setListOfGames] = useState([]);
  // const [eventInfo, setEvent] = useState([]);
  // const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/events/all')
      .then((res) => {
        console.log(res.data.events);
        setListOfGames(res.data.events);
      });
  }, []);

  const handleSearchGame = (newGame) => {
    axios({ method: 'POST', url: '/events/new', body: newGame })
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

  return (
    /* Title and Search Bar Container */
    <>
      <div className='titlebar'>
        <h1>Placeholder Title</h1>
        <form method='POST' action='/new'>
          <input
            className='game'
            type='text'
            placeholder={`Search for a game`}
            onChange={(event) => {
              console.log('onChange: ', event.target.value);
              setNewEvent(event.target.value);
            }}
          />
          <input
            className='eventDate'
            type='date'
            onChange={(event) => {
              console.log('onChange: ', event.target.value);
              setNewEvent(event.target.value);
            }}
          />
          <input
            className='eventTime'
            type='time'
            onChange={(event) => {
              console.log('onChange: ', event.target.value);
              setNewEvent(event.target.value);
            }}
          />
          <input
            className='username'
            type='text'
            placeholder={`Enter a username`}
            onChange={(event) => {
              console.log('onChange: ', event.target.value);
              setNewEvent(event.target.value);
            }}
          />
          <input
            className='location'
            type='text'
            placeholder={`Enter a location`}
            onChange={(event) => {
              console.log('onChange: ', event.target.value);
              setNewEvent(event.target.value);
            }}
          />

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
