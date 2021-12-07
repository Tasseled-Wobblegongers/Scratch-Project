import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Message from './MessageDisplay.js';

const Game = (props) => {

  const [messages, setMessages] = useState({
    username: '',
    body: ''
  });

  const onChangeHandler = (event) => {
    setMessages((messages) => ({
      ...messages,
      [event.target.id]: event.target.value
    }))
  }

  console.log(props);

  const handleAddComment = (id, commentObj) => {
    console.log('inside handle',commentObj);
    axios({ method: 'POST', url: `http://localhost:3000/events/${id}/comments`, data: commentObj })
      .then((res) => {
        console.log(res);
        const previous = {...messages, body: res.data}
        props.addComments(previous);
      })
      .then(window.location.reload());
  };

  console.log(props.gameInfo.event._id);
  console.log(messages);

  return (
    <div className='eventCard'>
      <ol>
        <li><h2>{props.gameInfo.game.name}</h2></li>
        <li><img src={props.gameInfo.game.image}/></li>
        <li><b>Player Count:</b> {props.gameInfo.game.playerCount} people</li>
        <li><b>Play Time:</b> {props.gameInfo.game.playTime} minutes</li>
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
      <form>
        <input className="newMessage" key="username" id="username" onChange={onChangeHandler} value={messages.username} placeholder='Enter Name'/>
        <input className="newMessage" key="body" id="body" onChange={onChangeHandler} value={messages.body} placeholder='Enter Message'/>
      </form>

        <button onClick={() => {handleAddComment(props.gameInfo.event._id, messages)}}>Submit</button>
        </div>
  );
}

export default Game;