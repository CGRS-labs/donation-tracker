import React, { Component } from 'react';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import Layout from './Layout.jsx';
import ResponsiveAppBar from './NavBar';
import './styles/styles.css';

const App = props => {

  return (
    <Router>
      <div className="navigation">
        <ul>
          <li>
            <Link to='/signin'>Sign In</Link>
          </li>
          <li>
            <Link to='/signup'>Sign Up</Link>
          </li>
        </ul>
        <hr />
      </div>
      <Routes>
        <Route exact path="/signin" element={ <Layout><Login /></Layout> } />
        <Route exact path="/signup" element={ <Layout><SignUp /></Layout> } />
      </Routes>
    </Router>
  );
};


export default App;
