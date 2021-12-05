import React, { useState, useEffect } from 'react';

import Game from './GameDisplay.js';
// import Messages from './MessageDisplay.js';

const Cards = (props) => {
  const [eventCreator, setOrganizer] = React.useState('');

  // console.log('THIS IS PROPS INSIDE CARDS COMPONENT', props.gameInfo);

  return (
    <>
      <div className='events'>
        <Game
          // gameName={props.gameInfo.name}
          // playerCount={props.gameInfo.max_players}
          // playTime={props.gameInfo.max_playtime}
          gameInfo={props.gameInfo}
          organizer='Organizer'
          organizerValue={eventCreator}
          onChangeOrganizer={(organizer) => setOrganizer(organizer)}
        />
      </div>
    </>
  );
};

export default Cards;
