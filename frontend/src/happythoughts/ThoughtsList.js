// import React, { useEffect } from 'react';
import React from 'react';
import { formatDistance} from 'date-fns';
import styled from 'styled-components';

const Messages = styled.div`
border: 1px solid white;
 margin: 0% 3% 5% 2%; 
padding: 5%;
box-shadow: 4px 4px white;

@media (min-width: 768px) {
  margin: 0% 30% 6% 30%;
}
`

const Likebutton = styled.button`
`

const ThoughtsList = ({  thoughts, handleHeartCounter }) => {
  return (
    <section className="section-list">
      {thoughts.map((thought) => {
        return (
       <Messages>
        <div className='thoughts-messages'
          key={thought._id}> 
          <p className="message-text"> {thought.message}</p>  
          
          <div className="heart-likes">
          <Likebutton 
            className="like-button"
            type="button"
            onClick={() => {handleHeartCounter(thought._id);}}
            style={{ background: thought.hearts >= 1 ? '#c16c7a'  : '#eaeaea' }}>
            <span>❤️</span>
            </Likebutton>
          <p className="likes-num"> <i>x{thought.hearts}</i></p>
          </div>
          
          <div className="date">
          <i className="date-messages">
            {formatDistance(new Date(thought.createdAt), Date.now(), {addSuffix: true, })}
        </i> </div>
      </div>
      </Messages>
        )
       
      })}
      
  </section>
  )
}

export default ThoughtsList;