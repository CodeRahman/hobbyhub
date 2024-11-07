import React from 'react'
import { useState } from 'react'
import './Card.css'
import { Link, useNavigate } from 'react-router-dom'; //CHANGE//

const Card = (props) => {
  const navigate = useNavigate(); //CHANGE//

  const handleClick = () => {
    navigate(`/mate/${props.id}`); //CHANGE//
  };

  return (
      <div className="Card">
          <button className='moredetails' onClick={handleClick}>
          <h3 className="mate_name">{"CrewMate:" + props.mate_name}</h3>
          </button>
          <h3 className="speed">{"Speed " + props.speed}</h3>
          <p className="color">{props.color}</p>
          <p className="strengths">{props.strengths}</p>
          <p className="weaknesses">{props.weaknesses}</p>
          <Link to={'edit/'+ props.id}><button className="editButton" alt="edit button" >Edit Mate</button></Link>
      </div>
  );
};

export default Card;