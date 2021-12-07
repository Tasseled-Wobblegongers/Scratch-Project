import React, { useState, useEffect } from 'react';
// import { ProgressPlugin } from 'webpack';

import Game from './GameDisplay.js';
// import Messages from './MessageDisplay.js';

const Cards = (props) => {
  const [eventCreator, setOrganizer] = React.useState('');

  return (
    <>
      <div className='events'>
        <button
          onClick={() => {props.deleteEvent(props.gameInfo.event_id)}}
        >
        Delete Event
        </button>
        <Game
          gameInfo={props.gameInfo}
          organizer='Organizer'
          organizerValue={eventCreator}
          onChangeOrganizer={(organizer) => setOrganizer(organizer)}
          addComments={props.addComments}


        />
      </div>
    </>
  );
};

export default Cards;
