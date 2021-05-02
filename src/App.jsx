import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Hobbies } from './pages/hobbies/hobbies'
import { NavBar } from './components/general/navbar'
import UserInfo from './pages/userinfo/UserInfo'
import { TaskView } from './pages/taskview/taskview'
import { Homepage } from './pages/homepage/homepage'
import './App.scss'
import { UserContext } from './context/UserContext';
import FriendList from './components/FriendsList';
import { SignUp } from './components/login/signUp';

const App = () => {

  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ sidebarActive, setSidebarActive ] = useState(false);
  const value = useMemo(() => ({ loggedIn, setLoggedIn }), [loggedIn, setLoggedIn]);

  // hardcoded variables
  const user1 = {
    'write code': false,
    'eat food': false,
    'consume caffeine': false
  }
  const user2 = {
    'call mom': false,
    'call your mom': false,
    'learn react': false
  }

  return (
    <div className='display'>
      <div>
        <NavBar setSidebarActive={setSidebarActive} />
        <Homepage />
      </div>
    </div>
  );
}

export default App;
