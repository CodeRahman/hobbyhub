import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditMate from './pages/EditMate'
import { Link } from 'react-router-dom'
import PostDetails from './pages/PostDetails';

const App = () => {
  

  const mates = [];
 

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<ReadPosts data={mates}/>
    },
    {
      path:"/edit/:id",
      element: <EditMate data={mates} />
    },
    {
      path:"/new",
      element: <CreatePost />
    },
    {
      path: "/post/:id", //CHANGE// - Route for crewmate details
      element: <PostDetails /> //CHANGE// - Render MateDetail component here
    },
  ]);

  return ( 

    <div className="App">

      <div className="header">
        
      </div>
        {element}
    </div>
  );
}
export default App;