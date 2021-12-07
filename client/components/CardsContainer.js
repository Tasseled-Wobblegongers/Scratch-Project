import React, { useState, useEffect } from 'react';
// import { ProgressPlugin } from 'webpack';

import Game from './GameDisplay.js';
// import Messages from './MessageDisplay.js';

const Cards = (props) => {
  const [eventCreator, setOrganizer] = React.useState('');

  return (
    <>
      <div className='events'>
        <Game
          gameInfo={props.gameInfo}
          organizer='Organizer'
          organizerValue={eventCreator}
          onChangeOrganizer={(organizer) => setOrganizer(organizer)}
          addComments={props.addComments}
          // deleteEvent={props.deleteEvent}
        />
        <button
          onClick={() => {props.deleteEvent(props.gameInfo.event._id)}}
        >
        Delete Event
        </button>
      </div>
    </>
  );
};

export default Cards;
