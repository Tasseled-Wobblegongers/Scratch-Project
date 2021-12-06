import React, { useState, useEffect } from 'react';
import Cards from './CardsContainer.js';

const Events = (props) => {
  return (
    <div className='allEvents'>
      {props.allEvents.map((game, key) => {
        return (
          <Cards
            gameInfo={game}
            key={key}
            commentReload={props.commentReload}
          />
        );
      })}
    </div>
    
  );
};

export default Events;
