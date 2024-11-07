import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import ReadMates from './pages/ReadMates'
import CreateMate from './pages/CreateMate'
import EditMate from './pages/EditMate'
import MateDetail from './pages/MateDetail'
import { Link } from 'react-router-dom'
import Home from './pages/Home';

const App = () => {
  

  const mates = [];
 

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<ReadMates data={mates}/>
    },
    {
      path:"/edit/:id",
      element: <EditMate data={mates} />
    },
    {
      path:"/new",
      element: <CreateMate />
    },
    {
      path: "/mate/:id", //CHANGE// - Route for crewmate details
      element: <MateDetail /> //CHANGE// - Render MateDetail component here
    },
  ]);

  return ( 

    <div className="App">

      <div className="header">
        <h1>CrewMates</h1>
        <Link to="/"><button className="headerBtn"> View Crew 🔍  </button></Link>
        <Link to="/new"><button className="headerBtn"> New CrewMate 🏆 </button></Link>
      </div>
        {element}
    </div>
  );
}
export default App;