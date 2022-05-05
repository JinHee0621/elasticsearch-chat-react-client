import React from 'react';
import io from "socket.io-client"; 
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from "./routes/Login"
import RoomList from './routes/RoomList';
import Room from './routes/Room';

function App() {
  return <Router>
    <Switch>
      <Route path="/room/:roomid" component={Room}/>  
      <Route path="/roomList/:id" component={RoomList}/>
      <Route path="/" component={Login}/>    
    </Switch>
  </Router>;
}

export default App;
