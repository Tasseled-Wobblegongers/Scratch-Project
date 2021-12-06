import React, { useState, useEffect } from 'react';

import Message from './MessageDisplay.js';

const Game = (props) => {
  console.log('PROPS INSIDE GAMEDISPLAY', props.gameInfo.comments);
  return (
    <div className='eventCard'>
      <ol>
        <li><h2>{props.gameInfo.game.name}</h2></li>
        <li><img src={props.gameInfo.game.image}/></li>
        <li><b>Player Count:</b> {props.gameInfo.game.playerCount} people</li>
        <li><b>Play Time:</b> {props.gameInfo.game.playTime} hours</li>
      </ol>
      <ol>
        <li><b>Host: </b>{props.gameInfo.event.host}</li>
        <li><b>Location:</b> {props.gameInfo.event.location}</li>
        <li><b>Date:</b> {props.gameInfo.event.date}</li>
        <li><b>Time:</b> {props.gameInfo.event.time}</li>
      </ol>
      <div className='messageBox'>
      <Message gameInfo={props.gameInfo.comments} />
      </div>
      <form method='' action='/'>
        <input
          className='newMessage'
          type='text'
          placeholder={`Name`}
        />
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
