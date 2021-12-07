import React, { useState, useEffect } from 'react';
import Cards from './CardsContainer.js';

const Events = (props) => {
  console.log('THIS IS IN EVENTS',props.allEvents)
  return (
    <div className='allEvents'>
      {props.allEvents.map((game, key) => {
        return (
          <Cards
            gameInfo={game}
            key={key}
            // commentReload={props.commentReload}
          />
        );
      })}
    </div>
    
  );
};

export default Events;
