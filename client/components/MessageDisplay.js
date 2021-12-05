import React, { useState, useEffect } from 'react';

const Message = (props) => {
  return (
    <div className='comments'>
      {props.gameInfo.map((comment, key) => {
        return (
          <>
            <h4 key={key}>
              {comment.username}
              {comment.timestamp}
              {comment.body}
            </h4>
          </>
        );
      })}
    </div>
  );
};

export default Message;
