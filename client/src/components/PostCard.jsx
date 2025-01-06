import React from 'react'

import './PostCard.css'
import { Link, useNavigate } from 'react-router-dom'; //CHANGE//

const PostCard = (props) => {
  const navigate = useNavigate(); //CHANGE//

  const handleClick = () => {
    navigate(`/post/${props.id}`); //CHANGE//
  };

  return (
      <div className="PostCard">
          <button className='moredetails' onClick={handleClick}>
          <h3 className="title">{props.title}</h3>
          </button>
          <p className='upvotes'>{props.upvotes} upvotes</p>
          <p className='timestamp'>{props.created_at}</p>
      </div>
  );
};

export default PostCard;