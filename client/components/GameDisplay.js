import React, { useState, useEffect } from 'react';

import Message from './MessageDisplay.js';

const Game = (props) => {
  console.log('PROPS INSIDE GAMEDISPLAY', props.gameInfo.comments);
  return (
    <div className='eventCard'>
      <ol>
        <li>{props.gameInfo.game.name}</li>
        <li>{props.gameInfo.game.playerCount}</li>
        <li>{props.gameInfo.game.gameTime}</li>
      </ol>
      <ol>
        <li>{props.gameInfo.event.host}</li>
        <li>{props.gameInfo.event.date}</li>
        <li>{props.gameInfo.event.time}</li>
      </ol>
      <Message gameInfo={props.gameInfo.comments} />
      <form method='' action='/'>
        <input
          className='newMessage'
          type='text'
          placeholder={`Add a new message`}
          onChange={(event) => {
            console.log('onChange: ', event.target.value);
            handleAddComment(event.target.value);
          }}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Game;
