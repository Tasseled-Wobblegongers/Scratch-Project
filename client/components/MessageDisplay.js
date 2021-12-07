import React, { useState, useEffect } from 'react';

const Message = (props) => {
  
  return (
    <div className='comments'>
      {props.gameInfo.map((comment, key) => {
        return (
          <>
            <ul key={key}>
              <li className='comments'><b>user: </b>{comment.username}</li>
              <li className='comments'><b>time: </b>{comment.time}</li>
              <li className='comments'><b>comment: </b>{comment.body}</li>
            </ul>
          </>
        );
      })}
    </div>
  );
};

export default Message;