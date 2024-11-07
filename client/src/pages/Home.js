// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Style the home page differently

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to HeroVerse</h1>
      <p>Here you can add all sorts of Heroes</p>
      
      <div className="home-buttons">
        <Link to="/read-mates">
          <button>View All Your Heroes</button>
        </Link>
        <Link to="/new">
          <button>Create a New Hero</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
