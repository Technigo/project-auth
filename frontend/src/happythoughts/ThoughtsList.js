// import React, { useEffect } from 'react';
import React from 'react';
import { formatDistance} from 'date-fns';


const ThoughtsList = ({  thoughts, handleHeartCounter }) => {
  return (
    <section className="section-list">
      {thoughts.map((thought) => {
        return (
        <div className='thoughts-messages'
          key={thought._id}> 
          <p className="message-text"> {thought.message}</p>           
          
          <div className="heart-likes">
          <button 
            className="like-button"
            type="button"
            onClick={() => {handleHeartCounter(thought._id);}}
            style={{ background: thought.hearts >= 1 ? '#c16c7a'  : '#eaeaea' }}>
            <span>❤️</span>
            </button>
          <p className="likes-num"> <i>x{thought.hearts}</i></p>
          </div>
          
          <div className="date">
          <i className="date-messages">
            {formatDistance(new Date(thought.createdAt), Date.now(), {addSuffix: true, })}
        </i> </div>
      </div>
        )
      })}
  </section>
  )
}

export default ThoughtsList;